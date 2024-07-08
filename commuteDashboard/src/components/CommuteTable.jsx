import { useContext, useState, useEffect } from 'react'
import { TripDataContext, ActiveDayContext, ShowMorningContext } from './contexts/CommuteDataContext/CommuteDataContext.jsx'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Table from 'react-bootstrap/Table';

export default function CommuteTable() {
	const [tripData] = useContext(TripDataContext)
	const [activeDay, setActiveDay] = useContext(ActiveDayContext)
	const [showMorning, setShowMorning] = useContext(ShowMorningContext)

	const [activeDayData, setActiveDayData] = useState()
	const [arrivalEstimates, setArrivalEstimates] = useState()

	function addMinutes(date, minutes) {
    return parseTime(new Date(date.getTime() + minutes*60000));
	}
	function parseTime(timestamp) {
		return timestamp.toTimeString().substring(0,5)
	}

	useEffect(() => {
		if (!tripData || !activeDay || typeof showMorning === undefined) return
		
		let data = showMorning ? tripData.morning[activeDay] : tripData.evening[activeDay]
		// var newData = []
		let arrivals = {
			departureTimes : [],
			bestArrivalTimes : [],
			avgArrivalTimes : [],
			worstArrivalTimes : []
		}
		data.forEach(datum => {
			var timestamp = new Date(datum.start_time) 
			arrivals.departureTimes.push(parseTime(timestamp))
			arrivals.bestArrivalTimes.push(addMinutes(timestamp, datum.best_duration))
			arrivals.avgArrivalTimes.push(addMinutes(timestamp, datum.avg_duration))
			arrivals.worstArrivalTimes.push(addMinutes(timestamp, datum.worst_duration))
		})
		console.log(arrivals)
		setArrivalEstimates(arrivals)
		// console.log('ACTIVE DATE DATA')
		// console.log(activeDateData)
	}, [tripData, activeDay, showMorning])

	return (
		<>
			{tripData && activeDay && arrivalEstimates && 
			(<Table striped="columns" responsive style={{fontSize: 12}}>
				<tbody>
				<tr>
					<td><b>Departure Time</b></td>
					{/*<td>{arrivalEstimates.departureTimes.length}</td>*/}
					{arrivalEstimates.departureTimes.map(element => {
						return (
							<td style={{fontSize: 11}}><b>{element}</b></td>
						)
					})}
				</tr>
				<tr>
					<td>Best Case Arrival Time</td>
					{arrivalEstimates && arrivalEstimates.bestArrivalTimes.map(element => {
						return (
							<td>{element}</td>
						)
					})}
				</tr>
				<tr>
					<td>Avg. Case Arrival Time</td>
					{arrivalEstimates && arrivalEstimates.avgArrivalTimes.map(element => {
						return (
							<td>{element}</td>
						)
					})}
				</tr>
				<tr>
					<td>Worst Case Arrival Time</td>
					{arrivalEstimates && arrivalEstimates.worstArrivalTimes.map(element => {
						return (
							<td>{element}</td>
						)
					})}
				</tr>
				</tbody>
			</Table>)
		}
		</>
	)
}