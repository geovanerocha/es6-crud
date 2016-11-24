/*
 * modules/MainModule.js
 */

import Modal from 'modules/ModalModule';
import UserService from 'services/UserService';

export default class MainModule {

	constructor(){

		let self = this;
		let modal = new Modal;
		let addUser = document.getElementById('add-user');
		let content = document.getElementById('table-content');

		UserService.set_storage();
		UserService.show_users(content);

		addUser.addEventListener('click', (e) => {
			Modal.open();
		});

	}

}