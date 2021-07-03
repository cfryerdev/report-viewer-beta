import swaggerJsdoc from "swagger-jsdoc";
import path from "path";
import packageJson from "../../package.json";

const options = {
    explorer: true,
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Artillery.io Report Viewer',
        description: 'OpenApi documentation for the restful endpoints that support the report viewer.',
        version: packageJson.version,
        contact: {
          name: "Artillery Report Viewer",
          url: "https://reportviewer.artillery.io/"
        },
      },
    },
    produces: ["application/json"],
    schemes: process.env.ENVIRONMENT === "dev" ? ["http"] : ["http", "https"],
    apis: [
      path.resolve(__dirname, "../controllers/*.ts"),
      path.resolve(__dirname, "../models/*.ts")
    ]
  };

  export default swaggerJsdoc(options);