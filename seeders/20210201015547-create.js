module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'heros',
      [
        {
          image: 'images/hero/image.png',
          video: 'https://www.youtube.com/watch?v=hvPu8kmeqKE',
          title: 'Hero slider 1 title',
          short_description: 'deskripsi singkat untuk hero slider',
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'Hero slider 2 title tanpa video image',
          short_description:
            'deskripsi singkat untuk hero slider tanpa image dan video',
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('heros', null, {});
  },
};
