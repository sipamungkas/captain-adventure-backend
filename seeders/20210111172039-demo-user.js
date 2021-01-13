const bcrypt = require('bcrypt');

const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
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
    const password = await bcrypt.hash('password', saltRounds);
    await queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Ragil Burhanudin Pamungaks',
          email: 'ragil@sipamungkas.com',
          password,
          role: 'admin',
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
    await queryInterface.bulkDelete('users', null, {});
  },
};
