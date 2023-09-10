"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Post.init(
    {
      titulo: DataTypes.STRING,
      contenido: DataTypes.TEXT,
      fecha_creacion: DataTypes.DATE,
      imagen_url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Post",
      timestamps: false,
      tableName: "Posts",
    }
  );
  return Post;
};
