'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Context extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Context.init(
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
        defaultValue: null,
        references: {
          model: 'users',
          key: 'id',
        },
        field: 'user_id',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      title: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: 'contexts',
      modelName: 'Context',
      underscored: true,
      timestamps: true,
      indexes: [
        {
          name: 'contexts_pkey',
          unique: true,
          fields: ['id'],
        },
        {
          name: 'contexts_pkey',
          unique: true,
          fields: ['id'],
        },
        {
          name: 'contexts_user_id',
          fields: ['user_id'],
        },
      ],
    }
  );
  return Context;
};
