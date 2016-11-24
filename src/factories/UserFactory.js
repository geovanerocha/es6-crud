/*
 * modules/UserFactory.js
 */

import User from '../models/UserModel';

class UserFactory {

	constructor(){
	}

	user(users) {

		return users.map(user => new User(user));
		
	}

}

export default new UserFactory();
