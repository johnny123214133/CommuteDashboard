import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack'
// import DatePicker from "react-datepicker";
// import TimePicker from 'react-time-picker'

// import "react-datepicker/dist/react-datepicker.css";
// import 'react-time-picker/dist/TimePicker.css';
// import 'react-clock/dist/Clock.css';

import './NavBar.css'

import { useState, useContext } from 'react'
import { RouteParamsContext, ShowMorningContext } from '../contexts/CommuteDataContext/CommuteDataContext'


function NavBar() {
	const [setParams] = useContext(RouteParamsContext)
	const [showMorning, setShowMorning] = useContext(ShowMorningContext)

	const [input, setInput] = useState({
		originAddress : '',
		destinationAddress : '',
		startDate : new Date().setHours(0, 0, 0, 0),
		morningTimeDelta : [0, 0],
		eveningTimeDelta : [0, 0]
	})

	function handleOriginChange(event) {
		setInput({...input, originAddress : event.target.value})
	}
	function handleDestinationChange(event) {
		setInput({...input, destinationAddress : event.target.value})
	}

	function handleDateChange(event) {
		var dateString = event.target.value
		var parts = dateString.split('-')
		dateString = [parts[1], parts[2], parts[0]].join('-')
		// console.log(new Date(dateString))
		// console.log(new Date(dateString).getTime())

    setInput({...input, startDate : new Date(dateString).getTime()})
	}
	function handleMorningTimeChange(event) {
		var parts = event.target.value.split(':')
		parts = parts.map(item => {return Number(item)})
		setInput({...input, morningTimeDelta : parts})
	}
	function handleEveningTimeChange(event) {
		var parts = event.target.value.split(':')
		parts = parts.map(item => {return Number(item)})
		setInput({...input, eveningTimeDelta : parts})
	}
	function handleToggleMorningSwitch(event) {
		setShowMorning(!showMorning)
	}

	function validateInput() {
		if (typeof input.originAddress !== 'string' || input.originAddress.length < 1) throw 'Origin address must be a string of length greater than 0.'
		if (typeof input.destinationAddress !== 'string' || input.destinationAddress.length < 1) throw 'Destination address must be a string of length greater than 0.'
		if (input.startDate < new Date().setHours(0, 0, 0, 0)) throw 'Start date must be today or a future date.'
		if (input.startDate + (input.morningTimeDelta[0] * 60 + input.morningTimeDelta[1]) * 60 * 1000 < new Date().getTime()) throw 'Morning start date and time must be now or in the future.'
		if (input.startDate + (input.eveningTimeDelta[0] * 60 + input.eveningTimeDelta[1]) * 60 * 1000 < new Date().getTime()) throw 'Evening start date and time must be now or in the future.'
		if (input.morningTimeDelta[0] > input.eveningTimeDelta[0] || (input.morningTimeDelta[0] == input.eveningTimeDelta[0] && input.morningTimeDelta[1] > input.eveningTimeDelta[0])) throw 'Morning start time must not be later than evening start time.'
	}

	function handleSubmit(event) {
		try {
			event.preventDefault()
			console.log(input)
			// TODO: handle submit.
			// validate submission
			validateInput()
			setParams(input)
		} 
		catch (err) {
			alert(err)
		}
	}

	return (
		<>
			<Stack className="sticky-top pt-4 px-2 bg-white" direction="vertical">
				<Row>
					<Col md={6}>
						<Form.Group as={Row} className="mb-1" controlId="originInput">
							<Form.Label column sm={4} md={4}>Origin Address</Form.Label>
							<Col sm={8} md={8}>
								<Form.Control type="text" onChange={handleOriginChange} placeholder="1234 Main St. Anytown, US" />
							</Col>
						</Form.Group>
					</Col>
					<Col md={6}>
						<Row>
							<Col md={7}>
								<Form.Group as={Row} className="mb-1" controlId="morningStartTimeInput">
									<Col sm={8} md={7}>
										<Form.Label column >Morning Start Time</Form.Label>
									</Col>
									<Col sm={4} md={5}>
										<Form.Control type="time" onChange={handleMorningTimeChange} />
									</Col>
								</Form.Group>
							</Col>
							<Col md={5}>
								<Form.Group as={Row} className="mb-1" controlId="startDateInput">
									<Col sm={6} md={5}>
										<Form.Label column >Start Date</Form.Label>
									</Col>
									<Col sm={6} md={7}>
										<Form.Control type="date" onChange={handleDateChange} />
									</Col>
								</Form.Group>
							</Col>
						</Row>
					</Col>
				</Row>
				<Row className="my-2">
					<Col md={6}>
						<Form.Group as={Row} className="mb-1" controlId="destinationInput">
							<Col sm={4} md={4}>
								<Form.Label column >Destination Address</Form.Label>
							</Col>
							<Col sm={8} md={8}>
								<Form.Control type="text" onChange={handleDestinationChange} placeholder="5678 Center St. Anytown, US" />
							</Col>
						</Form.Group>
					</Col>
					<Col md={6}>
						<Row>
							<Col md={7}>
								<Form.Group as={Row} className="mb-1" controlId="eveningStartTimeInput">
									<Col sm={8} md={7}>
										<Form.Label column >Evening Start Time</Form.Label>
									</Col>
									<Col sm={4} md={5}>
										<Form.Control type="time" onChange={handleEveningTimeChange} />
									</Col>
								</Form.Group>
							</Col>
							<Col md={5} className="align-middle">
								<Stack direction="horizontal" className="mb-1">
									<Button className="ms-auto" variant="secondary" onClick={handleSubmit}>
										Submit
									</Button>
								</Stack>
							</Col>
						</Row>
					</Col>
				</Row>
			</Stack>
		</>
	)
}

export default NavBar