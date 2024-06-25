
const geocodeAPIEndpoint = 'https://maps.googleapis.com/maps/api/geocode/json'
const routesAPIEndpoint = 'https://maps.googleapis.com/maps/api/directions/json'

export async function getLocationByAddress(address) {
	// geocode api 
	try {
		var params = new URLSearchParams({
			'address' : address,
			'key' : process.env.GOOGLE_MAPS_API_KEY
		})
		var response = await fetch(geocodeAPIEndpoint + '?' + params)
			.then(function(response) {
		    // The response is a Response instance.
		    // You parse the data into a useable format using `.json()`
		    return response.json();
		  })
		return response
		// var coords = response.results[0].geometry.location
		// return coords
	}
	catch(err) {
		console.log('error in google service:')
		console.log(err)
		throw err
	}
}

export async function getLocationByLatLng(lat, lng) {
	try {
		console.log('asking google for address')
		var params = new URLSearchParams({
			'latlng' : lat + ',' + lng,
			'location_type' : 'ROOFTOP',
			'result_type' : 'street_address',
			'key' : process.env.GOOGLE_MAPS_API_KEY
		})
		console.log('params:')
		console.log(params)
		var response = await fetch(geocodeAPIEndpoint + '?' + params)
			.then(function(response) {
		    // The response is a Response instance.
		    // You parse the data into a useable format using `.json()`
		    return response.json();
		  })
		return response
		// the topmost result is the most specific address for the given coordinates,
		// according to Google's API documentation

		// var address = response.reults[0].formatted_address
		// return address
	}
	catch(err) {
		console.log('error in google service:')
		console.log(err)
		throw err
	}
}

// departure time is represented as num seconds since 1/1/1970
export async function getTrip(origin, destination, departureTime, trafficModel='best_guess') {
	// console.log(trafficModel)
	try {
		var params = new URLSearchParams({
			'destination' : destination,
			'origin' : origin,
			'departure_time' : departureTime,
			'traffic_model' : trafficModel,
			'mode' : 'driving',
			'key' : process.env.GOOGLE_MAPS_API_KEY
		})
		params = new URLSearchParams(params)
		var response = await fetch(routesAPIEndpoint + '?' + params)
			.then(function(response) {
		    // The response is a Response instance.
		    // You parse the data into a useable format using `.json()`
		    return response.json();
		  })
		// console.log('generated trip')
		// console.log(response)
		return response
		
	}
	catch(err) {
		console.log('error in google service:')
		console.log(err)
		throw err
	}
}

export async function getTripDuration(origin, destination, departureTime, trafficModel='best_guess') {
	// console.log('getting trip from google')
	// console.log([origin, destination, departureTime, trafficModel])

	var response = await getTrip(origin, destination, departureTime, trafficModel).then(trip => {
		// console.log(trip)
		return trip
	})
	// console.log(response.routes[0].legs)
	return durationInMinutes(response.routes[0].legs[0].duration_in_traffic.value)
}

function durationInMinutes(numSeconds) {
	// console.log(numSeconds)
	return Math.ceil(numSeconds / 60)
}

export async function getCoordsfromAddress(address) {
	var response = await getLocationByAddress(address)
	return response.results[0].geometry.location
}

export async function getAddressFromCoords(lat, lng) {
	var response = await getLocationByLatLng(lat, lng)
	// console.log(response)
	return response.results[0].formatted_address
}




