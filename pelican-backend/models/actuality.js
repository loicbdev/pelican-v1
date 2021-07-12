"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Actuality extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      /* define association here */
      models.actuality.belongsTo(models.user, {
        foreignKey: {
          allowNull: false,
        },
        onDelete: "CASCADE",
      });
    }
  }
  Actuality.init(
    {
      /* Model attributes are defined here */
      title: { type: DataTypes.TEXT, allowNull: false },
      message: { type: DataTypes.TEXT, allowNull: false },
      link: { type: DataTypes.STRING, allowNull: true },
      imageUrl: { type: DataTypes.STRING, allowNull: true },
    },
    {
      /* Other model options go here */
      sequelize /* We need to pass the connection instance */,
      modelName: "actuality" /* We need to choose the model name */,
      freezeTableName: true,
    }
  );
  return Actuality;
};
