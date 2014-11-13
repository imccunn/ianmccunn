/**
 *     User Database demo using Ember JS
 *     
 *     By Ian D. McCunn, @ianmccunn
 */


/**
 * FakeUser is for the creation of dummy data for the ember apps FIXTURE data
 */
function FakeUser() {
	this.firstName;
	this.lastName;
	this.email;
	this.id;
}

FakeUser.prototype = {
	constructor: FakeUser,
	init: function(userId) {
		this.firstName = this.randFirst();
		this.lastName = this.randLast();
		this.email = this.randEmail();
		this.id = userId;
	},

	randFirst: function() {
		var firstNames = ['Bob', 'Jill', 'Jane', 'Gerald', 'Richard', 'Harry', 'Samantha', 'Cindy', 'Barb', 'Mary', 'Tim', 'Harry', 'John'];
		var name = firstNames[rIndex(firstNames)];
		return name;
	},

	randLast: function() {
		var lastNames = ['Smith', 'Washington', 'Thomas', 'Harris', 'Donaldson', 'Robinson', 'Hamilton', 'Williams', 'Brown', 'Miller'];
		var name = lastNames[rIndex(lastNames)];
		return name;
	},

	randEmail: function() {
		var tlds = ['com', 'net', 'org', 'tld', 'edu', 'info', 'gov'];
		var dn = ['americaoffline', 'email', 'arrakis', 'jupiter', 'example', 'aperature', 'snailmail', 'vega'];
		var name = ['orange', 'apples', 'banana', 'starfruit', 'grapes', 'tomato', 'coconut', 'strawberry', 'pear', 'pineapple', 'juice'];
		var addr = name[rIndex(name)] + '@' + dn[rIndex(dn)] + '.' + tlds[rIndex(tlds)];
		return addr;
	}
}

function FakeUsers(){
	this.all = [];
}

FakeUsers.prototype = {
	init: function(numOfUsers) {
		for (var i = 0; i < numOfUsers; i++) {
			this.all[i] = new FakeUser();
			this.all[i].init(i);
		}
	}
}

/**
 *     rIndex returns a random integer in the range of the passed arrays length
 * 
 * @param  {array} arr
 * @return {int}
 */		
function rIndex(arr) {
		return Math.floor(Math.random() * arr.length);
}

var users1 = new FakeUsers();
users1.init(10);

App = Ember.Application.create();

/**
 *     Model class definition for user database
 *     
 * @type {DS.Model}
 */
App.User = DS.Model.extend({
	firstName: DS.attr(),
	lastName: DS.attr(),
	email: DS.attr()
});

App.ApplicationAdapter = DS.FixtureAdapter.extend();

App.User.FIXTURES = users1.all;

/**
 *     URL mapping for ember app.
 *     
 * @return {none}
 */
App.Router.map(function() {
	this.resource('index', {path: '/'});
	this.route('info', {path: '/info'})
	this.resource('users', {path: '/users'}, function() {
		this.resource('createUser', {path: '/create-user'});
		this.resource('user', {path: '/:id/'}, function() {
			this.resource('editUser', {path: ':id/edit'});
		});
	});

	
});

App.IndexRoute = Ember.Route.extend({
	beforeModel: function() {
		this.transitionTo('info');
	}
})

// App description page. Contents in HB template. 
App.InfoRoute = Ember.Route.extend();

/**
 *     Users route and model. Returns all users of the app store (DS.Model)
 *     
 * @param  {none} 
 * @return {array}
 */
App.UsersRoute = Ember.Route.extend({
	model: function() {
		return this.store.find('user');
	}
});

/**
 *     Route and model for a single user. For viewing.
 *     
 * @param  {none} params
 * @return {obj}
 */
App.UserRoute = Ember.Route.extend({
	model: function(params) {
		return this.store.find('user', params.id);
	}
});

/**
 *     EditUser's model is a single user that is editable.
 *     
 * @param  {int} params
 * @return {obj}
 */
App.EditUserRoute = Ember.Route.extend({
	model: function(params) {
		return this.store.find('user', params.id);
	}
});

App.EditUserController = Ember.Controller.extend({
	actions: {
		done: function() {
			var errors = utils.validateFormInfo(this.get('model.firstName'), this.get('model.email'));
			if (errors) {
				$('#errors').css('display', 'block');
				$('#errors').html(errors);
				return;
			}
			$('#invalid-email').css('display', 'none');
			this.transitionToRoute('users');
		},
		remove: function(user) {
			this.store.find('user', user.id).then(function(u) {
				u.deleteRecord();
				u.save();
			});
			this.transitionToRoute('users');
		}
	}
});

App.CreateUserRoute = Ember.Route.extend({
	model: function() {
		return this.store.find('user');
	}

});

App.CreateUserController = Ember.Controller.extend({
	actions: {
		
		/**
		 *     Pulls input tag values from handlebars template and sets those values
		 *     to a new record in the ember store(DS.store), email validation, and 
		 *     transitions back to user table view.
		 *     
		 * @return {none} 
		 */
		createUser: function() {
			console.log("create user called...");
			var newFirst = this.get('newFirst');
			var newLast = this.get('newLast');
			var newEmail = this.get('newEmail');

			var errors = utils.validateFormInfo(newFirst, newEmail);

			if (errors) {
				$('#errors').css('display', 'block');
				$('#errors').html(errors);
				return;
			}
			$('#errors').css('display', 'none');

			var nUser = this.store.createRecord('user', {
				firstName: newFirst,
				lastName: newLast,
				email: newEmail
			});
			nUser.save();

			this.set('newFirst', '');
			this.set('newLast', '');
			this.set('newEmail', '');

			this.transitionToRoute('users');
		}
	}
});

var utils = {
	validateEmail: function(email) {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    	return re.test(email);
	},
	validateFormInfo: function( firstName, email ) {
		var errors = '';
		if (!firstName || firstName.length < 2) {
			errors += '<p>First name is required. </p>';
		}

		if (!this.validateEmail(email)) {
			errors += '<p>Please enter a valid email address. </p>';
		}
		return errors;
	}
};




