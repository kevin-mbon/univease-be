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
      name: "Applicant",
      description: "Operations related to User Applicant entities",
    },
    {
      name: "Blog",
      description: "Operations related to Blog Post entities",
    },
    {
      name: "Program",
      description: "Operations related to Program Post entities",
    },
    {
      name: "Testmonial",
      description: "Operations related to Testmonial Post entities",
    },
    {
      name: "Logout",
      description: "Operations related to Logout entities",
    },
    {
      name: "Admin",
      description: "Admin Operations",
    },
    {
      name: "Application",
      description: "Application Operations",
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
              example: {
                universityName: "kepls",
                email: "kepla@gmail.com",
                username: "kepla",
                country: "Rwanda",
                city: "Kigali",
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

    "/api/v1/university/read": {
      get: {
        tags: ["University"],
        summary: "Get All University",
        description: "Get all University posts",
        security: [
          {
            bearerAuth: [], // Add the security requirement for this endpoint
          },
        ],
        responses: {
          200: {
            description: "All University Posts retrieved successfully",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },

    "/api/v1/university/read/{id}": {
      get: {
        tags: ["University"],
        summary: "Read university By ID",
        description: "Get a university post by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID of the university post",
            schema: {
              type: "string",
              pattern: "^[0-9a-fA-F]{24}$",
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
            description: "University Post retrieved successfully",
          },
          404: {
            description: "University Post not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/v1/university/update/{id}": {
      put: {
        tags: ["University"],
        description: "Update an existing University",
        security: [
          {
            bearerAuth: [], // Add the security requirement for this endpoint
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID of the university post",
            schema: {
              type: "string",
              pattern: "^[0-9a-fA-F]{24}$",
            },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              example: {
                universityName: "kepls",
                email: "kepla@gmail.com",
                username: "kepla",
                country: "Rwanda",
                city: "Kigali",
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
    "/api/v1/university/delete/{id}": {
      delete: {
        tags: ["University"],
        summary: "Delete a university post",
        description: "Delete an existing university post by its ID.",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
              pattern: "^[0-9a-fA-F]{24}$",
            },
            description:
              "Unique identifier of the university post to be deleted",
          },
        ],
        responses: {
          200: {
            description: "university post deleted successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "Blog post not found",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
    "/api/v1/university/auth": {
      post: {
        tags: ["University"],
        summary: "University Login",
        description: "make Login With University",
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
                  email: {
                    type: "string",
                    description: "E-mail of the university",
                    example: "Nyagatare@gmail.com",
                  },
                  password: {
                    type: "string",
                    description: "password of university",
                    example: "rwanda123",
                  },
                },
              },
            },
          },
          required: true,
        },
        responses: {
          201: {
            description: "University Login  successfully",
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
    "/api/v1/university/auth/logout": {
      post: {
        tags: ["Logout"],
        description: "logging out a university",
        summary: "logging out a university",
        security: [
          {
            bearerAuth: [], // Add the security requirement for this endpoint
          },
        ],
        parameters: [],
        required: true,
        responses: {
          200: {
            description: "University successfully logged out",
          },
          401: {
            description: "Unauthorized: User not logged in",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/v1/user/register": {
      post: {
        tags: ["Applicant"],
        summary: "Register a new User Applicant",
        description: "Create a new User Applicant",
        security: [
          {
            bearerAuth: [], // Add the security requirement for this endpoint
          },
        ],
        parameters: [],
        requestBody: {
          content: {
            "application/json": {
              example: {
                firstName: "Amani",
                secondName: "Kalisa",
                email: "kalisa@gmail.com",
                workExperience: "",
                contactInformation: "",
                highSchoolOrUniversity: "",
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
        tags: ["Applicant"],
        summary: "Applicant Login",
        description: "User Login ",
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
                password: "1234qw",
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
    "/api/v1/user/auth/logout": {
      post: {
        tags: ["Logout"],
        description: "logging out a user",
        summary: "logging out a user",
        security: [
          {
            bearerAuth: [], // Add the security requirement for this endpoint
          },
        ],
        parameters: [],
        required: true,
        responses: {
          200: {
            description: "User successfully logged out",
          },
          401: {
            description: "Unauthorized: User not logged in",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/v1/user/read": {
      get: {
        tags: ["Applicant"],
        summary: "Get All User Applicant",
        description: "Get all User posts",
        security: [
          {
            bearerAuth: [], // Add the security requirement for this endpoint
          },
        ],
        responses: {
          200: {
            description: "All User Posts retrieved successfully",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/v1/user/read/{id}": {
      get: {
        tags: ["Applicant"],
        summary: "Read User By ID",
        description: "Get a User post by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID of the university post",
            schema: {
              type: "string",
              pattern: "^[0-9a-fA-F]{24}$",
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
            description: "User Post retrieved successfully",
          },
          404: {
            description: "User Post not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/v1/user/update/{id}": {
      put: {
        tags: ["Applicant"],
        summary: "Update an existing User Applicant",
        description: "Update User Applicant",
        security: [
          {
            bearerAuth: [], // Add the security requirement for this endpoint
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID of the applicant",
            schema: {
              type: "string",
              pattern: "^[0-9a-fA-F]{24}$",
            },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              example: {
                firstName: "Amani",
                secondName: "Kalisa",
                email: "kalisa@gmail.com",
                workExperience: "",
                contactInformation: "",
                highSchoolOrUniversity: "",
                password: "1234qw",
                confirmPassword: "1234qw",
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "User Applicant was updated successfully",
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
    "/api/v1/user/delete/{id}": {
      delete: {
        tags: ["Applicant"],
        summary: "Delete a user post",
        description: "Delete an existing user post by its ID.",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
              pattern: "^[0-9a-fA-F]{24}$",
            },
            description: "Unique identifier of the user post to be deleted",
          },
        ],
        responses: {
          200: {
            description: "user post deleted successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "Blog post not found",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
    "/api/v1/blog/create": {
      post: {
        tags: ["Blog"],
        summary: "Create Blog Post",
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
        summary: "Get All Blog",
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
    "/api/v1/blog/{id}": {
      get: {
        tags: ["Blog"],
        summary: "Read Blog By ID According to their University",
        description: "Get a blog post by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID of the University",
            schema: {
              type: "string",
              pattern: "^[0-9a-fA-F]{24}$",
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
    "/api/v1/blog/read/{id}": {
      get: {
        tags: ["Blog"],
        summary: "Read Blog By ID",
        description: "Get a blog post by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID of the blog post",
            schema: {
              type: "string",
              pattern: "^[0-9a-fA-F]{24}$",
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

    "/api/v1/blog/delete/{id}": {
      delete: {
        tags: ["Blog"],
        summary: "Delete a blog post",
        description: "Delete an existing blog post by its ID.",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
              pattern: "^[0-9a-fA-F]{24}$",
            },
            description: "Unique identifier of the blog post to be deleted",
          },
        ],
        responses: {
          200: {
            description: "Blog post deleted successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "Blog post not found",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },

    "/api/v1/blog/update/{id}": {
      put: {
        tags: ["Blog"],
        summary: "Update a blog post",
        description: "Update an existing blog post with new data.",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
              pattern: "^[0-9a-fA-F]{24}$",
            },
            description: "Unique identifier of the blog post to be deleted",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  postTitle: {
                    type: "string",
                    description: "Title of the blog post",
                  },
                  postContent: {
                    type: "string",
                    description: "Content of the blog post",
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
        },
        responses: {
          200: {
            description: "Blog post updated successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "Not found",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },

    // Testimonial
    "/api/v1/testmonial/create": {
      post: {
        tags: ["Testmonial"],
        summary: "Create testmonial Post",
        description: "Create a new testmonial post",
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
                  post: {
                    type: "string",
                    description: "Content of the testmonial post",
                    example: "Sample content...",
                  },
                  location: {
                    type: "string",
                    description: "Campus You In",
                    example: "Location content...",
                  },
                },
              },
            },
          },
          required: true,
        },
        responses: {
          201: {
            description: "New testmonial Post created successfully",
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
    // getAll Testimonial
    "/api/v1/testmonial/read": {
      get: {
        tags: ["Testmonial"],
        summary: "Get All testmonial",
        description: "Get all testmonial posts",
        security: [
          {
            bearerAuth: [], // Add the security requirement for this endpoint
          },
        ],
        responses: {
          200: {
            description: "All testmonial Posts retrieved successfully",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/v1/testmonial/read/{id}": {
      get: {
        tags: ["Testmonial"],
        summary: "Read testmonial By ID",
        description: "Get a testmonial post by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID of the testmonial post",
            schema: {
              type: "string",
              pattern: "^[0-9a-fA-F]{24}$",
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
            description: "testmonial Post retrieved successfully",
          },
          404: {
            description: "testmonial Post not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },

    "/api/v1/testmonial/delete/{id}": {
      delete: {
        tags: ["Testmonial"],
        summary: "Delete a testmonial post",
        description: "Delete an existing testmonial post by its ID.",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
              pattern: "^[0-9a-fA-F]{24}$",
            },
            description:
              "Unique identifier of the testmonial post to be deleted",
          },
        ],
        responses: {
          200: {
            description: "testmonial post deleted successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "testmonial post not found",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },

    "/api/v1/testmonial/update/{id}": {
      put: {
        tags: ["Testmonial"],
        summary: "Update a testmonial post",
        description: "Update an existing testmonial post with new data.",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
              pattern: "^[0-9a-fA-F]{24}$",
            },
            description:
              "Unique identifier of the testmonial post to be deleted",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  post: {
                    type: "string",
                    description: "Content of the testmonial post",
                  },
                  location: {
                    type: "string",
                    description: "Where you Located",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "testmonial post updated successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "Not found",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
    // getAll Program
    "/api/v1/program/create": {
      post: {
        tags: ["Program"],
        summary: "Create program Post",
        description: "Create a new program post",
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
                  name: {
                    type: "string",
                    description: "name of the program post",
                    example: "Sample name...",
                  },
                  tags: {
                    type: "string",
                    description: "Related Subject",
                    example: "tags content...",
                  },
                  programImage: {
                    type: "string",
                    format: "binary",
                    description: "Image file for the program post",
                  },
                  registration: {
                    type: "string",
                    description: "registration fees",
                    example: "registration content...",
                  },
                  scholarship: {
                    type: "string",
                    description: "scholarship fees",
                    example: "scholarship content...",
                  },
                  hostel: {
                    type: "string",
                    description: "hostel fees",
                    example: "hostel content...",
                  },
                  degree: {
                    type: "string",
                    description: "Your Higest Certificate",
                    example: "Degree content...",
                  },
                  degreeOverview: {
                    type: "string",
                    description:
                      "Description about  Higest Certificate you are going to get",
                    example: "DegreeOverview content...",
                  },
                  components: {
                    type: "string",
                    description: "components Included",
                    example: "components content...",
                  },
                  wayTolearn: {
                    type: "string",
                    description: "wayTolearn Included",
                    example: "wayTolearn content...",
                  },
                  related: {
                    type: "string",
                    description: "related certificate Included",
                    example: "related content...",
                  },
                },
              },
            },
          },
          required: true,
        },
        responses: {
          201: {
            description: "New program Post created successfully",
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
    "/api/v1/program/read": {
      get: {
        tags: ["Program"],
        summary: "Get All program",
        description: "Get all program posts",
        security: [
          {
            bearerAuth: [], // Add the security requirement for this endpoint
          },
        ],
        responses: {
          200: {
            description: "All program Posts retrieved successfully",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/v1/program/{id}": {
      get: {
        tags: ["Program"],
        summary:
          "Read program By ID According To Their Coresponding Universsity",
        description: "Get a program post by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID of the University",
            schema: {
              type: "string",
              pattern: "^[0-9a-fA-F]{24}$",
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
            description: "program Post retrieved successfully",
          },
          404: {
            description: "program Post not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/v1/program/read/{id}": {
      get: {
        tags: ["Program"],
        summary: "Read program By ID",
        description: "Get a program post by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID of the program post",
            schema: {
              type: "string",
              pattern: "^[0-9a-fA-F]{24}$",
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
            description: "program Post retrieved successfully",
          },
          404: {
            description: "program Post not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },

    "/api/v1/program/delete/{id}": {
      delete: {
        tags: ["Program"],
        summary: "Delete a program post",
        description: "Delete an existing program post by its ID.",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
              pattern: "^[0-9a-fA-F]{24}$",
            },
            description: "Unique identifier of the program post to be deleted",
          },
        ],
        responses: {
          200: {
            description: "program post deleted successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "testmonial post not found",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },

    "/api/v1/program/update/{id}": {
      put: {
        tags: ["Program"],
        summary: "Update a program post",
        description: "Update an existing program post with new data.",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
              pattern: "^[0-9a-fA-F]{24}$",
            },
            description:
              "Unique identifier of the testmonial post to be deleted",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    description: "name of the program post",
                    example: "Sample name...",
                  },
                  tags: {
                    type: "string",
                    description: "Related Subject",
                    example: "tags content...",
                  },
                  programImage: {
                    type: "string",
                    format: "binary",
                    description: "Image file for the program post",
                  },
                  registration: {
                    type: "string",
                    description: "registration fees",
                    example: "registration content...",
                  },
                  scholarship: {
                    type: "string",
                    description: "scholarship fees",
                    example: "scholarship content...",
                  },
                  hostel: {
                    type: "string",
                    description: "hostel fees",
                    example: "hostel content...",
                  },
                  degree: {
                    type: "string",
                    description: "Your Higest Certificate",
                    example: "Degree content...",
                  },
                  degreeOverview: {
                    type: "string",
                    description:
                      "Description about  Higest Certificate you are going to get",
                    example: "DegreeOverview content...",
                  },
                  components: {
                    type: "string",
                    description: "components Included",
                    example: "components content...",
                  },
                  wayTolearn: {
                    type: "string",
                    description: "wayTolearn Included",
                    example: "wayTolearn content...",
                  },
                  related: {
                    type: "string",
                    description: "related certificate Included",
                    example: "related content...",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "testmonial post updated successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "Not found",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
    "/api/v1/admin/assign-status/{id}": {
      post: {
        tags: ["Admin"],
        summary: "To change the status of the university",
        description: "status",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
              pattern: "^[0-9a-fA-F]{24}$",
            },
            description: "status",
          },
        ],
        responses: {
          200: {
            description: " successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "university not found",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
    "/api/v1/applications/apply/{id}": {
      post: {
        tags: ["Application"],
        summary: "apply to program",
        description: "apply to program",
        security: [
          {
            bearerAuth: [], // Add the security requirement for this endpoint
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
              pattern: "^[0-9a-fA-F]{24}$",
            },
            description: "program id",
          },
        ],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  startingDate: {
                    type: "String",
                    description: "Choose In take to start ",
                    example: "",
                  },

                  coverLetter: {
                    type: "string",
                    description: "cover letter of your application ",
                  },
                  attachment: {
                    type: "string",
                    format: "binary",
                    description: "cover letter of your application use PDF",
                  },
                },
              },
            },
          },
          required: true,
        },
        responses: {
          201: {
            description: "application created successfully",
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
    "/api/v1/applications/all": {
      get: {
        tags: ["Application"],
        summary: "All application",
        description: "all application",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [],
        responses: {
          200: {
            description: " successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "not found",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
    "/api/v1/applications/oneProgram/{program}": {
      get: {
        tags: ["Application"],
        summary: "to retrieve all application of one program",
        description: "all program application",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
              pattern: "^[0-9a-fA-F]{24}$",
            },
            description: "program id",
          },
        ],
        responses: {
          200: {
            description: " successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "not found",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
    "/api/v1/applications/one/{id}": {
      get: {
        tags: ["Application"],
        summary: "to retrieve application by id",
        description: "application",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
              pattern: "^[0-9a-fA-F]{24}$",
            },
            description: "application id",
          },
        ],
        responses: {
          200: {
            description: " successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "not found",
          },
          500: {
            description: "Internal server error",
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
