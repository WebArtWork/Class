module.exports = function(app, sd) {
	/*
	*	Local
	*	[add local below this line]
	*/
		var Explore = function(req, res){
			sd.User.find({}).limit(10).exec(function(err, users){
				res.render('public/Explore', sd._ro(req, res, {
					users: users
				}));
			});
		}
		app.get('/', Explore);
}; 