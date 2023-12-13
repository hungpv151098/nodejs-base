'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GptRequest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  GptRequest.init(
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      model: DataTypes.STRING,
      input: DataTypes.JSON,
      output: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: 'GptRequest',
      tableName: 'gpt_requests',
      underscored: true,
      timestamps: true,
      indexes: [
        {
          name: 'gpt_requests_pkey',
          unique: true,
          fields: ['id'],
        },
      ],
    }
  );
  return GptRequest;
};
