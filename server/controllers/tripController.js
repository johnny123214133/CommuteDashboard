import{ validate }from 'jsonschema'

import { createTripRequestSchema } from './schema/index.js'
import parseValidationErrors from '../utils/schemaValidation.js'

export async function getTripRoot(req, res, next) {
	console.log('trip root')
	res.send('trip root')
}

export async function getTripById(req, res, next) {
	try{
		var id = Number(req.params.id)

		// validate request
		// all erroneous inputs for id are implicitly caught by the isInteger check
		// or by requiring the result of the Number() function to be greater than 0
		if (!Number.isInteger(id) || id < 1) {
			throw ['id must be an integer greater than 0']
		}

		// process the request
		console.log('getting trip by id')
		res.send('got trip by id')
	}
	catch (err) {
		next({status: 400, error: 'Bad Request', messages: err})
	}
}

export async function getTripByRouteAndStartTime(req, res, next) {
	try{
		var {routeId, startTime} = req.params
		var now = new Date().getTime()
		routeId = Number(routeId)
		startTime = Number(startTime)

		// validate request
		if (!Number.isInteger(routeId) || routeId < 1) throw ['routeId must be an integer greater than 0']
		if (!Number.isInteger(startTime) || startTime < now) {
			throw ['startTime must be a future datetime in milliseconds, greater than now: ' + new Date().getTime()]
		}

		// process the request
		console.log('getting trip by route ID and start time')
		res.send('got trip by route ID and start time')
	}
	catch (err) {
		next({status: 400, error: 'Bad Request', messages: err})
	}
}

export async function createTrip(req, res, next) {
	try{
		var body = req.body
		var now = new Date().getTime()
		var validationResult = validate(body, createTripRequestSchema)

		// validate request
		if (!validationResult.valid) throw parseValidationErrors(validationResult.errors)
		console.log(typeof body.startTime)
		if (body.startTime < now) throw ['startTime must be a future datetime in milliseconds, greater than ' + now]
		
		// process the request
		console.log('creating trip')
		res.send('created trip')
	}
	catch (err) {
		next({status: 400, error: 'Bad Request', messages: err})
	}
}

export async function deleteTripById(req, res, next) {
	try{
		var id = Number(req.params.id)

		// validate request
		// all erroneous inputs for id are implicitly caught by the isInteger check
		// or by requiring the result of the Number() function to be greater than 0
		if (!Number.isInteger(id) || id < 1) {
			throw ['id must be an integer greater than 0']
		}

		// process the request
		console.log('deleting trip by id')
		res.send('deleted trip by id')
	}
	catch (err) {
		next({status: 400, error: 'Bad Request', messages: err})
	}
}