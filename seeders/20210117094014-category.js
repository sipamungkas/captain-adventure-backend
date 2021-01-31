module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      'categories',
      [
        {
          image: 'images/categories/image.png',
          name: 'adventure',
          slug: 'adventure',
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          image: 'images/categories/image.png',
          name: 'rafting',
          slug: 'rafting',
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('categories', null, {});
  },
};