const Post = require("../models/postModel");
const { v4: uuid4 } = require("uuid");

exports.getAll = () => {
  return Post.find();
};

exports.findById = (id) => {
  return Post.findById(id);
};

exports.create = (postData) => {
  return Post.create(postData);
};

exports.delete = (id) => {
  return Post.findByIdAndDelete(id);
};
