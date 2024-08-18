const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary_config');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'projects',
        allowedFormats: ['jpg', 'png'],
        transformation: [{ width: 800, height: 450, crop: 'limit' }],
    },
});

const upload = multer({ storage: storage });

module.exports = upload;
