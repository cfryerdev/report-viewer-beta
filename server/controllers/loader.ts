import express, { Request, Response } from "express";
import rateLimit from "express-rate-limit";
import wcmatch from "wildcard-match";
import settings from "../config/settings";

const router = express.Router();

const isValidOrigin = (url) => {
  if (url === undefined) { return false; }
  if (!settings.loader.enabled) {
    return true;
  }
  const urlObject = new URL(url);
  const isValidProtocol = settings.whitelist.protocols.includes(urlObject.protocol.replace(':', ''));
  let isValidHost = false;
  settings.whitelist.hosts.forEach(host_match => {
    const isMatch = wcmatch(host_match);
    const valid = isMatch(urlObject.hostname);
    if (valid) { isValidHost = true; }
  });
  return isValidHost && isValidProtocol;
};

const loaderRateLimiter = settings.rateLimiter.enabled
  ? rateLimit({
      windowMs: parseInt(settings.rateLimiter.minutes.toString()) * 60 * 1000,
      max: settings.rateLimiter.ip_hits_per_minutes
    })
  : (req, res, next) => { next(); };

const executeLoader = (url: string, req: Request, res: Response) => {
  if (!isValidOrigin(url)) {
    res.status(400).send({ 
      message: `Invalid origin, you must use a whitelisted hosts.`, 
      hosts: settings.whitelist.hosts,
      protocols: settings.whitelist.protocols
    });
  } else {
    fetch(url)
      .then(res => res.json())
      .then(response => {
        res.send(response);
      })
      .catch(_ => {
        res.status(500).send({ message: `Sorry, we are unable to access the url (${decodeURIComponent(url)}). Please ensure this is a publicly assessible url.` });
      });
  }
};

/**
 * @swagger
 * /api/loader/{url}:
 *    get:
 *      tags:
 *        - Loading
 *      summary: Load report from url via Param
 *      description: Remotely loads a json report from a given url via a paremeter
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: url
 *            description: Direct url to report json file
 *            in: path
 *            required: true
 *            type: string
 *      responses:
 *          200:
 *              description: A single report json object
 */
router.get("/api/loader/:url", loaderRateLimiter, (req: Request, res: Response) => {
  executeLoader(req.params.url, req, res);
});

/**
 * @swagger
 * /api/loader/:
 *    post:
 *      tags:
 *        - Loading
 *      summary: Load report from url via Body
 *      description: Remotely loads a json report from a given url via a post body
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: BodyPostUrl
 *            description: SImple json object containing a url property
 *            in: body
 *            required: true
 *            schema:
 *              $ref: '#/definitions/LoaderPostBody'
 *      responses:
 *          200:
 *              description: A single report json object
 */
router.post("/api/loader/", loaderRateLimiter, (req: Request, res: Response) => {
  executeLoader(req.body.url, req, res);
});

/**
 * @swagger
 * tags:
 *   - name: Loading
 *     description: Remote loading of report files
 */
export default router;