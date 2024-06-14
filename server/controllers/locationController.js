

export async function getLocationRoot(req, res) {
	console.log('location root')
	res.send('location root')
}

export async function getLocationByAddress(req, res) {
	var address = req.params.address
	console.log('getting location by address')
	res.send('got location by address')
}

export async function getLocationByLatLng(req, res) {
	var {lat, lng} = req.params
	console.log('getting location by lat lng')
	res.send('got location by lat lng')
}

// export async function getLocationById(req, res) {
// 	console.log('getting location by id')
// 	res.send('got location by id')
// }

export async function createLocation(req, res) {
	var body = req.body
	console.log('creating new location')
	res.send('created new location')
}

export async function deleteLocationById(req, res) {
	console.log('deleting location by id')
	res.send('deleted location')
}
