"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      /* define association here */
      models.favorite.belongsTo(models.user, {
        foreignKey: {
          allowNull: false,
        },
        onDelete: "CASCADE",
      }),
        models.favorite.belongsTo(models.post, {
          foreignKey: {
            allowNull: false,
          },
          onDelete: "CASCADE",
        });
    }
  }
  Favorite.init(
    {
      /* Model attributes are defined here */
    },
    {
      /* Other model options go here */
      sequelize,
      modelName: "favorite",
      freezeTableName: true,
    }
  );
  return Favorite;
};
