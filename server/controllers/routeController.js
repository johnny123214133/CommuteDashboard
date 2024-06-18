import{ validate }from 'jsonschema'

import { createRouteRequestSchema } from './schema/index.js'
import parseValidationErrors from '../utils/schemaValidation.js'

export async function getRouteRoot(req, res, next) {
	console.log('route root')
	res.send('route root')
}

export async function getRouteById(req, res, next) {
	try{
		var id = Number(req.params.id)

		// validate request
		// all erroneous inputs for id are implicitly caught by the isInteger check
		// or by requiring the result of the Number() function to be greater than 0
		if (!Number.isInteger(id) || id < 1) {
			throw ['id must be an integer greater than 0']
		}

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
		var {originId, destId} = req.params
		originId = Number(originId)
		destId = Number(destId)

		// validate request
		if (isNaN(originId)) throw ['originId must be a number']
		if (isNaN(destId)) throw ['destId must be a number']
		if (originId < 1) throw ['originId must be an integer greater than 0']
		if (destId < 1) throw ['destId must be an integer greater than 0']
		if (destId === originId) throw ['destId and originId cannot be equal']

		// process the request
		console.log('getting route by origin and destination IDs')
		res.send('got route by origin and destination IDs')
	}
	catch (err) {
		next({status: 400, error: 'Bad Request', messages: err})
	}
}

export async function createRoute(req, res, next) {
	try{
		var body = req.body
		var validationResult = validate(body, createRouteRequestSchema)

		// validate request
		if (!validationResult.valid) throw parseValidationErrors(validationResult.errors)
		
		// process the request
		console.log('creating route')
		console.log(body)
		res.send('created route')
	}
	catch (err) {
		next({status: 400, error: 'Bad Request', messages: err})
	}
}

export async function deleteRouteById(req, res, next) {
	try{
		var id = Number(req.params.id)

		// validate request
		// all erroneous inputs for id are implicitly caught by the isInteger check
		// or by requiring the result of the Number() function to be greater than 0
		if (!Number.isInteger(id) || id < 1) {
			throw ['id must be an integer greater than 0']
		}

		// process the request
		console.log('deleting route by id')
		res.send('deleted route by id')
	}
	catch (err) {
		next({status: 400, error: 'Bad Request', messages: err})
	}
}