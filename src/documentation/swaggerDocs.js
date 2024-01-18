import express from "express";
import { serve, setup } from "swagger-ui-express";

const docrouter = express.Router();

const local = process.env.LOCAL_HOST || "http://localhost:8080";


const options = {
  openapi: "3.0.1",
  info: {
    title: "UNIVEASE API",
    version: "1.0.0",
    description: "DOCUMENTATION FOR UNIVEASE API.",
  },
  host: local,
  basePath: '/',
  security: [
    {
      bearerAuth: [],
    },
  ],
  tags: [{ name: "University", description: "University" }],
  paths: {
    "/api/v1/university/register": {
      post: {
        tags: ["University"],
        description: "University register",
        security: [],
        parameters: [],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: '#/components/schemas/University',
              },
              example: {
                universityName: "kepls",
                email: "kepla@gmail.com",
                universityType: "public",
                description: "wqudbqudbkqwbyqweycbqwab",
                password: "1234qw",
                confirmPassword: "1234qw",
              },
            },
          },
          required: true,
        },
        responses: {
          201: {
            description: "New User was created successfully",
          },
          400: {
            description: "Bad Request",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
  },
  components: {
    schemas: {
      University: {
        type: 'object',
        properties: {
          universityName: {
            type: "string",
            description: "University name",
            example: "kepls",
          }
          // Add other properties as needed
        },
      },
    },
  },

  securitySchemes: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
  },
};

docrouter.use("/", serve, setup(options));

export default docrouter;
