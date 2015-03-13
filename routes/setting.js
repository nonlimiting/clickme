var express = require('express');
var router = express.Router();

/* GET set info page */
router.get('/', function(req, res, next) { 
	res.render('setting', {});
});

/* GET set pwd page */
router.get('/pwd', function(req, res, next) { 
	res.render('pwd', {});
});

/* GET set avatar page */
router.get('/avatar', function(req, res, next) { 
	res.render('avatar', {});
});

module.exports = router;
