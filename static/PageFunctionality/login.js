
const loginCustomer = () => {

	let form = document.getElementById("loginform");
	let email = form["email"].value;
	let password = form["password"].value;

	if (email != "" && password != "") {
		login(email, password);
	}
	else invalid('login');
}
const registerCustomer = () => {

	let form = document.getElementById("registerForm");
	let name = form["name"].value;
	let email = form["email"].value;
	let password = form["password"].value;
	let confirmPassword = form["confirm-password"].value;

	if (password != "" && name != "" && email != "" && password == confirmPassword) {
		let body = {
			name: name,
			email: email,
			password: password,
			confirmPassword: confirmPassword
		}
			register(body);
	}
	else invalid("register");
}

const register = (body) => {
	console.log(body);
	fetch(path + "/user/sign-up", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	})
		.then((response) => response.json())
		.then((customer) => {

			if ("error" in customer) {
				invalid('register');
			} else {
				valid("Registered");
				window.location.href = path + "/";
			}
		})
		.catch((error) => {
			console.log("Error: ", error)
		});


}
const valid = (message) => {
	let msg = document.getElementById("msg");
	msg.innerHTML = "Succesfully" + message + " !!";
	msg.style.color = "green";
	msg.style.fontWeight = "900";
	msg.style.fontSize = "x-large";

}

const invalid = (message) => {
	let msg = document.getElementById("msg");


	if (message == 'register') {
		msg.innerHTML = "Invalid Registration  !! <br> Kindly check, your own unique identity";
	} else {
		msg.innerHTML = "Invalid Credentials !! <br> Kindly check your username/password";
		window.location.href = path + "/login";
	}
	msg.style.color = "red";
	msg.style.fontStyle = "Italic";

}


const login = (email, password) => {
	let body = {
		email: email,
		password: password
	};

	fetch(path + "/user/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(body),
	})
		.then((response) => response.json())
		.then((user) => {
			if (user.success == true) {
				localStorage.setItem("access-token", user.data.accessToken);
				valid("Logged In");
				window.location.href = path + "/home";
			} else {
				invalid('login');
			}
		}).catch((error) => {
			console.log("Error: ", error)
		});

}

