var Room = require(__dirname+'/schema.js');
module.exports = function(sd) {
	var router = sd._initRouter('/api/room');
	sd['query_update_all_room'] = function(req, res){
		return {
			_id: req.body._id,
			author: req.user._id
		};
	};
	sd['query_unique_field_room_url'] = function(req, res){
		return {
			_id: req.body._id,
			author: req.user._id
		};
	};
	router.post("/file", function(req, res) {
		Room.findOne({
			_id: req.body._id,
			author: req.user._id
		}, function(err, doc){
			if(err||!doc) return res.json(false);
			doc.avatarUrl = '/api/room/file/' + doc._id + '.jpg?' + Date.now();
			sd._parallel([function(n){
				doc.save(n);
			}, function(n){
				sd._dataUrlToLocation(req.body.dataUrl,
					__dirname + '/files/', doc._id + '.jpg', n);
			}], function(){
				res.json(doc.avatarUrl);
			});
		});
	});
	router.get("/file/:file", function(req, res) {
		res.sendFile(__dirname + '/files/' + req.params.file);
	});
	router.get("/default.png", function(req, res) {
		res.sendFile(__dirname + '/files/avatar.png');
	});
};
