// const postRepository = require("../repositories/postRepository");
const { db } = require("../config/firebase");
const { postZodSchema } = require("../models/postModel");

exports.getAllPosts = async () => {
  // const posts = await postRepository.getAll();
  // if (!posts || posts.length === 0) {
  //   throw new Error("No post found");
  // }
  // return posts;

  const snapshot = await db.collection("posts").get();

  if (snapshot.empty) {
    throw new Error("No post found.");
  }

  const posts = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return posts;
};

exports.getPostById = async (id) => {
  // const post = await postRepository.findById(id);
  // if (!post) {
  //   throw new Error("Post not Found");
  // }
  // return post;

  const docRef = db.collection("posts").doc(id);
  const docSnap = await docRef.get();

  if (!docSnap.exists) {
    throw new Error("Post not found.");
  }

  return { id: docSnap.id, ...docSnap.data() };
};

exports.createPost = async (postData) => {
  // return await postRepository.create(postData);

  const validatedData = postZodSchema.parse(postData);

  validatedData.createdAt = new Date();
  validatedData.updatedAt = new Date();

  const docRef = await db.collection("posts").add(postData);
  const newDoc = await docRef.get();

  return { id: newDoc.id, ...newDoc.data() };
};

exports.deletePost = async (id) => {
  // const post = await this.getPostById(id);
  // if (!post) {
  //   throw new Error("Post doesn't exist");
  // }
  // return await postRepository.delete(post._id);

  const docRef = await db.collection("posts").doc(id);
  const docSnap = await docRef.get();

  if (!docSnap.exists) {
    throw new Error("No post found");
  }

  await docRef.delete();
  return { id, message: "successfully deleted post." };
};
