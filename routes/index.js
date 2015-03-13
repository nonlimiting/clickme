var express = require('express');
var router = express.Router();

/* GET home page */
router.get('/', function(req, res, next) { 
	res.render('index', {});
});

/* POST logout */
router.post('/logout', function(req, res, next) { 
	req.session = null;
	res.redirect('/login');
});

module.exports = router;
