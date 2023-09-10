const Post = require("../models/index");

exports.createPost = async (req, res) => {
  const { titulo, contenido, imgUrl, fecha } = req.body;
  const newPost = new Post({ titulo, contenido, imgUrl, fecha });
  const postSaved = await newPost.save();
  res.status(201).json({
    postSaved,
  });
};
