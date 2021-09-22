const multer = require('multer');

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => callback(null, 'src/uploads'),
  filename: (req, _file, callback) => callback(null, `${req.params.id}.jpeg`),
});

const recipeImage = multer({ storage });

module.exports = recipeImage;