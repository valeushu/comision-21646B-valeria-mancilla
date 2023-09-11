import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import engine from "ejs-mate";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import * as router from "./src/routes/index.routes.js";
import "dotenv/config";

const app = express();
app.use(helmet());

app.set("views", path.join(__dirname, "views"));
app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("port", process.env.PORT);
app.set("json spaces", 2);

//middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routes
app.use("/api/post", router.postRoutes);

export default app;
