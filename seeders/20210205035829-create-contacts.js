module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'contacts',
      [
        {
          key: 'wa1',
          value: '62822221234',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          key: 'fb',
          value: 'user name fb',
          link: 'fb.me/username',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('contacts', null, {});
  },
};
