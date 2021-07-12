"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Residence extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      /* define association here */
    }
  }
  Residence.init(
    {
      /* Model attributes are defined here */
      code: { type: DataTypes.STRING, allowNull: false },
    },
    {
      /* Other model options go here */
      sequelize /* We need to pass the connection instance */,
      modelName: "residence" /* We need to choose the model name */,
      freezeTableName: true,
    }
  );
  return Residence;
};
