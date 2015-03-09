var express = require('express');
var router = express.Router();

var User = require('../models/user');

var crypto = require('crypto');

/* GET login page */
router.get('/', function(req, res, next) { 
	res.render('login', {});
});

/* POST login handle */
router.post('/', function(req, res, next) { 
	var md5 = crypto.createHash('md5');
	md5.update(req.body.pwd);
	var md5pwd = md5.digest('hex');
	User.find({ account: req.body.account, pwd: md5pwd}, function(err, data) { 
		if(err) { 
			return res.render('error', { message: '系统出错，请稍后登陆' });
		}
		else { 
			if(data != '') { 
				return res.redirect('/');
			}
			else { 
				return res.render('error', { message: '账号或密码错误' });
			}
		}
	});
});

/* GET register page */
router.get('/reg', function(req, res, next) { 
	res.render('register', {});
});

/* POST register handle */
router.post('/reg', function(req, res, next) { 
	var md5 = crypto.createHash('md5');
	md5.update(req.body.pwd);
	var md5pwd = md5.digest('hex');
	var user = new User({ 
		account: req.body.account,
		pwd: md5pwd,
		info: { 
			nickname: req.body.nickname,
			sex: req.body.sex,
			intro: req.body.intro
		}
	});
	user.save(function(err, data) { 
		if(err) { 
			return res.render('error', { message: '注册失败，请重试' });
		}
		else { 
			return res.redirect('/login');
		}
	});
});

/* check account is exist */
router.post('/chkAccount', function(req, res, next) { 
	res.send('check account is exist');
});

/* check nickname is exist */
router.post('/chkNickname', function(req, res, next) { 
	res.send('check nickname is exist');
});

module.exports = router;