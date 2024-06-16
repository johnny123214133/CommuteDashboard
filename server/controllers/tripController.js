import{ validate }from 'jsonschema'

import { createTripRequestSchema } from './schema/index.js'
import parseValidationErrors from '../utils/schemaValidation.js'

export async function getTripRoot(req, res, next) {
	console.log('trip root')
	res.send('trip root')
}

export async function getTripById(req, res, next) {
	try{
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
		// process the request
		console.log('deleting trip by id')
		res.send('deleted trip by id')
	}
	catch (err) {
		next({status: 400, error: 'Bad Request', messages: err})
	}
}