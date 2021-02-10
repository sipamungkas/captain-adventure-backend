module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('questions', [
      {
        name: 'Pelanggan Kaya 1',
        email: 'email@email.com',
        body: 'Mas apakah ada promo diskon 50%?',
        updated_at: new Date(),
        created_at: new Date(),
      },
      {
        name: 'Pelanggan Teman sendiri',
        email: 'email@emailnya.com',
        body:
          'Mas karena kita teman saya bayarnya 120% dari harga asli bagaimana?',
        updated_at: new Date(),
        created_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('questions', null, {});
  },
};
