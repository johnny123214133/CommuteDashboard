import axios from 'axios'
// import dotenv from 'dotenv'
// dotenv.config()

const api = axios.create({
	// baseURL : 'http://localhost:8081',
	baseURL : import.meta.env.VITE_COMMUTE_API_URL
})

export const getLocationByAddress = (address) => {
	// try {
		return api.get(`/location/address/${address}`)
		.catch(error => {
			console.log(error)
			throw error
		})
	// } catch (err) {
	// 	throw err
	// }
}
export const getRouteByEndpointIds = (originId, destId) => {
	// try {
		return api.get(`/route/${originId}/${destId}`)
		.catch(error => {
			console.log(error)
			throw error
		})
	// } catch (err) {
	// 	throw err
	// }
}
export const getTripsByRouteIdAndStartTime = (routeId, startTime, numTrips) => {
	// try {
		return api.get(`trip/${routeId}/${startTime}/${numTrips}`)
		.catch(error => {
			console.log(error)
			throw error
		})
	// } catch (err) {
	// 	// console.log(err)
	// 	throw err
	// }
}

const commuteApi = {
	getLocationByAddress,
	getRouteByEndpointIds,
	getTripsByRouteIdAndStartTime,
}

export default commuteApi