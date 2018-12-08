services.user = function(mongo, $http, file) {
	var self = this;
	console.log(this);
	$http.get('/api/user/me').then(function(resp) {
		for (var key in resp.data) {
			self[key] = resp.data[key];
		}
		if (!self.data) self.data = {};
		if (!self.data.ignore) self.data.ignore = {};

		self.data.gender = !!self.data.gender;
		mongo.get('user',function(arr, obj) {
			self.users = arr;
			self._users = obj;
		});
	});
	file.add({
		id: 'userAvatarUrlId',
		width: 500,
		height: 500
	}, function(dataUrl) {
		self.avatarUrl = dataUrl;
		$http.post('/api/user/file', {
			dataUrl: dataUrl
		}).then(function(resp) {
			self.avatarUrl = resp.data;
		});
	});
	this.update = function(message) {
		mongo.updateAll('user', {
			name: self.name,
			email: self.email
		});
		$http.post('/api/user/status', {
			email: self.email
		});
		if (message) {
			iziToast.show({
				message: message
			});
		}

	}
	this.changePassword = function(oldPass, newPass) {
		$http.post('/api/user/changePassword', {
			oldPass: oldPass,
			newPass: newPass
		}).then(function(resp) {
			if (resp.data) {
				iziToast.show({
					message: 'Password changed'
				});
			} else {
				iziToast.show({
					message: 'Failed! You enter uncorrect Old password'
				});
			}
		});
		self.update();
	}
	this.Register = function() {
        modal.open({
            templateUrl: '/html/modals/Register.html',
            u: user
        });
        console.log("log");
    }
}