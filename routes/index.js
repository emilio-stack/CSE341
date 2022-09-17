/**
 * The file that contains all of the routes of the application
 */
const router = require('express').Router();
const { index } = require("../controllers/index")

router.get('/', index);     // use controller architecture to handle route logic

module.exports = router;