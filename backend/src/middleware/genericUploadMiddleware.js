const multer = require('multer');
const ApiError = require('../utils/ApiError');

const storage = multer.memoryStorage();

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB per file
const MAX_PRODUCT_IMAGES = 8;

const fileFilter = (req, file, cb) => {
  if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new ApiError(400, 'Only JPEG, PNG, and WEBP image files are allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: MAX_PRODUCT_IMAGES,
  },
});

const wrapMulter = (multerHandler) => (req, res, next) => {
  multerHandler(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return next(new ApiError(400, `Each image must be under ${MAX_FILE_SIZE / (1024 * 1024)}MB`));
      }
      if (err.code === 'LIMIT_FILE_COUNT') {
        return next(new ApiError(400, `You can upload at most ${MAX_PRODUCT_IMAGES} images at once`));
      }
      return next(new ApiError(400, `Image upload error: ${err.message}`));
    }
    if (err) {
      return next(err);
    }
    next();
  });
};

const uploadSingleImage = wrapMulter(upload.single('image'));

const uploadMultipleImages = wrapMulter(upload.array('images', MAX_PRODUCT_IMAGES));

module.exports = { uploadSingleImage, uploadMultipleImages, MAX_PRODUCT_IMAGES, MAX_FILE_SIZE };
