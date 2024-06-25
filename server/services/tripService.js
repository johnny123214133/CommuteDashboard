import { locationService, routeService, googleMapsService } from './index.js'
import { tripRepository } from '../repositories/index.js'
import { toMilliseconds, toISOString, toMYSQLDateTime, fromMYSQLUTC } from '../utils/dateUtils.js'
import { SECOND_MILLISECONDS, FIFTEEN_MINUTES_MILLISECONDS } from '../utils/constants.js'

export async function getTripById(id) {
	// Cases:
	// trip is in the database: return trip
	// trip is not in the database: return 40x error
	try {
		// console.log('I\'m in the service layer!')
		return await tripRepository.getTripById(id).then((trip) => {
			trip.start_time = fromMYSQLUTC(trip.start_time)
			return trip
		})
	}
	catch (err) {
		throw err
	}
}

export async function getTripByRouteAndStartTime(routeId, startTime) {
	// Cases:
	// trip is in the database: return trip
	// trip is not in the database:
	// - create a new trip via googleMaps, save it, and return the new trip, 201 created
	// - if googleMaps cannot create a trip, throw an error
	try {
		// console.log('in getTripByRouteAndStartTime, params:')
		startTime = toMilliseconds(startTime)
		// console.log([routeId, startTime])
		startTime = roundToNextQuarterHour(startTime)
		var startTimeForDb = toMYSQLDateTime(startTime)
		// console.log('looking for datetime: ', startTime)
		return await tripRepository.getTripByRouteAndStartTime(routeId, startTimeForDb)
			.then((trip) => {
				if (Object.keys(trip).length == 0) {
					// console.log('trip DNE')
					// console.log('generating trip')
					return generateTrip(routeId, toMilliseconds(startTime)).then((newTrip) => {
						// console.log('persisting trip')
						// console.log(newTrip)
						return createTrip(newTrip).then(() => {
							// console.log('persisted trip')
							// // return {}
							// console.log('fetching trip')
							return tripRepository.getTripByRouteAndStartTime(routeId, startTimeForDb).then(trip => {
								// convert utc to local tz
								trip.start_time = fromMYSQLUTC(trip.start_time)
								return trip
							})
						})
					})
				}
				else {
					// console.log('found trip by route and start time')
					trip.start_time = fromMYSQLUTC(trip.start_time)
					return trip
				}
			})
		
	}
	catch (err) {
		throw err
	}
}

export async function getSomeTrips(routeId, startTime, numTrips = 10) {
	// Cases: 
	// get or create numTrips consecutive trips starting at startTime
	try {
		// console.log('in getSomeTrips, params:')
		// console.log([routeId, startTime, numTrips])
		startTime = toMilliseconds(startTime)
		startTime = roundToNextQuarterHour(startTime)
		// console.log(startTime)
		var startTimeForDb = toMYSQLDateTime(startTime)
		// console.log(toMilliseconds(formattedStartTime))

		var trips = []
		for (let i = 0; i < numTrips; i++) {
			var delta = i * FIFTEEN_MINUTES_MILLISECONDS
			trips.push(getTripByRouteAndStartTime(routeId, startTime + delta))
		}
		return await Promise.all(trips).then(trips => {
			return trips.sort((a, b) => a.start_time - b.start_time)
		})
	}
	catch (err) {
		throw err
	}
}

export async function createTrip(body) {
	// Cases: 
	// trip is in the database: return 200 ok
	// trip is not in the database:
	// - create a new trip, save it, and return 201 created
	// - if googleMaps cannot create a trip, throw an error
	try {
		// console.log('in createTrip, params:')
		// console.log(body)
		body.startTime = toMilliseconds(body.startTime)
		body.startTime = roundToNextQuarterHour(body.startTime)
		body.startTime = toMYSQLDateTime(body.startTime)
		if (Object.keys(await tripRepository.getTripByRouteAndStartTime(body.routeId, body.startTime)).length == 0) {
			await tripRepository.createTrip(body)
		}
	}
	catch (err) {
		throw err
	}
}

export function deleteTripById(id) {
	// Cases:
	// trip is in the database: return trip
	// trip is not in the database: return 40x error
	try {
		tripRepository.deleteTripById(id)
	}
	catch (err) {
		throw err
	}
}


function millisecondsToSeconds(milliseconds) {
	return Math.ceil(milliseconds / SECOND_MILLISECONDS)
}
function secondsToMilliseconds(seconds) {
	return seconds * SECOND_MILLISECONDS
}
function roundToNextQuarterHour(milliseconds) {
	return Math.ceil(milliseconds / FIFTEEN_MINUTES_MILLISECONDS) * FIFTEEN_MINUTES_MILLISECONDS
}

// generate a trip using services
async function generateTrip(routeId, startTime) {
	console.log('in generateTrip, params:')
	console.log([routeId, startTime])

	var startTimeInSeconds = millisecondsToSeconds(startTime)
	var departureTime = startTimeInSeconds
	return await routeService.getRouteById(routeId).then((route) => {
		var origin = locationService.getLocationById(route.origin_id).then(location => {
			return location.address
		})
		var destination = locationService.getLocationById(route.dest_id).then(location => {
			return location.address
		})
		return Promise.all([origin, destination]).then(([origin, destination]) => {
			var bestTrip = googleMapsService.getTripDuration(origin, destination, departureTime, 'optimistic')
			var avgTrip = googleMapsService.getTripDuration(origin, destination, departureTime)
			var worstTrip = googleMapsService.getTripDuration(origin, destination, departureTime, 'pessimistic')
			return Promise.all([bestTrip, avgTrip, worstTrip]).then(([bestTrip, avgTrip, worstTrip]) => {
				return {
					'routeId' : routeId,
					'startTime' : startTime,
					'bestDuration' : bestTrip,
					'avgDuration' : avgTrip,
					'worstDuration' : worstTrip
				}
			})
		})

	})
}




