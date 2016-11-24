/*
 * modules/ModalModule.js
 */

import UserService from '../services/UserService';
import $ from 'jquery'; // SORRY :(

export default class ModalModule {

	constructor(){

		let self = this;
		let data = data || {};
		let storage = JSON.parse(localStorage.getItem('users'));

		this.modalElement = document.getElementById('modal');
		this.modalElement.addEventListener('click', (e)=> {
			if(e.target.className == 'close'){
				self.close();
			}
		});

		let addUserButton = document.getElementById('event-add');

		addUserButton.addEventListener('click', (e) => {

			if(e.target.getAttribute('id') == 'event-add'){
				let inputs = e.target.parentNode.querySelectorAll('input');
				let content = document.getElementById('table-content');
				let isValid = false;
				
				Object.keys(inputs).map((item) =>{
					if(inputs[item].value.length == 0){
						inputs[item].style.borderColor = 'red';
						isValid = false;
					}else{
						isValid = true;
						data[inputs[item].getAttribute('data-type')] = inputs[item].value;
					}
					
				});

				if(!!isValid){
					UserService.add_user(data);			
					UserService.show_users(content);
				}
			}

		});


	}

	static open(id) {

		let modalElement = document.getElementById('modal');
		let inputs = modalElement.querySelectorAll('input');
		let storage = JSON.parse(localStorage.getItem('users'));
		let button = modalElement.querySelector('button');

		if(!id){

			let i;

			for(i=0; i < inputs.length; i++){
				inputs[i].value = '';
				inputs[i].style.borderColor = "#e2e2e2";
			}

			modalElement.classList.add('fade-in');
			console.log('add');
			modalElement.querySelector('#event-add').style.display = 'inline';

		}else{

			let data = storage.filter((item)=>{
				return item.id == id;
			}).pop();

			modalElement.querySelector('#name').value = data.name;
			modalElement.querySelector('#surname').value = data.surname;
			modalElement.querySelector('#bloodType').value = data.bloodType;
			modalElement.querySelector('#birthDate').value = data.birthDate;
			modalElement.setAttribute('data-id', data.id);
			modalElement.querySelector('#event-add').style.display = 'none';
			modalElement.classList.add('fade-in');
			modalElement.classList.add('edit');

			let html = '<button class="event-edit" id="event-edit">Salvar alterações</button>'; // SORRY :(

			$('#modal .content').append(html); // SORRY :(


			$('#modal #event-edit').click((e)=> {
				UserService.edit_user(data.id);
			});



		}
		
	}
	

	close() {
		this.modalElement.classList.remove('fade-in');
		this.modalElement.classList.remove('edit');

		if($('#modal #event-edit')){ // SORRY :(
			$('#modal #event-edit').remove(); // SORRY :(
		} // SORRY :(

	}

	add_user() {

		let data = {};
		let dataElements = document.querySelectorAll('#content input');
		
		UserService.add_user(data);

	}

}