var tweetBank = require('../tweetBank');
var model = require('../models/index');

module.exports = function (io) {
	var router = require('express').Router();

	router.get('/', function (req, res) {
		// will trigger res.send of the index.html file
		// after rendering with swig.renderFile
		model.Tweet.findAll({include: [model.User]})
		.then(function(tweets)
		{
			res.render('index', {
				showForm: true,
				title: 'Home',
				tweets:  tweets
			});
		});

	});

	router.get('/users/:name', function (req, res) {
		// var userTweets = tweetBank.find({
		// 	name: req.params.name
		// });
	var theName = req.params.name;

		model.Tweet.findAll({include: [{model: model.User, where: {name: theName}}]})
		.then(function(userTweets){
			res.render('index', {
			showForm: true,
			title: theName,
			tweets: userTweets,
			theName: theName
		});
		})
	});

	router.get('/users/:name/tweets/:id', function (req, res) {
		var id = parseInt(req.params.id);
		var name = req.params.name;

		model.Tweet.findAll({
			include: [{
				model: model.User,
				where: {name: name}
			}], 
			where: {id: id}
		})
		.then(function(tweets){
		res.render('index', {title: name, tweets: tweets});
	});
});

	router.post('/submit', function (req, res) {
		var userName = req.body.shenanigans;
		var tweet = req.body.text;
		model.User.findOrCreate({where: {name: userName}})
  			.spread(function(user, created) {
  					console.log(user.get({
      					plain: true
    		 		}).id);
  				return user.get({
      					plain: true
    		 		}).id;
      	}).then(function(userId){
      		return model.Tweet.create({ id: null, UserId: userId, tweet: tweet});

      	}).then(console.log)
      	.catch(console.log);

  
		//var theNewTweet = tweetBank.list().pop();

		//io.sockets.emit('new_tweet', theNewTweet);
		res.redirect('/');
	});
	return router;
};