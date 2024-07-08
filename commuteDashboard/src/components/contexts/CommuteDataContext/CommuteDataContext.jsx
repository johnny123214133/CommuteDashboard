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

export default function CommuteDataContext({Children}) {
	const [params, setParams] = useState()
	const [routeData, setRouteData] = useState()
	const [tripData, setTripData] = useState()
	const [showMorning, setShowMorning] = useState(true)
	const [weekdays, setWeekdays] = useState()
	const [activeDay, setActiveDay] = useState()

	// TODO: error handling, is loading

	useEffect(() => {
		if (!params) return

		const fetchData = async () => {
			console.log('fetching route data with params:')
			console.log(params)
			await getRouteDetails(params)
			.then(data => {
				setRouteData(data)
				return data
			}).then(params => {
				console.log('fetching trip data with params:')
				getTrips(params).then(trips => {
					console.log(trips)
					setTripData(trips)
					let days = Object.keys(trips.morning)
					days = days.map(day => parseInt(day))
					days.sort()
					setWeekdays(days)
					console.log(typeof days[0])
					setActiveDay(days[0])
				})
			})
		}
		let active = true
	  fetchData()
	  return () => { active = false }
	}, [params])

	useEffect(() => {
		if (!weekdays || !activeDay) return
		console.log('states set for commute analysis')
	}, [weekdays, activeDay])

	return (
		<>
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
		</>
	)
}
