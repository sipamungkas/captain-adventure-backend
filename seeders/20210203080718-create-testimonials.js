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
      'testimonials',
      [
        {
          image: 'images/testimonials/johndoe.jpg',
          name: 'John Doe',
          testimoni:
            'Sebuah testimoni panjang sih gapapa, tapi nanti potong sendiri textnya biar sesuai ya',
          order: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          image: 'images/testimonials/lanaya.jpg',
          name: 'Lanaya',
          testimoni:
            'Sebuah testimoni panjang sih gapapa, tapi nanti potong sendiri textnya biar sesuai ya',
          order: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
