const {Sequelize, DataTypes} = require("sequelize");
const sequelize = require("../database/connect");

const Anime = sequelize.define("Anime", {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    picture:{
        type: DataTypes.STRING,
        allowNull: false
    },
    rating:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Anime;