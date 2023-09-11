import { Router } from "express";
const posts = Router();
import * as postCtrl from "../controllers/post.controller.js";

posts.get("/", postCtrl.getAll);
//posts.post("/crear", postCtrl.createPost);
// Ruta para procesar la creación de una nueva publicación
posts.post("/", postCtrl.createPost);
posts.put("/:id", postCtrl.updatePostById);
posts.delete("/:id", postCtrl.deletePostById);

// Ruta para mostrar el formulario de creación de publicaciones
posts.get("/crear", (req, res) => {
  res.render("crear"); // Renderiza el formulario de creación
});

export default posts;
