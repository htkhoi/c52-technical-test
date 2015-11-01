var express = require('express');
var router = express.Router();

/* GET Home Page */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Technical Test' });
});

module.exports = router;
