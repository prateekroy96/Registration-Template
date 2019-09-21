const Sequelize = require('sequelize');

const db = new Sequelize({
    dialect: 'sqlite',
    storage: 'db.sqlite'
  });

const Users = db.define('users', {
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING
})

db.sync().then(() => console.log("Database is ready")).catch(() => console.log("Can't connect to database"))

exports = module.exports = {
    db,
    Users
}