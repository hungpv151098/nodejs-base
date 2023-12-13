'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      session: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: 'users',
      modelName: 'User',
      underscored: true,
      timestamps: true,
      indexes: [
        {
          name: 'users_pkey',
          unique: true,
          fields: ['id'],
        },
      ],
    }
  );
  return User;
};
