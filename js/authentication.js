const url_query = new URLSearchParams(window.location.search);
let log_or_reg = url_query.get('show');
if(log_or_reg.trim() === 'login'){
	let login_div =document.querySelector('.login-box');
	login_div.style.display = 'block';
	let sub_form = document.querySelector('.login-body form');
	sub_form.addEventListener('submit', (e)=>{
		e.preventDefault();
		let username = document.querySelector('.login-body .name-div input').value;
		let password = document.querySelector('.login-body .pass-div input').value;
		let cookies = document.cookie.split(';');
		let name = '';
		let pass = '';
		cookies.forEach((cookie)=>{
			key_val = cookie.split('=');
			if(key_val[0].trim() == 'user'){
				name =key_val[1];
			}else if(key_val[0].trim() == 'pass'){
				pass = key_val[1];
			}
		});
		if(username.trim() == name.trim() && password.trim() == pass.trim()){
			sessionStorage.setItem("login","log");
			location.assign('index.html');
		}else{
			let errors_div = document.querySelector('.errors');
			errors_div.style.display = 'block';
			errors_div.innerHTML = '<div>username or password not currect</div>'
		}
	});
	
	
}else if(log_or_reg.trim() === 'signup'){
	let signup_div =document.querySelector('.signup-box');
	signup_div.style.display = 'block';
	let sub_form = document.querySelector('.signup-body form');
	sub_form.addEventListener('submit', (e)=>{
		e.preventDefault();
		let username = document.querySelector('.signup-body .name-div input').value;
		let password = document.querySelector('.signup-body .pass-div input').value;
		let email = document.querySelector('.signup-body .email-div input').value;
		if(username.trim() !='' && password.trim().length > 7){
			password_numbers = password.split('').filter(function(char){
				return !isNaN(char - 1);
			});
			if(password_numbers.length > 0 && password_numbers.length != password.length){
				username_test = username.split('').filter(function(char){
					return isNaN(char - 1);
				});
				if(username_test.length == 0){
					let errors_div = document.querySelector('.errors');
					errors_div.style.display = 'block';
					errors_div.innerHTML = '<div>username must contain letters</div>'
				}else{
					let current_date = new Date;
					current_date.setDate(current_date.getDate() + 365);
					let exp_date = current_date.toUTCString();
					document.cookie = (`user = ${username} ; expires=${String(exp_date)}; path=/`);
					document.cookie = (`pass = ${password}  ; expires=${String(exp_date)}; path=/`);
					document.cookie = (`email = ${email}  ; expires=${String(exp_date)}; path=/`);
					location.assign('login.html?show=login');
				}
				
			}else{
				let errors_div = document.querySelector('.errors');
				errors_div.style.display = 'block';
				errors_div.innerHTML = '<div>password must contain numbers and letters</div>'
			}
		}else{
			let errors_div = document.querySelector('.errors');
			if(username.trim() ==''){
				errors_div.style.display = 'block';
				errors_div.innerHTML = '<div>username is reduired</div>'
			}
			if(password.trim().length < 8){
				errors_div.style.display = 'block';
				errors_div.innerHTML += '<div>Password must be at least 8 characters</div>'
			}
		}
	});
	
}else if(log_or_reg.trim() === 'logout'){
	sessionStorage.removeItem("login");
	location.assign('index.html');
}