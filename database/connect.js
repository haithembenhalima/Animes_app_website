const {Sequelize} = require("sequelize");
const db = require("../config/db.config");


const sequelize = new Sequelize(db.database, db.username, db.password,
    {
        host: db.host,
        dialect: db.dialect
    });

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

module.exports = sequelize;    