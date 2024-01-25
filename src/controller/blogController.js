import blog from "../models/blogModel";
import { uploadToCloud } from "../helper/cloudinary";
import { validationResult } from "express-validator";
export const createPost = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { postTitle, postContent } = req.body;

    // existing title
    const existingTitle = await blog.findOne({ postTitle });
    if (existingTitle) {
      return res.status(400).json({
        status: "400",
        message: "Title Already Exist",
      });
    }
    let result;
    if (req.file) result = await uploadToCloud(req.file, res);
    console.log("ifot", result);
    const MakePost = await blog.create({
      postImage: result?.secure_url,
      postTitle,
      postContent,
    });
    if (MakePost) {
      return res.status(201).json({
        status: "201",
        message: "Post Create Well",
        data: MakePost,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed To Create Blog",
      error: error.message,
    });
  }
};

// getAll Post

export const getPost = async (req, res) => {
  try {
    const findPost = await blog.find();
    if (findPost) {
      return res.status(200).json({
        status: "200",
        message: "All Post Retrived Well",
        data: findPost,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed To Create Blog",
      error: error.message,
    });
  }
};
// get one Post

export const getSinglePost = async (req, res) => {
  try {
    const { id } = req.params;
    const findPost = await blog.findById(id);
    if (findPost) {
      return res.status(200).json({
        status: "200",
        message: "All Post Retrived Well",
        data: findPost,
      });
    } else {
      return res.status(404).json({
        status: "404",
        message: "Post Not Found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed To Create Blog",
      error: error.message,
    });
  }
};

// delete Post

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const findPost = await blog.findById(id);
    if (findPost) {
      await blog.findByIdAndDelete(id);
      return res.status(200).json({
        status: "200",
        message: "Post Deleted Well",
      });
    } else {
      return res.status(404).json({
        status: "404",
        message: "Post Not Found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed To Create Blog",
      error: error.message,
    });
  }
};

// Update Blog
export const updatePost = async (req, res) => {
  try {
    const { postTitle, postContent } = req.body;
    const { id } = req.params;
    const findID = await blog.findById(id);
    if (!findID) {
      return res.status(404).json({
        status: "404",
        message: "Post Not Found",
      });
    }
    let result;
    if (req.file) result = await uploadToCloud(req.file, res);
    const MakePost = await blog.findByIdAndUpdate(id, {
      postImage: result?.secure_url,
      postTitle,
      postContent,
    });
    if (MakePost) {
      return res.status(201).json({
        status: "201",
        message: "Post Updated Well",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed To Create Blog",
      error: error.message,
    });
  }
};
