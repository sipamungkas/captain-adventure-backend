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
          name: `adventure_${Math.random() * 10}`,
          slug: `adventure_${Math.random() * 10}`,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          image: 'images/categories/image.png',
          name: `rafting_${Math.random() * 10}`,
          slug: `rafting_${Math.random() * 10}`,
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
