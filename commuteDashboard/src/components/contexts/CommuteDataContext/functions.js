import commuteApi from '../../../api/index.js'

export async function getRouteDetails(params) {
	try {
		console.log(Object.keys(params).length)
		// because useEffect is called twice when the component loads, 
		// I need to verify my params is still in its initial state
		if (Object.keys(params).length == 0) return {}
		var details = {}
		// console.log('in getRouteDetails function')
		
		return await Promise.all([
			commuteApi.getLocationByAddress(params.originAddress),
			commuteApi.getLocationByAddress(params.destinationAddress),
		]).then(([origin, dest]) => {
			details.origin = origin.data
			details.destination = dest.data
			return Promise.all([
				commuteApi.getRouteByEndpointIds(origin.data.id, dest.data.id),
				commuteApi.getRouteByEndpointIds(dest.data.id, origin.data.id)
			]).then(([morningRoute, eveningRoute]) => {
				details.morningRoute = morningRoute.data
				details.eveningRoute = eveningRoute.data
				details.morningTimeDelta = params.morningTimeDelta
				details.eveningTimeDelta = params.eveningTimeDelta
				details.startDate = params.startDate
				return details
			})
		})
	}
	catch (err) {
		throw err
	}
}

export async function getTrips(params) {
	try {
		// console.log(Object.keys(params).length)
		// because useEffect is called twice when the component loads, 
		// I need to verify my params is still in its initial state
		if (Object.keys(params).length == 0) return {}
		// if (params.route_id === undefined) return {}
		var trips = {
			morning : {},
			evening : {}
		}
		// console.log('in getRouteDetails function')
		
		// var startTime = new Date(params.start_time)
		var startTime = params.startDate
		for (let i = 0; i < 7; i++) {
			let morningStartTime = startTime + (params.morningTimeDelta[0] * 60 + params.morningTimeDelta[1]) * 60 * 1000
			let eveningStartTime = startTime + (params.eveningTimeDelta[0] * 60 + params.eveningTimeDelta[1]) * 60 * 1000
			trips.morning[startTime] = await commuteApi.getTripsByRouteIdAndStartTime(params.morningRoute.id, morningStartTime, 10).then(result => {
				return result.data
			}) // { id : params.morningRoute.id, startTime : new Date(morningStartTime), numTrips : 10 }
			trips.evening[startTime] = await commuteApi.getTripsByRouteIdAndStartTime(params.eveningRoute.id, eveningStartTime, 10).then(result => {
				return result.data
			}) // { id: params.eveningRoute.id, startTime : new Date(eveningStartTime), numTrips : 10 } 
			startTime += 24*60*60*1000
		}
		return await trips
	}
	catch (err) {
	
	}
}