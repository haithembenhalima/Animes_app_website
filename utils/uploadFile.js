const multer = require("multer");
const path =  require("path");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/images')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })
module.exports = upload;