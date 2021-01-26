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

module.exports = {uploadAvatar, uploadPacketImage, uploadCategoryImage};
