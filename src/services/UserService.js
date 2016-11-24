/*
 * modules/UserService.js
 */

 import UserFactory from '../factories/UserFactory';
 import Modal from '../modules/ModalModule';
 import _ from 'lodash';

export default class UserService {

	constructor(){
	}

	static set_storage() {
		let emptyArr = [];
		if(!localStorage.getItem('users')){
			localStorage.setItem('users', JSON.stringify(emptyArr));
		}

		let UserStorage = localStorage.getItem('users');

		return JSON.parse(UserStorage);
	}

	static get_users() {

		let users = JSON.parse(localStorage.getItem('users'));

		return UserFactory.user(users);

	}

	static edit_user(idUser) {
		let storage = JSON.parse(localStorage.getItem('users'));

		let userEdit = '';
		userEdit = _.findIndex(storage,(e)=> {
			return e.id === parseInt(idUser);
		});

		let data = {
			name: document.querySelector('#name').value,
			surname: document.querySelector('#surname').value,
			bloodType: document.querySelector('#bloodType').value,
			birthDate: document.querySelector('#birthDate').value,
			id: parseInt(idUser)
		};

		storage[userEdit] = data;


		localStorage.setItem('users', JSON.stringify(storage));

		UserService.show_users(document.getElementById('table-content'));

	}

	static delete_user(ids) {

		let storage = JSON.parse(localStorage.getItem('users'));

		if(storage.length == 1){

			storage = [];
			document.querySelector('#table-content').innerHTML = '';

		}else{

			let removed = _.remove(storage, (item)=> {
				return item.id != ids;
			});
			storage = removed;

		}
	

		localStorage.setItem('users', JSON.stringify(storage));

	}

	static add_user(obj) {

		let storage = JSON.parse(localStorage.getItem('users'));
		obj['id'] = Math.floor(Math.random() * 100);
		storage.push(obj);
		localStorage.setItem('users', JSON.stringify(storage));

	}

	static show_users(element) {

	let self = this;

	if(JSON.parse(localStorage.getItem('users')).length == 0){
			return false;
		}

	let str = '';

	JSON.parse(localStorage.getItem('users')).map((item) => {
		if(!item){
			return false;
		}
		let formattedDate = item.birthDate
							.split('-')
							.reverse()
							.join('/');

		str += `<tr>
					<td>${item.name + ' ' + item.surname}</td>
					<td>${item.bloodType}</td>
					<td>${formattedDate}</td>
					<td><button data-id=${item.id} class="edit-user">Editar</button></td>
					<td><button data-id=${item.id} class="remove-user">Remover</button></td>
				</tr>`;
	});

	element.innerHTML = str;

	let tableRows = document.querySelectorAll('tbody tr');
	let removeUser = document.querySelectorAll('.remove-user');
	let editUser = document.querySelectorAll('.edit-user');
	let i, j, k;

	for(k=0; k < tableRows.length; k++){
		tableRows[k].setAttribute('tabindex', k);
	}
	
	for(i=0;i < removeUser.length; i++){
		removeUser[i].addEventListener('click', (e) => {
			self.delete_user(e.target.getAttribute('data-id'));
			self.show_users(document.getElementById('table-content'));
		});
	}

	for(j=0;j < editUser.length; j++){
		editUser[j].addEventListener('click', (e) => {
			Modal.open(e.target.getAttribute('data-id'));
		});
	}




	}


}
