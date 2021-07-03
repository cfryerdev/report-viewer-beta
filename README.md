# Artillery Report Viewer V2 (Beta)

This is a reporting and diagramming tool used with json reports generated by the artillery.io cli. Built in NextJS, Typescript, React, ChartJs, and Fontawesome.

## Features
- Artillery and Artillery Pro support
- Load reports using json files directly from the cli
- Load reports remotely using url
- Interactive graphs
- Docker image so you can host privately
- Serverside rendered allowing high performance
- Summarized report data for easy assessment
- Health and Performance ratings
- So much more...

## Changelog
You can see the changelog [here.](changelog.md)

## Is there a live version?

Absolutely, check it out here: https://reportviewer.artillery.io/

## Can I host this locally in my own cloud?

Absolutely, we have a docker image published to dockerhub specifically for this purpose. Check it out: [cfryerdev/artilleryio-report-viewer](https://hub.docker.com/r/cfryerdev/artilleryio-report-viewer)

## How can I customize my docker image? 

There are a number of environment variables you can set:
```
LOADER_ENABLED=true
LOADER_ENFORCEWHITELIST=true
WHITELIST_PROTOCOLS=https,http
WHITELIST_HOSTS=**.blob.core.windows.net,**.s3-**.amazonaws.com
RATELIMITER_ENABLED=true
RATELIMITER_IP_HITS_PER_MINUTES=100
RATELIMITER_MINUTES=10
```

# Getting Started
You can run this locally in three modes:

Debug (next+react)
```
$ npm install
$ npm run dev
```

Production mode (nextjs+express+react)
```
$ npm install
$ npm run build
$ npm run start
```

or via docker, see below...

## How do I generate json reports?

When you run the artillery cli, you can simply add the following to your command to output a json file for use with this tool: `-o some_report.json`

## Serverside, Express, & React
This project uses NextJS in a typescript configuration to host React and serve up the react web application server-side via expressjs. This allows us to do clientside rendering and serverside rendering, as well as cache renderings to increase the performance of the application.

## Solution Structure
```
├─── public                     > Staticly served assets
├─── server                     > Service (NextJS)
│   ├─── index.ts               > Service entry point
│   └─── routes.ts              > Routes for all pages (abstraction)
└─── src                        > Web Application (React)
    ├─── assets                 > Assets such as images, styles, fonts, etc
    │   ├─── images             > Images to be embedded inside the app. Non-Static
    │   └─── styles             > Where all the Styles are located
    ├─── components             > Generic components for web app
    │   └─── addons             > Where all of the addon specific components live
    ├─── contexts               > State contexts for react
    │   └─── report-context     > Where all report state logic lives
    ├─── models                 > Where all of the structured objcets are
    ├─── layout                 > Layout for all pages
    ├─── pages                  > Page structure for navigation
    │   ├─── index              > The main page for the report viewer
    │   ├─── home               > Load payloads via json upload
    │   │   └─── index
    │   ├─── url                > Load payloads via encoded url
    │   │   └─── [url]
    │   ├─── _app               > App component wrapped around each page
    │   ├─── _document          > Pre-rendered component wrapped around application
    │   ├─── _error             > Error handling page
    │   ├─── 404                > Page not found
    │   └─── 500                > Server errors
    └─── utilities              > Utilities to mapping and formatting data
```

## Executing Tests
Testing framework coming soon...

# Docker Support

## Building the Docker Image
This project uses Docker for deployments outside of your local environment. To create the docker image, navigate to this directory in your console and execute the following...
```
$ npm install
$ npm run build
$ docker build -t artilleryio/report-viewer:2.0.0 -t artilleryio/report-viewer:latest .
```
This will create a docker image with the tag `artilleryio/report-viewer`.

## Running the Docker Image

To create a local container with the name `aio-local-reportviewer`, execute the following...
```
$ docker run -p 8080:80 --name aio-local-reportviewer artilleryio/report-viewer
```

Then navigate to `http://localhost:80` ... Thats it, enjoy!

# At a glance

## A new look
A completely revamped UI.
![Screenshot01](/samples/ScreenShot_001.png)

## Dark Mode
Easy on the eyes.
![Screenshot02](/samples/ScreenShot_002.png)

## Summarized Data
Get the important information without digging.
![Screenshot03](/samples/ScreenShot_003.png)

## Interactive Charting
Enable and disable the metrics you care about.
![Screenshot02](/samples/ScreenShot_004.png)

## Addons
Support for displaying custom metrics in both raw and custom views. More coming soon...

![Screenshot03](/samples/ScreenShot_005.png)

## Better readibility
Better fonts and layout enable easier reading.
![Screenshot03](/samples/ScreenShot_006.png)

## Quick Sidebar
Quickly jump from section to section easily.
![Screenshot03](/samples/ScreenShot_007.png)

## Remote Loading
Want to upload your report and share it with somebody else? You can do that using the remote loading functionality.
![Screenshot03](/samples/ScreenShot_008.png)

## OpenAPI
Fully documented open api spec using swagger!
![Screenshot03](/samples/ScreenShot_009.png)