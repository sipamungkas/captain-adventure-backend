module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('contacts', {
      key: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      value: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      link: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      category: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('contacts');
  },
};
