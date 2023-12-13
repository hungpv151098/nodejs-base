'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Message.init(
    {
      userId: {
        allowNull: true,
        defaultValue: null,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        type: DataTypes.BIGINT.UNSIGNED,
        field: 'user_id',
      },
      contextId: {
        allowNull: true,
        defaultValue: null,
        references: {
          model: 'contexts',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        type: DataTypes.BIGINT.UNSIGNED,
        field: 'context_id',
      },
      gptRequestId: {
        allowNull: true,
        defaultValue: null,
        references: {
          model: 'gpt_requests',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        type: DataTypes.BIGINT.UNSIGNED,
        field: 'gpt_request_id',
      },
      content: DataTypes.TEXT,
    },
    {
      sequelize,
      tableName: 'messages',
      modelName: 'Message',
      underscored: true,
      timestamps: true,
      indexes: [
        
        {
          name: 'messages_user_id',
          fields: ['user_id'],
        },
        {
          name: 'messages_context_id',
          fields: ['context_id'],
        },
        {
          name: 'messages_gpt_request_id',
          fields: ['gpt_request_id'],
        },
      ],
    }
  );
  return Message;
};
