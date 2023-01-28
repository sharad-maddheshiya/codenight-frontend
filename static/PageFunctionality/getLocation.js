const showPosition = (position) => {
	let x = document.getElementById("user-position");
	x.innerHTML = "Latitude: " + position.coords.latitude +
		"<br>Longitude: " + position.coords.longitude;
}

const showError = (error) => {
	let x = document.getElementById("user-position");
	switch (error.code) {
		case error.PERMISSION_DENIED:
			x.innerHTML = "User denied the request for Geolocation."
			break;
		case error.POSITION_UNAVAILABLE:
			x.innerHTML = "Location information is unavailable."
			break;
		case error.TIMEOUT:
			x.innerHTML = "The request to get user location timed out."
			break;
		case error.UNKNOWN_ERROR:
			x.innerHTML = "An unknown error occurred."
			break;
	}
}

const options = {
	enableHighAccuracy: true,
	timeout: 5000,
	maximumAge: 0
};
const success = (pos) => {
	var crd = pos.coords;
	document.getElementById('user-position').innerHTML = "Latitude: " + crd.latitude +
		"  Longitude: " + crd.longitude;
}

const getLocation = () => {
	if (navigator.geolocation) {
		//navigator.geolocation.watchPosition(showPosition);
		navigator.geolocation.watchPosition(success, showError, options);
	} else {
		document.getElementById('user-position').innerHTML = "Geolocation is not supported by this browser.";
	}
}