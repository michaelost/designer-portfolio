var express = require('express');
var router = express.Router();

/* GET home page. */

var mongoose = require('mongoose');
var works = require('../models/works');
var admin = require('../models/admin');
router.use(function(req,res,next){
	console.log(req.method,req.url);

	next();
});


router.get('/login',function(req,res){
	
	res.render('login');
	console.log('dasads');
	mongoose.model('Admin').find({},function(err,data){
		console.log(data);
	});


});

router.post('/login',function(req,res){
	mongoose.model('Admin').findOne({login: req.body.login},function(err,data){
		
		if (data.password === req.body.password) {
			req.session.user = data;
			res.redirect('/admin');
			
		}
			else {res.render('login');}
		
		
		

	});
});


router.get('/admin',function(req,res){
	
	if(req.session && req.session.user){

	mongoose.model('Admin').findOne({login: req.session.user.login},function(err,data){
		if (!data){
				res.session.reset();
				res.redirect('/login');
				
		}

		else{
			res.locals.user = data;
			res.render('admin');
		}
		
		
	});

	} else {
		res.redirect('/login');
	}
});




router.get('/',function(req,res){
	res.render('index')
});

router.get('/logout',function(req,res){
	req.session = null;
	res.redirect('/');
});


router.get('/works/create',function(req,res){
	

	if(req.session && req.session.user){

	mongoose.model('Admin').findOne({login: req.session.user.login},function(err,data){
		if (!data){
				res.session.reset();
				res.redirect('/login');
				
		}

		else{
			res.locals.user = data;
			res.render('newWork');
		}
		
		
	});

	} else {
		res.redirect('/login');
	}

	
	

});

router.get('/photo',function(req,res){
	res.render('photo');
});

router.post('/photo',function(req,res){
	if(done == true){
		console.log(req.files);
		res.end("file uploaded");
	}
});


router.post('/works/create',function(req,res) {
		mongoose.model('Works').create({
		name: req.body.name, 
		title: req.body.title, 
		description: req.body.descr
		},function(err,thor){
				if(err) res.send(err);
				else res.redirect('/works/create');
		});
})

router.get('/works',function(req,res){
	mongoose.model('Works').find(function(err,works){
		res.render('works',{data: works });
	});
	
	});

router.get('/works/:name',function(req,res){
	mongoose.model('Works').find({name: req.params.name},function(err,doc){
		if(err) console.log(err);
				else console.log(doc);
		res.render('workPage',{data: doc});

	});


});
	
router.get('/works/create',function(req,res,next){
	works.save(
		{
			title:'fucken title',
			description: 'fucken description', 
			name: 'fucken name'
		},function (err) {
		// body...
	});
	next();
});

module.exports.router = router;
