module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'settings',
      [
        {
          key: 'title',
          value: 'Captain Adventure',
          group: 'meta',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          key: 'description',
          value: ` Captain Adventure Indonesia adalah Event Organizer (EO) & Provider Paket Outbound yang berpusat di Malang, Jawa Timur, Indonesia.
          Spesialisasi event kami di antaranya: Outbound; Gathering; Rafting (Arung Jeram); Meeting; Outing; School Event); Offroad; Paintball; Archery (panahan); dan Tour Wisata.
          Kami siap menyediakan segala kebutuhan anda mulai dari Perencanaan (Plan), Konsep, Persiapan (Preparation), Pelaksanaan, hingga proses Check Out. `,
          group: 'meta',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('settings', null, {});
  },
};
