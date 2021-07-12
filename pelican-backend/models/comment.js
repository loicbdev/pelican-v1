"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      /* define association here */
      models.comment.belongsTo(models.user, {
        foreignKey: {
          allowNull: false,
        },
        onDelete: "CASCADE",
      }),
        models.comment.belongsTo(models.post, {
          foreignKey: {
            allowNull: false,
          },
          onDelete: "CASCADE",
        });
    }
  }
  Comment.init(
    {
      /* Model attributes are defined here */
      message: { type: DataTypes.TEXT, allowNull: false },
    },
    {
      /* Other model options go here */
      sequelize,
      modelName: "comment",
      freezeTableName: true,
    }
  );
  return Comment;
};
