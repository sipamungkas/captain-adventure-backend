module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('heros', 'link', {
      type: Sequelize.STRING,
      after: 'is_active',
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('heros', 'link');
  },
};
