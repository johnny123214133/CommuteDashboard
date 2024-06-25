import { LAT_MIN, LAT_MAX, LNG_MIN, LNG_MAX } from '../../utils/constants.js'

export var createLocationRequestSchema = {
	"id" : "/CreateLocationRequest",
	"type" : "object",
	"properties" : {
		"address" : { "type" : "string" },
		"lat" : { "type" : "number", "minimum" : LAT_MIN, "maximum" : LAT_MAX },
		"lng" : { "type" : "number", "minimum" : LNG_MIN, "maximum" : LNG_MAX }
	},
	"required" : ["address", "lat", "lng"]
}

export var createRouteRequestSchema = {
	"id" : "/CreateRouteRequest",
	"type" : "object",
	"properties" : {
		"originId" : { "type" : "integer", "minimum" : 1 },
		"destId" : { "type" : "integer", "minimum" : 1 }
	},
	"required" : ["originId", "destId"]
}

export var createTripRequestSchema = {
	"id" : "/CreateTripRequest",
	"type" : "object",
	"properties" : {
		"routeId" : { "type" : "integer", "minimum" : 1 },
		"startTime" : { "type" : "integer"},
		"bestDuration" : { "type" : "integer", "minimum" : 0 },
		"avgDuration" : { "type" : "integer", "minimum" : 0 },
		"worstDuration" : { "type" : "integer", "minimum" : 0 },
	},
	"required" : ["routeId", "startTime", "bestDuration", "avgDuration", "worstDuration"]
}