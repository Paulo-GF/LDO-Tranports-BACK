const multer = require('multer');

/**
 * Store file in "uploads" folder
 * @param {req.file} - req.file -> object with file informations
 */
const storage = multer.diskStorage({
    destination: function (_, _, cb) {
        cb(null, 'uploads/')
    },

    // Store the file name
    filename: function (_, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage: storage }).single('file');

module.exports = upload;