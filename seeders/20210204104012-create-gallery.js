module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'galleries',
      [
        {
          image: 'images/galleries/johndoe.jpg',
          alt: 'John Doe',
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          image: 'images/galleries/lanaya.jpg',
          alt: 'Lanaya',
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('galleries', null, {});
  },
};
