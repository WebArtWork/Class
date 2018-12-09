services.Room = function(mongo, $http, file) {
	var self = this;
	this.rooms = mongo.get('room', function(arr, obj) {
		self.room = arr;
		self._room = obj;
	});
	file.add({
		id: 'roomAvatarUrlId',
		width: 500,
		height: 500
	}, function(dataUrl) {
		self.avatarUrl = dataUrl;
		$http.post('/api/room/file', {
			dataUrl: dataUrl
		}).then(function(resp) {
			self.avatarUrl = resp.data;
		});
	});
	this.create = function(room, message) {
		mongo.create('room', {
			name: room.name,
			description: room.description,
			author: room.author,
			members: room.members,
			url: room.url
		}, function(created) {
			if (room.avatarUrl && room.avatarUrl.length > 100) {
				$http.post('/api/room/file', {
					_id: created._id,
					dataUrl: room.avatarUrl
				}).then(function(resp) {
					created.avatarUrl = resp.data;
				});
			} else {
				created.avatarUrl = '/api/room/default.png';
			}
		});
		if (message) {
			iziToast.show({
				message: message
			});
		}
	}
	this.update = function(room, message) {
		mongo.updateAll('room', {
			name: room.name,
			members: room.moderators,
			description: room.description,
			_id: room._id,
			avatarUrl: room.avatarUrl,
		});
		if (message) {
			iziToast.show({
				message: message
			});
		}
	}
	this.delete = function(room, message) {
		mongo.delete('room', {
			_id: room._id
		});
		if (message) {
			iziToast.show({
				message: message
			});
		}
	}
}