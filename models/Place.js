const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const User = require('./User')

const Place = db.define('Place', {
    url: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
    },
    price: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
    },
    planet: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
    },
})

Place.belongsTo(User)
User.hasMany(Place)

module.exports = Place