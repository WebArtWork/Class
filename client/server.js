module.exports = function(app, sd) {
	/*
	*	Local
	*	[add local below this line]
	*/
	app.get('/Register', function(req, res){
		res.render('Register', {});
	});
	app.get('/', function(req, res){
		if(!req.user)
			return res.render('Explore', {});
		res.render('Route');
	});
	app.get('*', function(req, res){
		if(!req.user)
			return res.render('Explore', {});
		res.render('Route');
	});
		
};