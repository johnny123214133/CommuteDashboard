import{ validate }from 'jsonschema'

import { createRouteRequestSchema } from './schema/index.js'
import parseValidationErrors from '../utils/schemaValidation.js'

export async function getRouteRoot(req, res, next) {
	console.log('route root')
	res.send('route root')
}

export async function getRouteById(req, res, next) {
	try{
		// process the request
		console.log('getting route by id')
		res.send('got route by id')
	}
	catch (err) {
		next({status: 400, error: 'Bad Request', messages: err})
	}
}

export async function getRouteByOriginAndDestination(req, res, next) {
	try{
		// process the request
		console.log('getting route by origin and destination IDs')
		res.send('got route by origin and destination IDs')
	catch (err) {
		next({status: 400, error: 'Bad Request', messages: err})
	}
}

export async function createRoute(req, res, next) {
	try{
		// process the request
		console.log('creating route')
		res.send('created route')
	}
	catch (err) {
		next({status: 400, error: 'Bad Request', messages: err})
	}
}

export async function deleteRouteById(req, res, next) {
	try{
		// process the request
		console.log('deleting route by id')
		res.send('deleted route by id')
	}
	catch (err) {
		next({status: 400, error: 'Bad Request', messages: err})
	}
}