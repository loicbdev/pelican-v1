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
      /* define association here */
      models.post.belongsTo(models.user, {
        foreignKey: {
          allowNull: false,
        },
        onDelete: "CASCADE",
      }),
        models.post.hasMany(models.comment);
      models.post.hasMany(models.favorite);
    }
  }
  Post.init(
    {
      /* Model attributes are defined here */
      message: { type: DataTypes.TEXT, allowNull: false },
      link: { type: DataTypes.STRING, allowNull: true },
      imageUrl: { type: DataTypes.STRING, allowNull: true },
    },
    {
      /* Other model options go here */
      sequelize /* We need to pass the connection instance */,
      modelName: "post" /* We need to choose the model name */,
      freezeTableName: true,
    }
  );
  return Post;
};
