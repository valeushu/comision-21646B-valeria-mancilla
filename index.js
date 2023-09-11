import app from "./app.js";
import { initDatabase } from "./src/config/database.js";

const APP_PORT = process.env.PORT || 3000;
app.listen(APP_PORT, () => {
  console.log("Listening @", APP_PORT);
  initDatabase();
});
