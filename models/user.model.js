const {Sequelize, DataTypes} = require("sequelize");
const sequelize = require("../database/connect");

const User = sequelize.define("User", {

    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    firstname:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastname:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    token:{
        type: DataTypes.STRING,
        allowNull: false
    }

});

module.exports = User;


