const sequelize = require("../database/connect");
const User = require("./user.model");
const Anime = require("./anime.model");


// relashionship between tables

User.hasMany(Anime);
Anime.belongsTo(User);

// syncing databases

User.sync({alter: true});
Anime.sync({alter: true});


module.exports = {
    User,
    Anime

}