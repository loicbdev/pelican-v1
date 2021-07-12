"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      /* define association here */
      models.user.hasMany(models.post);
      models.user.hasMany(models.comment);
      models.user.hasMany(models.favorite);
    }
  }
  User.init(
    {
      /* Model attributes are defined here */
      pseudo: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      photo: { type: DataTypes.STRING, allowNull: true },
      building: { type: DataTypes.INTEGER(2), allowNull: true },
      bio: { type: DataTypes.STRING(500), allowNull: true },
      admin: { type: DataTypes.BOOLEAN, allowNull: false, default: false },
    },
    {
      /* Other model options go here */
      sequelize,
      modelName: "user",
      freezeTableName: true,
    }
  );
  return User;
};
