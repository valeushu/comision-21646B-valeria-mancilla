import { Router } from "express";
const posts = Router();
import * as postCtrl from "../controllers/post.controller.js";

posts.get("/api/post", postCtrl.getAll);
//posts.post("/crear", postCtrl.createPost);
// Ruta para procesar la creación de una nueva publicación
posts.post("/api/post", postCtrl.createPost);
posts.put("/api/post/:id", postCtrl.updatePostById);
posts.delete("/api/post/:id", postCtrl.deletePostById);

//ruta para la vista
posts.get("/post", postCtrl.ctrlView);
posts.get("/", postCtrl.ctrlViewHome);

// Ruta para mostrar el formulario de creación de publicaciones
posts.get("/crear", (req, res) => {
  res.render("crear"); // Renderiza el formulario de creación
});

export default posts;
