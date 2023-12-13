'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT.UNSIGNED,
      },
      userId: {
        allowNull: true,
        defaultValue: null,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        type: Sequelize.BIGINT.UNSIGNED,
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
        type: Sequelize.BIGINT.UNSIGNED,
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
        type: Sequelize.BIGINT.UNSIGNED,
        field: 'gpt_request_id',
      },
      content: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at',
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated_at',
      },
    });
    await queryInterface.addIndex('messages', ['user_id','context_id','gpt_request_id']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('messages');
  },
};
