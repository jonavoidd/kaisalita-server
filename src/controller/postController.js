const postService = require("../services/postService");

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await postService.getAllPosts();
    res.status(200).json({ status: "success", success: true, data: posts });
  } catch (err) {
    next(err);
  }
};

exports.getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await postService.getPostById(id);

    if (!post) {
      return res.status(404).json({
        status: "failed",
        success: false,
        message: "Post ID not found",
      });
    }

    res.status(200).json({ status: "success", success: true, data: post });
  } catch (err) {
    next(err);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const newPost = await postService.createPost(req.body);
    res.status(201).json({ status: "success", success: true, data: newPost });
  } catch (err) {
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedPost = await postService.deletePost(id);

    if (!deletedPost) {
      res.status(404).json({
        status: "failed",
        success: false,
        message: "failed to delete post",
      });
    }

    res.status(200).json({
      status: "success",
      success: true,
      data: deletedPost,
      message: "post successfully deleted",
    });
  } catch (err) {
    next(err);
  }
};
