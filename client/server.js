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
		
		var Categories = function(req, res){
			sd.User.find({}).limit(10).exec(function(err, users){
				res.render('public/Categories', sd._ro(req, res, {
					users: users
				}));
			});
		}		
		app.get('/Categories', Categories);

		var CategoryRooms = function(req, res){
			sd.Room.find({}).limit(10).exec(function(err, rooms){
				res.render('public/CategoryRooms', sd._ro(req, res, {
					rooms: rooms
				}));
			});
		}
		app.get('/CategoryRooms', CategoryRooms);

		var Rooms = function(req, res){
			sd.User.find({}).limit(10).exec(function(err, rooms){
				res.render('public/Rooms', sd._ro(req, res, {
					rooms: rooms
				}));
			});
		}		
		app.get('/Rooms', Rooms);

		var Chat = function(req, res){
			sd.User.find({}).limit(10).exec(function(err, users){
				res.render('public/Chat', sd._ro(req, res, {
					users: users
				}));
			});
		}		
		app.get('/Chat', Chat);

		var Albom = function(req, res){
			sd.User.find({}).limit(10).exec(function(err, users){
				res.render('public/Albom', sd._ro(req, res, {
					users: users
				}));
			});
		}		
		app.get('/Albom', Albom);

}; 