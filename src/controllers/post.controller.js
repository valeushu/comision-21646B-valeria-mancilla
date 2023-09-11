import Post from "../models/post.js";

export const getAll = async (req, res) => {
  try {
    const post = await Post.findAll(); // Recupera todas las publicaciones desde la base de datos
    if (!post) return res.status(404);
    return res.status(200).json(post);
    //res.render("posts", { posts }); // Renderiza la vista de publicaciones
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los posts");
  }
};

export const createPost = async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    return res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear el post");
  }
};
