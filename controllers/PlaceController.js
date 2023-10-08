const Place = require('../models/Place')
const User = require('../models/User')

const { Op } = require('sequelize')

module.exports = class PlaceController {
    static async showPlaces(req, res) {
        let search = ''

        if (req.query.search) {
            search = req.query.search
        }

        let order = 'DESC'

        if (req.query.order === 'old') {
            order = 'ASC'
        } else {
            order = 'DESC'
        }

        const placesData = await Place.findAll({
            include: User,
            where: {
                [Op.or]: [
                    { title: { [Op.like]: `%${search}%` } },
                    { description: { [Op.like]: `%${search}%` } }
                ]
            },
            order: [['createdAt', order]]
        })

        const places = placesData.map((result) => result.get({ plain: true }))

        let placesQty = places.length

        if (placesQty === 0) {
            placesQty = false
        }

        res.render('places/home', { places, search, placesQty })
    }

    static async dashboard(req, res) {
        const userId = req.session.userid

        if (!userId) {
            res.redirect('/login')
        }

        const user = await User.findOne({
            where: {
                id: userId,
            },
            include: Place,
            plain: true,
        })

        // check if user exists
        if (!user) {
            res.redirect('/login')
        }

        const places = user.Places.map((result) => result.dataValues)

        let emptyPlaces = false

        if (places.length === 0) {
            emptyPlaces = true
        }

        res.render('places/dashboard', { places, emptyPlaces })
    }

    static createPlace(req, res) {
        res.render('places/create')
    }

    static async createPlaceSave(req, res) {
        const place = {
            url: req.body.url,
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            planet: req.body.planet,
            UserId: req.session.userid,
        }

        try {
            await Place.create(place)

            req.flash('message', 'Local criado com sucesso!')

            req.session.save(() => {
                res.redirect('/places/dashboard')
            })
        } catch (error) {
            console.log('Aconteceu um erro: ' + error)
        }
    }

    static async removePlace(req, res) {
        const id = req.body.id
        const UserId = req.session.userid

        try {
            await Place.destroy({ where: { id: id, UserId: UserId } })

            req.flash('message', 'Local removido com sucesso!')

            req.session.save(() => {
                res.redirect('/places/dashboard')
            })
        } catch (error) {
            console.log('Aconteceu um erro: ' + error)
        }
    }

    static async updatePlace(req, res) {
        const id = req.params.id

        const place = await Place.findOne({ where: { id: id }, raw: true })

        res.render('places/edit', { place })
    }

    static async updatePlaceSave(req, res) {
        const id = req.body.id

        const place = {
            url: req.body.url,
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            planet: req.body.planet,
        }

        try {
            await Place.update(place, { where: { id: id } })
            req.flash('message', 'Local atualizado com sucesso!')

            req.session.save(() => {
                res.redirect('/places/dashboard')
            })
        } catch (error) {
            console.log('Aconteceu um erro: ' + error)
        }
    }
}