'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('contexts', {
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
        field: 'user_id',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        type: Sequelize.BIGINT.UNSIGNED,
      },
      title: {
        type: Sequelize.STRING(255),
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
        type: Sequelize.DATE,
        field: 'created_at',
      },
      updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
        type: Sequelize.DATE,
        field: 'updated_at',
      },
    });
    await queryInterface.addIndex('contexts', ['user_id']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('contexts');
  },
};
