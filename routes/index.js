var express = require('express');
var router = express.Router();

/* GET home page */
router.get('/', function(req, res, next) { 
	res.render('index', { user: req.session.user });
});

/* GET logout */
router.get('/logout', function(req, res, next) { 
	req.session.user = null;
	res.redirect('/login');
});

module.exports = router;
