/*
 * modules/UserModule.js
 */

import UserService from '../services/UserService';

export default class UserModule {

	constructor(){

		UserService.set_storage();
		
	}

	show_users(){

		return UserService.get_users();
	
	}

}
