import { Sequelize } from "sequelize";

const sequelize = new Sequelize("proyecto-EPICA", "root", "", {
  host: "localhost", // Host de la base de datos
  dialect: "mysql", // Elige el dialecto de la base de datos
  // Puedes agregar más opciones de configuración aquí
});

export const initDatabase = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("conectado a la base de datos");
  } catch (error) {
    console.log("Error al conectarse a la base de datos", error);
  }
};

export default sequelize;
