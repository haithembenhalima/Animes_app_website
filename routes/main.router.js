const express = require("express");
const router = express.Router();
const mainController = require("../controllers/main.controller");
const userController = require("../controllers/user.controller");
const {body, query, validationResult} = require("express-validator");
const {checkExistingEmail} = require("../middlewares/checkExistingEmail");
const {verifyToken} = require("../middlewares/verifyToken");
const AnimeController = require("../controllers/Anime.controller");
const upload = require("../utils/uploadFile");
const reset = require("../middlewares/passwordReset");


router.get("/", mainController.home_page);
router.get("/login", mainController.login_page);
router.get("/signup", mainController.signup_page);
router.post("/signup", [
                        body("firstname").notEmpty(),
                        body("lastname").notEmpty(),
                        body("email").isEmail(),
                        body("password").isLength({min: 8,max: 30}),
                        checkExistingEmail,
                        ], userController.signup);
router.post("/login",userController.login);
router.get("/animes", [verifyToken], AnimeController.getAnimes);
router.get("/animes/anime_add",mainController.anime_add_page);
router.post("/animes/anime_add",[verifyToken,upload.single("file")],AnimeController.addAnime);
router.get("/resetPassword",mainController.resetPassword);


module.exports = router;