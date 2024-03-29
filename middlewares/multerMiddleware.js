const multer = require('multer');
const path = require('path');

const checkFileType = (file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);
  if (mimeType && extName) {
    return cb(null, true);
  }
  return cb(null, false);
};

const checkPdf = (file, cb) => {
  const fileTypes = /pdf/;
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);
  if (mimeType && extName) {
    return cb(null, true);
  }
  return cb(null, false);
};

const avatarStorage = multer.diskStorage({
  destination: `${__dirname}/../public/images/avatars`,
  filename: (req, file, cb) => {
    cb(null, `${req.user.id}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const packetStorage = multer.diskStorage({
  destination: `${__dirname}/../public/images/packets`,
  filename: (req, file, cb) => {
    cb(null, `packet-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const categoryStorage = multer.diskStorage({
  destination: `${__dirname}/../public/images/categories`,
  filename: (req, file, cb) => {
    cb(null, `category-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const heroStorage = multer.diskStorage({
  destination: `${__dirname}/../public/images/hero`,
  filename: (req, file, cb) => {
    cb(null, `hero-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const blogPostStorage = multer.diskStorage({
  destination: `${__dirname}/../public/images/blogs`,
  filename: (req, file, cb) => {
    cb(null, `blog-post-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const programStorage = multer.diskStorage({
  destination: `${__dirname}/../public/images/programs`,
  filename: (req, file, cb) => {
    cb(null, `programs-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const testimonialStorage = multer.diskStorage({
  destination: `${__dirname}/../public/images/testimonials`,
  filename: (req, file, cb) => {
    cb(null, `testimonials-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const galleryStorage = multer.diskStorage({
  destination: `${__dirname}/../public/images/galleries`,
  filename: (req, file, cb) => {
    cb(null, `gallery-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const brochureStorage = multer.diskStorage({
  destination: `${__dirname}/../public/files/brochures`,
  filename: (req, file, cb) => {
    cb(null, `brochure.pdf`);
  },
});

const uploadAvatar = multer({storage: avatarStorage}).single('image');
// const uploadPacketImage = multer({
//   storage: packetStorage,
//   fileFilter(req, file, cb) {
//     checkFileType(file, cb);
//   },
// }).single('image');

const uploadPacketImage = multer({
  storage: packetStorage,
  fileFilter(req, file, cb) {
    checkFileType(file, cb);
  },
}).single('image');

const uploadCategoryImage = multer({
  storage: categoryStorage,
  fileFilter(req, file, cb) {
    checkFileType(file, cb);
  },
}).single('image');

const uploadHeroImage = multer({
  storage: heroStorage,
  fileFilter(req, file, cb) {
    checkFileType(file, cb);
  },
}).single('image');

const uploadBlogpostImage = multer({
  storage: blogPostStorage,
  fileFilter(req, file, cb) {
    checkFileType(file, cb);
  },
}).single('image');

const uploadProgramImage = multer({
  storage: programStorage,
  fileFilter(req, file, cb) {
    checkFileType(file, cb);
  },
}).single('image');

const uploadTestimonialImage = multer({
  storage: testimonialStorage,
  fileFilter(req, file, cb) {
    checkFileType(file, cb);
  },
}).single('image');

const uploadGalleryImage = multer({
  storage: galleryStorage,
  fileFilter(req, file, cb) {
    checkFileType(file, cb);
  },
}).single('image');

const uploadBrochure = multer({
  storage: brochureStorage,
  fileFilter(req, file, cb) {
    checkPdf(file, cb);
  },
}).single('file');

module.exports = {
  uploadAvatar,
  uploadPacketImage,
  uploadCategoryImage,
  uploadHeroImage,
  uploadBlogpostImage,
  uploadProgramImage,
  uploadTestimonialImage,
  uploadGalleryImage,
  uploadBrochure,
};
