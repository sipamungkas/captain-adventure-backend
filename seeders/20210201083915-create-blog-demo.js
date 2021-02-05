module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'blogs',
      [
        {
          image: 'images/blogs/image.png',
          title: 'Captain adventure memberikan diskon 70%',
          slug: 'Captain-adventure-memberikan-diskon-70%',
          perks: 'benefit 1, benefit 2, benefit, 3',
          short_description: 'deskripsi singkat, kaya rangkuman gitu',
          body: `

          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vitae aliquam velit. Morbi odio augue, sagittis ut orci ut, vehicula tristique metus. Duis vitae magna pharetra, maximus risus sit amet, fringilla arcu. Pellentesque blandit eu odio non ullamcorper. Cras viverra ipsum nec pellentesque egestas. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sollicitudin risus ac libero faucibus, ut consectetur elit auctor. Cras vel augue laoreet metus varius aliquam vel a enim. Ut iaculis augue sit amet tortor cursus, at interdum libero laoreet. Nunc quis ornare ipsum. Nullam vel nisi scelerisque, fermentum justo at, gravida sapien. Etiam non condimentum arcu. Integer nec elit finibus, lobortis metus vel, aliquam nisi.
          
          Cras consequat, massa ac lobortis dapibus, massa lorem mattis dui, interdum porttitor enim lacus ac lacus. Duis lobortis diam sed lectus malesuada, id pharetra enim rhoncus. Nulla tincidunt enim massa. Sed ullamcorper sollicitudin accumsan. Sed a ipsum ac mauris ultricies volutpat. Cras sollicitudin turpis euismod, maximus sapien vitae, venenatis sapien. Nunc dictum lectus turpis, vel gravida dolor ultrices vel. Donec ultricies rhoncus metus, sit amet posuere nunc viverra nec. Donec eget finibus nulla. Suspendisse potenti. Aliquam eu felis sollicitudin, pulvinar metus sed, bibendum augue. Donec porta purus quis tortor dapibus, in consectetur orci scelerisque. Praesent pulvinar nulla vel iaculis vehicula. Sed quis lectus id lacus mattis ultrices ut quis mauris. Quisque nibh nibh, faucibus suscipit sodales sit amet, semper nec mauris.
          
          Mauris vel imperdiet eros. Donec consequat, dui vitae euismod efficitur, lacus sem commodo velit, ac vehicula leo nibh sed mauris. Suspendisse augue risus, laoreet ut luctus at, sagittis sed diam. Maecenas consequat lacus diam, ac iaculis dui lobortis in. Sed non est bibendum, hendrerit magna sed, blandit justo. Vivamus fermentum tristique sollicitudin. Aliquam elementum, leo non tincidunt placerat, urna dolor porttitor nulla, vitae rhoncus ex velit a dui. Proin rutrum ullamcorper ex vitae ornare. Praesent ultricies augue et enim dapibus, eu auctor nisl tristique. Fusce id purus diam. Fusce ac imperdiet est. Nam aliquet congue tellus vitae accumsan. Fusce nec tortor elit.
          
          Vivamus ultricies tempor elit vel porttitor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas eget odio et leo semper bibendum. Sed vel tincidunt massa. Maecenas imperdiet consectetur mauris, id commodo turpis. Mauris tincidunt dui nisl, eget sodales mauris egestas finibus. Nulla bibendum nunc fermentum nibh pulvinar pellentesque. Phasellus imperdiet ullamcorper mi at tincidunt.
          
          Quisque maximus dolor ac arcu mattis, vitae volutpat orci suscipit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a elementum quam. Ut vitae orci id nulla congue lacinia vitae id lacus. Aenean rutrum, lacus eu fringilla elementum, orci lacus dignissim nunc, vel convallis metus turpis et velit. Nullam viverra faucibus scelerisque. Vivamus vel velit vitae arcu cursus aliquet. Quisque sed dui magna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam eu lorem nec neque porttitor elementum. Aenean varius commodo tortor, at imperdiet orci volutpat eget. `,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          image: 'images/blogs/image2.png',
          title: 'Rafting yang menyenangkan akan menghadirkan kedamaian',
          slug: 'Rafting-yang-menyenangkan-akan-menghadirkan-kedamaian',
          body: `

          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vitae aliquam velit. Morbi odio augue, sagittis ut orci ut, vehicula tristique metus. Duis vitae magna pharetra, maximus risus sit amet, fringilla arcu. Pellentesque blandit eu odio non ullamcorper. Cras viverra ipsum nec pellentesque egestas. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sollicitudin risus ac libero faucibus, ut consectetur elit auctor. Cras vel augue laoreet metus varius aliquam vel a enim. Ut iaculis augue sit amet tortor cursus, at interdum libero laoreet. Nunc quis ornare ipsum. Nullam vel nisi scelerisque, fermentum justo at, gravida sapien. Etiam non condimentum arcu. Integer nec elit finibus, lobortis metus vel, aliquam nisi.
          
          Cras consequat, massa ac lobortis dapibus, massa lorem mattis dui, interdum porttitor enim lacus ac lacus. Duis lobortis diam sed lectus malesuada, id pharetra enim rhoncus. Nulla tincidunt enim massa. Sed ullamcorper sollicitudin accumsan. Sed a ipsum ac mauris ultricies volutpat. Cras sollicitudin turpis euismod, maximus sapien vitae, venenatis sapien. Nunc dictum lectus turpis, vel gravida dolor ultrices vel. Donec ultricies rhoncus metus, sit amet posuere nunc viverra nec. Donec eget finibus nulla. Suspendisse potenti. Aliquam eu felis sollicitudin, pulvinar metus sed, bibendum augue. Donec porta purus quis tortor dapibus, in consectetur orci scelerisque. Praesent pulvinar nulla vel iaculis vehicula. Sed quis lectus id lacus mattis ultrices ut quis mauris. Quisque nibh nibh, faucibus suscipit sodales sit amet, semper nec mauris.
          
          Mauris vel imperdiet eros. Donec consequat, dui vitae euismod efficitur, lacus sem commodo velit, ac vehicula leo nibh sed mauris. Suspendisse augue risus, laoreet ut luctus at, sagittis sed diam. Maecenas consequat lacus diam, ac iaculis dui lobortis in. Sed non est bibendum, hendrerit magna sed, blandit justo. Vivamus fermentum tristique sollicitudin. Aliquam elementum, leo non tincidunt placerat, urna dolor porttitor nulla, vitae rhoncus ex velit a dui. Proin rutrum ullamcorper ex vitae ornare. Praesent ultricies augue et enim dapibus, eu auctor nisl tristique. Fusce id purus diam. Fusce ac imperdiet est. Nam aliquet congue tellus vitae accumsan. Fusce nec tortor elit.
          
          Vivamus ultricies tempor elit vel porttitor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas eget odio et leo semper bibendum. Sed vel tincidunt massa. Maecenas imperdiet consectetur mauris, id commodo turpis. Mauris tincidunt dui nisl, eget sodales mauris egestas finibus. Nulla bibendum nunc fermentum nibh pulvinar pellentesque. Phasellus imperdiet ullamcorper mi at tincidunt.
          
          Quisque maximus dolor ac arcu mattis, vitae volutpat orci suscipit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a elementum quam. Ut vitae orci id nulla congue lacinia vitae id lacus. Aenean rutrum, lacus eu fringilla elementum, orci lacus dignissim nunc, vel convallis metus turpis et velit. Nullam viverra faucibus scelerisque. Vivamus vel velit vitae arcu cursus aliquet. Quisque sed dui magna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam eu lorem nec neque porttitor elementum. Aenean varius commodo tortor, at imperdiet orci volutpat eget. `,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('blogs', null, {});
  },
};
