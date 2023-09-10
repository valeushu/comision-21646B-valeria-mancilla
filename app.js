const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");

const router = require("./routes/index.routes.js");
require("dotenv/config");

const engine = require("ejs-mate");
const app = express();
app.use(helmet());

app.engine("ejs", engine);
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.set("port", process.env.PORT);

//middlewares
app.use(morgan("dev"));

// Configura EJS como motor de vistas
// app.set("view engine", "ejs");
// app.set("views", __dirname + "/views");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

// Ruta para mostrar todas las publicaciones
app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.findAll(); // Recupera todas las publicaciones desde la base de datos
    res.render("posts", { posts }); // Renderiza la vista de publicaciones
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los posts");
  }
});

// Ruta para mostrar el formulario de creación de publicaciones
app.get("/crear", (req, res) => {
  res.render("crear"); // Renderiza el formulario de creación
});

// Ruta para procesar la creación de una nueva publicación
app.post("/crear", async (req, res) => {
  try {
    // Extrae los datos del formulario
    const { titulo, contenido, imagen_url } = req.body;

    // Crea una nueva publicación en la base de datos
    await Post.create({
      titulo,
      contenido,
      imagen_url,
      fecha_creacion: new Date(), // Establece la fecha de creación como la fecha actual
    });

    res.redirect("/posts"); // Redirige a la página de publicaciones después de crear una nueva publicación
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear el post");
  }
});

// Ruta para cargar imágenes (deberás implementar la lógica para procesar la carga de imágenes)
app.post("/cargar-imagen", (req, res) => {
  // Implementa la lógica de carga de imágenes aquí
});

// Configuración de Express aquí
// app.listen(port, () => {
//   console.log(`Servidor en ejecución en el puerto ${port}`);
// });

//routes
app.use("/api/post", router.postRoutes);

module.exports = app;
