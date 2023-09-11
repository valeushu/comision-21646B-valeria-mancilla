import { Sequelize } from "sequelize";

const sequelize = new Sequelize("proyecto-EPICA", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export const initDatabase = async () => {
  try {
    await sequelize.authenticate();
    //await sequelize.sync({ force: true });
    await sequelize.sync();
    console.log("conectado a la base de datos");
  } catch (error) {
    console.log("Error al conectarse a la base de datos", error);
  }
};

export default sequelize;
