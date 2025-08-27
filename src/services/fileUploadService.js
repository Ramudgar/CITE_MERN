const multer = require("multer");
const path = require("path");

// Dynamic storage configuration for different upload types
const dynamicStorage = (uploadType) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `public/${uploadType}/`);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
};

// Multer upload instance
const uploadProfileImage = multer({
  storage: dynamicStorage("profileImage"),
  limits: { fileSize: 4 * 1024 * 1024 }, // 4 MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const mimeType = allowedTypes.test(file.mimetype);
    const extName = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimeType && extName) {
      return cb(null, true);
    } else {
      return cb(new Error("Only JPEG, JPG, or PNG images allowed"), false);
    }
  },
});



module.exports = { uploadProfileImage };
