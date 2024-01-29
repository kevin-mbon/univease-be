import express from "express";
import { serve, setup } from "swagger-ui-express";

const docrouter = express.Router();
const local = process.env.LOCAL_HOST;

const options = {
  openapi: "3.0.1",
  info: {
    title: "UNIVEASE API",
    version: "1.0.0",
    description: "Documentation for UNIVEASE API.",
  },
  host: local,
  basePath: "/",
  security: [
    {
      bearerAuth: [], // Define the security requirement for endpoints
    },
  ],
  tags: [
    {
      name: "University",
      description: "Operations related to University entities",
    },
    {
      name: "User Applicant",
      description: "Operations related to User Applicant entities",
    },
  ],
  paths: {
    "/api/v1/university/register": {
      post: {
        tags: ["University"],
        description: "Register a new University",
        security: [
          {
            bearerAuth: [], // Add the security requirement for this endpoint
          },
        ],
        parameters: [],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/University",
              },
              example: {
                universityName: "kepls",
                email: "kepla@gmail.com",
                country: "Rwanda",
                city: "Kigali",
                phoneNumber: "0780000000",
                universityType: "public",
                password: "1234qw",
                confirmPassword: "1234qw",
              },
            },
          },
          required: true,
        },
        responses: {
          201: {
            description: "New University was created successfully",
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

    "/api/v1/user/register": {
      post: {
        tags: ["User Applicant"],
        description: "Register a new User Applicant",
        security: [
          {
            bearerAuth: [], // Add the security requirement for this endpoint
          },
        ],
        parameters: [],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/University",
              },
              example: {
                firstName: "Amani",
                secondName: "Kalisa",
                email: "kalisa@gmail.com",
                password: "1234qw",
                confirmPassword: "1234qw",
              },
            },
          },
          required: true,
        },
        responses: {
          201: {
            description: "New User Applicant was created successfully",
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
    "/api/v1/user/auth": {
      post: {
        tags: ["User Login"],
        description: "Try a User Login ",
        security: [
          {
            bearerAuth: [], // Add the security requirement for this endpoint
          },
        ],
        parameters: [],
        requestBody: {
          content: {
            "application/json": {
              // schema: {
              //   $ref: "#/components/schemas/University",
              // }, 
              example: {
                email: "kalisa@gmail.com",
                password: "1234qw"
              },
            },
          },
          required: true,
        },
        responses: {
          201: {
            description: "User was logged in successfully",
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
    "api/v1/auth/logout":{
     post: {
      tags: ["user logout"],
      description: "logging out a user",
      security: [
        {
          bearerAuth: [], // Add the security requirement for this endpoint
        },
      ],
      parameters: [],
      required : true,
       responses: {
          200: {
            description: 'User successfully logged out',
          },
          401: {
            description: 'Unauthorized: User not logged in',
          },
          500: {
            description: 'Internal Server Error',
          },
        },
     }
    },
    "/api/v1/blog/create": {
      post: {
        tags: ["Blog"],
        description: "Create a new blog post",
        security: [
          {
            bearerAuth: [], // Add the security requirement for this endpoint
          },
        ],
        parameters: [],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  postTitle: {
                    type: "string",
                    description: "Title of the blog post",
                    example: "Sample Title",
                  },
                  postContent: {
                    type: "string",
                    description: "Content of the blog post",
                    example: "Sample content...",
                  },
                  postImage: {
                    type: "string",
                    format: "binary",
                    description: "Image file for the blog post",
                  },
                },
              },
            },
          },
          required: true,
        },
        responses: {
          201: {
            description: "New Blog Post created successfully",
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
    // getAll Blog
    "/api/v1/blog/read": {
      get: {
        tags: ["Blog"],
        description: "Get all blog posts",
        security: [
          {
            bearerAuth: [], // Add the security requirement for this endpoint
          },
        ],
        responses: {
          200: {
            description: "All Blog Posts retrieved successfully",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/v1/blog/read/{id}": {
      get: {
        tags: ["Blog"],
        description: "Get a blog post by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID of the blog post",
            schema: {
              type: "string",
            },
          },
        ],
        security: [
          {
            bearerAuth: [], // Add the security requirement for this endpoint
          },
        ],
        responses: {
          200: {
            description: "Blog Post retrieved successfully",
          },
          404: {
            description: "Blog Post not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        in: "header",
        name: "Authorization",
      },
    },
  },
};

docrouter.use("/", serve, setup(options));

export default docrouter;
