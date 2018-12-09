var services = {}, filters = {}, directives = {}, controllers = {};
app.service(services).filter(filters).directive(directives).controller(controllers);
 /*
*	Crud file for client side user
*	We don't use waw crud on the user as it's basically personal update.
*	And if user use more then one device we can easly handle that with sockets.
*/
services.User = function($http, $timeout, mongo, file, modal){
	// waw crud
		var self = this;
		var updateAll = function(){
			return {
				gender: self.gender,
				age: self.age,
				name: self.name,
				_id: self._id,
				is: self.is,
				avatarUrl: self.avatarUrl
			};
			
        }
		$http.get('/api/user/me').then(function(resp){
			for(var key in resp.data){
				self[key] = resp.data[key];
			}
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
	// Search
		this.sMale = this.sFemale = true;
		this.search = function(){
			if(self.sMinAge<1) self.sMinAge = 1;
			if(self.sMaxAge>100) self.sMaxAge = 100;
			// Queried Users
			mongo.afterWhile(self, function(){
				if(self.sMaxAge<self.sMinAge) self.sMaxAge=self.sMinAge;
				self.qu = self.users.slice();
				self.sName&&mongo.keepByText(self.qu, 'name', self.sName);
				if(!self.sMale||!self.sFemale){
					if(self.sMale) mongo.keepByText(self.qu, 'gender', 'male', true);
					else mongo.keepByText(self.qu, 'gender', 'female', true);
				}
				for (var i = 0; i < self.all_skills.length; i++) {
					if(self['ss_'+self.all_skills[i]]){
						mongo.keepByText(self.qu, 'skills', self.all_skills[i], true);
					}
				}
				self.sMinAge&&mongo.keepByBiggerNumber(self.qu, 'age', self.sMinAge);
				self.sMaxAge&&mongo.keepBySmallerNumber(self.qu, 'age', self.sMaxAge);
			}, 500);
		}
		this.if_false_make_true = function(prefix){
			if(!self[prefix]) self[prefix] = true;
		}
	// Follow Management
		this.following = function(_id){
			if(!self._id) return false;
			for (var i = 0; i < self.followings.length; i++) {
				if(self.followings[i] == _id) return true;
			}
			return false;
		}
		this.follow = function(user){
			user.following = true;
			self.followings.push(user._id);
			$http.post('/api/user/follow', {
				_id: user._id
			});
		}
		this.unfollow = function(user){
			user.following = false;
			for (var i = self.followings.length - 1; i >= 0; i--) {
				if(self.followings[i]==user._id){
					self.followings.splice(i, 1);
				}
			}
			$http.post('/api/user/unfollow', {
				_id: user._id
			});
		}
	// Custom Routes
		this.updateAfterWhile = function(){
			mongo.afterWhile(self, function(){
				mongo.updateAll('user', updateAll());
			});
		}
		file.add({
			_id: 'ProfileID',
			width: 350,
			height: 350
		}, function(dataUrl) {
			self.avatarUrl = dataUrl;
			$http.post('/api/user/avatar',{
				dataUrl: dataUrl
			}).then(function(resp){
				if(resp) self.avatarUrl = resp.data;
			});
		});
		this.deletee = function(){
			mongo.delete('user', {}, function(){
				window.location.href = "/";
			});
		}
		this.changePassword = function(oldPass, newPass, passRepeated){
			if(!oldPass||oldPass.length<8||!newPass) return;
			$http.post('/api/user/changePassword',{
				oldPass: oldPass,
				newPass: newPass
			});
		}
		this.Register = function() {
        modal.open({
            templateUrl: '/html/modals/Register.html',
            u: self
        });
    }
        this.Login = function() {
        modal.open({
            templateUrl: '/html/modals/Login.html',
            u: self
        });
    }
        this.Settings = function() {
        modal.open({
            templateUrl: '/html/modals/Settings.html',
            u: self
        });


    }
	// End of service
} 
services.Room = function(mongo, $http, item, file, user) {
	var self = this;
	this.rooms = mongo.get('room', function(arr, obj) {
		self.room = arr;
		self._rom = obj;
	});
	console.log('something');
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
	this.update = function(group, message) {
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
	this.Register = function() {
    	modal.open({
            templateUrl: '/html/modals/Register.html',
            u: self
        });
    }
}
