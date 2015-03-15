var express = require('express');
var crypto = require('crypto');
var async = require('async');
var User = require('../models/user');

var router = express.Router();

/* GET login page */
router.get('/', function(req, res, next) { 
	res.render('login', {});
});

/* POST login handle */
router.post('/', function(req, res, next) { 
	var md5 = crypto.createHash('md5');
	md5.update(req.body.pwd);
	var md5pwd = md5.digest('hex');
	User.findOne({ account: req.body.account, pwd: md5pwd}, function(err, data) { 
		if(err) { 
			return res.render('error', { message: '系统出错，请稍后登陆' });
		}
		else { 
			if(data != null) {
				req.session.user = { 
					_id: data._id,
					nickname: data.info.nickname,
					intro: data.info.intro,
					avatar: data.avatar
				};
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
	async.waterfall([
		function(cb) { 
			// check account is exist
			User.findOne({ account: req.body.account }, function(err, data) { 
				if(err) {
					return res.render('error', { message: '注册失败，请重试' });
				}
				else { 
					if(data != null) {
						return res.render('error', { message: '账号已存在'});
					}
					else { 
						cb(null);
					}
				}
			});
		},
		function(cb) { 
			// check nickname is exist
			User.findOne({ 'info.nickname': req.body.nickname }, function(err, data) { 
				if(err) {
					return res.render('error', { message: '注册失败，请重试' });
				}
				else {
					if(data != null) {
						return res.render('error', { message: '昵称已存在'});
					}
					else { 
						cb(null);
					}
				}
			});
		}
	], function() { 
		// register doing
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
});

module.exports = router;