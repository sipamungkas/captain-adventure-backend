module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('packets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      cover: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      image: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      perks: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      short_description: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      start_at: {
        allowNull: true,
        type: Sequelize.STRING(50),
      },
      subtitle: {
        allowNull: true,
        type: Sequelize.STRING(100),
      },
      slug: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT('long'),
      },
      is_active: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true,
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
    await queryInterface.dropTable('packets');
  },
};
