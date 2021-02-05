module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'galleries',
      [
        {
          image: 'images/galleries/gallery1.jpg',
          alt: 'ALT GALLERY 1 UNTUK SEO',
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          image: 'images/galleries/gallery2.jpg',
          alt: 'ALT GALERY 2 yaaaaaa',
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
