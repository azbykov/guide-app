var Vow = require('vow');
var _ = require('lodash');
var Model = require('../models/user').model;

var helper = {
	saveTeam: function (user, teamId) {
		var deferred = Vow.defer();
		var id = user._id;

		if (!user.teams) {
			user.teams = [];
		}
		user.teams.push(teamId);

		user.teams = _.uniq(user.teams);

		user = user.toObject();
		Model.update({ _id: id }, user, function(err, numberAffected, rawResponse) {
			if(err) {
				var message = '#updateAccountById error update account:' + err;
				deferred.reject(message);
			} else {
				deferred.resolve()
			}
		});

		return deferred.promise();
	},
	removeTeam: function (userParams, teamId) {
		var deferred = Vow.defer();

		Model.findById(userParams._id, function (err, user) {
			if (err) {
				deferred.reject(err);
			}
			var teams = [];
			console.log(user, teamId);
			_.forEach(user.teams, function(id) {
				if (id != teamId) {
					teams.push(id);
				}
			});
			user.teams = teams;
			user.save(function (err) {
				if (err) {
					log.error(err);
					deferred.reject(err);
				} else {
					deferred.resolve();
				}
			});
		});

		return deferred.promise();
	}
};

module.exports = helper;

