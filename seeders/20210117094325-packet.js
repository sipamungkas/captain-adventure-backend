module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'packets',
      [
        {
          cover: 'packets/cover.png',
          image: 'packets/image.png',
          title: 'packet adventure',
          start_at: '150K IDR / Orang',
          subtitle: 'packet adventure',
          slug: 'adventure',
          is_active: true,
          description: 'apalah description disini untuk packet adventure',
          category_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          cover: 'packets/cover.png',
          image: 'packets/image.png',
          title: 'packet rafting',
          start_at: '1000K IDR / 6 Orang',
          subtitle: 'packet rafting',
          slug: 'rafting',
          is_active: true,
          description: 'apalah description disini untuk packet rafting',
          category_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('packets', null, {});
  },
};
