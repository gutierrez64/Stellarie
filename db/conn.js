const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('spacebnb', `${process.env.ROOT}`, `${process.env.PASSWORD}`, {
    host: 'db4free.net',
    port: 3306,
    dialect: 'mysql',
})

try {
    sequelize.authenticate()
    console.log('Conectamos com sucesso!')
} catch (err) {
    console.log(`Não foi possível conectar: ${err}`)
}

module.exports = sequelize