const Models = require("../models/index.model");
const upload = require("../utils/uploadFile");

const getAnimes = async (req,res) => {
    try {
        const animes = await Models.Anime.findAll();
        res.render("animes",{animes: animes});
    } catch (error) {
        console.log(error);
    }
};

const addAnime = async (req,res) =>{
    const newAnime = req.body;
    console.log(newAnime);
    if(!req.file){
        return res.redirect("/anime/anime_add")
    }
    else{   
        
        let filePath = `/uploads/images/${req.file.filename}`;
        console.log(filePath);
    }
};

module.exports = {
    getAnimes,
    addAnime
}