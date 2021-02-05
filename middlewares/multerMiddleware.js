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

const avatarStorage = multer.diskStorage({
  destination: 'public/images/avatars',
  filename: (req, file, cb) => {
    cb(null, `${req.user.id}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const packetStorage = multer.diskStorage({
  destination: 'public/images/packets',
  filename: (req, file, cb) => {
    cb(null, `packet-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const categoryStorage = multer.diskStorage({
  destination: 'public/images/categories',
  filename: (req, file, cb) => {
    cb(null, `category-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const heroStorage = multer.diskStorage({
  destination: 'public/images/hero',
  filename: (req, file, cb) => {
    cb(null, `hero-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const blogPostStorage = multer.diskStorage({
  destination: 'public/images/blogs',
  filename: (req, file, cb) => {
    cb(null, `blog-post-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const programStorage = multer.diskStorage({
  destination: 'public/images/programs',
  filename: (req, file, cb) => {
    cb(null, `programs-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const testimonialStorage = multer.diskStorage({
  destination: 'public/images/testimonials',
  filename: (req, file, cb) => {
    cb(null, `testimonials-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const galleryStorage = multer.diskStorage({
  destination: 'public/images/galleries',
  filename: (req, file, cb) => {
    cb(null, `gallery-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const uploadAvatar = multer({storage: avatarStorage}).single('image');
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

module.exports = {
  uploadAvatar,
  uploadPacketImage,
  uploadCategoryImage,
  uploadHeroImage,
  uploadBlogpostImage,
  uploadProgramImage,
  uploadTestimonialImage,
  uploadGalleryImage,
};
