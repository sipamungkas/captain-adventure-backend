const multer = require('multer');
const path = require('path');

const avatarStorage = multer.diskStorage({
  destination: 'public/avatars',
  filename: (req, file, cb) => {
    cb(null, `${req.user.id}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const uploadAvatar = multer({storage: avatarStorage});

module.exports = {uploadAvatar};
