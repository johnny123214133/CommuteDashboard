import React, { useState, useEffect, createContext, useMemo } from 'react'
import { getRouteDetails, getTrips } from './functions.js'

// handle all the logic and state for collecting form input, 
// fetching location and route data from the dashboard's api,
// clean and provide response data for the rest of the app

export const RouteParamsContext = React.createContext()
export const RouteDataContext = React.createContext()
export const ShowMorningContext = React.createContext()
export const TripDataContext = React.createContext()
export const WeekdaysContext = React.createContext()
export const ActiveDayContext = React.createContext()
export const IsLoadingContext = React.createContext()

export default function CommuteDataContext({Children}) {
	const [params, setParams] = useState()
	const [routeData, setRouteData] = useState()
	const [tripData, setTripData] = useState()
	const [showMorning, setShowMorning] = useState(true)
	const [weekdays, setWeekdays] = useState()
	const [activeDay, setActiveDay] = useState()
	const [isLoading, setIsLoading] = useState(false)

	// TODO: error handling, is loading
	const resetData = () => {
		setParams()
		setRouteData()
		setTripData()
		setWeekdays()
		setActiveDay()
	}

	useEffect(() => {
		// prevent calls on initial mount, and when state gets rolled back from errors
		if (!params) return

		const fetchData = async () => {
			try {
				setIsLoading(true)
				// console.log('fetching route data with params:')
				// console.log(params)
				await getRouteDetails(params)
				.then(data => {
					// console.log(data)
					setRouteData(data)
					return data
				}).then(params => {
					// console.log('fetching trip data with params:')
					// console.log(params)
					return getTrips(params)
				}).then(trips => {
					console.log(trips)
					setTripData(trips)
					let days = Object.keys(trips.morning)
					days = days.map(day => parseInt(day))
					days.sort()
					setWeekdays(days)
					// console.log(typeof days[0])
					setActiveDay(days[0])
					setIsLoading(false)
				})
					// .catch(error => {
					// 	console.log('ERROR IN CONTEXT')
					// 	console.log(error)

					// })
				// })
				.catch(error => {
					console.log('ERROR IN CONTEXT')
					console.log(error)
					resetData()
					alert(error.response.data.messages.join('\n'))

				})
			}
			catch (error) {
				console.log('unexpected error occurred')
				console.log(error)
				alert(error)
				// reset params
				// Until I figure out how to group all my state updates 
				// in this useEffect into one atomic unit, I'll have to rely on clearing
				// the states myself and work around any side effects of doing so.
				// But because the data is all modeled in this component, 
				// it's not as bad as it could be
				resetData()
			}
			finally {
				setIsLoading(false)
			}
		}
		if (!isLoading) {
			fetchData()
		}
	  return () => { setIsLoading(false) }
	}, [params])

	useEffect(() => {
		if (!weekdays || !activeDay) return
		console.log('states set for commute analysis')
	}, [weekdays, activeDay])

	return (
		<>
			<IsLoadingContext.Provider value={[isLoading]}>
			<RouteParamsContext.Provider value={[setParams]}>
				<RouteDataContext.Provider value={[routeData]}>
				<ShowMorningContext.Provider value={[showMorning, setShowMorning]}>
				<TripDataContext.Provider value={[tripData]}>
				<WeekdaysContext.Provider value={[weekdays]}>
				<ActiveDayContext.Provider value={[activeDay, setActiveDay]}>
					<Children />
				</ActiveDayContext.Provider>
				</WeekdaysContext.Provider>
				</TripDataContext.Provider>
				</ShowMorningContext.Provider>
				</RouteDataContext.Provider >
			</RouteParamsContext.Provider>
			</IsLoadingContext.Provider>
		</>
	)
}
