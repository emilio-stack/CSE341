const routes = require('express').Router();

routes.get('/', (req, res) => {
    res.send('Carver Fife');
});

module.exports = routes;