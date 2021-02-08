module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'contacts',
      [
        {
          key: 'wa1',
          value: '6281227812003',
          category: 'social media',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          key: 'wa1',
          value: '6281227812003',
          category: 'social media',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          key: 'ig1',
          value: 'CaptAdventurer',
          category: 'social media',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          key: 'email1',
          value: 'captainadventur@gmail.com',
          category: 'social media',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          key: 'ig1',
          value: 'CaptAdventurer',
          category: 'social media',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          key: 'fb1',
          value: 'Captain Adventures',
          link: 'fb.me/username',
          category: 'social media',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          key: 'alamat1',
          value: `Jalan. Nusantara Sakti No 11. Baturaden Selatan, 
          Purwokerto - Jawa Tengah,
          Indonesia`,
          category: 'address',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          key: 'kontak1',
          value: '(0121) 0812329093',
          category: 'kontak',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          key: 'kontak2',
          value: '(0121) 0812329342',
          category: 'kontak',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          key: 'map1',
          value:
            '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126438.33806395526!2d112.56174200322909!3d-7.97846945786652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd62822063dc2fb%3A0x78879446481a4da2!2sMalang%2C%20Kota%20Malang%2C%20Jawa%20Timur!5e0!3m2!1sid!2sid!4v1612761814829!5m2!1sid!2sid" width="600" height="450" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>',
          category: 'map',
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
