var express = require('express');
var router = express.Router();

/* GET friends page */
router.get('/', function(req, res, next) { 
	res.render('friends', { user: req.session.user });
});

/* GET add friends page */
router.get('/add', function(req, res, next) { 
	res.render('add', { user: req.session.user });
});

module.exports = router;
