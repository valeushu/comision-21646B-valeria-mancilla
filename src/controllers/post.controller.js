import Post from "../models/post.js";

export const ctrlViewHome = async (req, res) => {
  res.render("home.ejs");
};

export const ctrlView = async (req, res) => {
  try {
    const posts = await Post.findAll(); // Recupera todas las publicaciones desde la base de datos
    res.render("index.ejs", { posts }); // Renderiza la vista de publicaciones
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los posts");
  }
};

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

export const updatePostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const { titulo, contenido, img_url } = req.body;
    const post = await Post.findByPk(postId);
    if (!post) {
      return res
        .status(404)
        .json({ error: "La publicación no fue encontrada" });
    }
    post.titulo = titulo;
    post.contenido = contenido;
    post.img_url = img_url;
    await post.save();
    res.status(200).json({ message: "Publicación actualizada con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar la publicación" });
  }
};

export const deletePostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findByPk(postId);
    if (!post) {
      return res
        .status(404)
        .json({ error: "La publicación no fue encontrada" });
    }
    await post.destroy();
    return res.status(200).json({ message: "post eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar la publicación" });
  }
};
