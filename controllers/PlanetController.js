module.exports = class PlanetController {
    static mercury(req, res) {
        res.render('planets/mercury')
    }

    static venus(req, res) {
        res.render('planets/venus')
    }

    static earth(req, res) {
        res.render('planets/earth')
    }

    static mars(req, res) {
        res.render('planets/mars')
    }
    
    static jupiter(req, res) {
        res.render('planets/jupiter')
    }

    static saturn(req, res) {
        res.render('planets/saturn')
    }

    static uranus(req, res) {
        res.render('planets/uranus')
    }

    static neptune(req, res) {
        res.render('planets/neptune')
    }
}