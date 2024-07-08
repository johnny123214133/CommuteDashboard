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

	function handleSubmit(event) {
		event.preventDefault()
		console.log(input)
		// TODO: handle submit.
		// validate submission
		setParams(input)
	}

	return (
		<>
			<Stack className="sticky-top pt-4 px-2 bg-white" direction="vertical">
			{/*<Form className="" onSubmit={handleSubmit}>*/}
				{/*<Row>*/}
				<Row>
					<Col md={6}>
						<Form.Group as={Row} className="mb-1 px-2" controlId="originInput">
							<Form.Label column sm={4} md={3}>Origin Address</Form.Label>
							<Col sm={8} md={9}>
								<Form.Control type="text" onChange={handleOriginChange} placeholder="1234 Main St. Anytown, US" />
							</Col>
							{/*<Form.Text className="text-muted"></Form.Text>*/}
						</Form.Group>
					</Col>
					<Col md={3}>
						<Form.Group as={Row} className="mb-1 px-2" controlId="morningStartTimeInput">
							<Col sm={8} md={7}>
								<Form.Label column >Morning Start Time</Form.Label>
							</Col>
							<Col sm={4} md={5}>
								<Form.Control type="time" onChange={handleMorningTimeChange} />
							</Col>
							{/*<TimePicker onChange={onMorningTimeChange} value={input.morningStartTime} />*/}
						</Form.Group>
					</Col>
					<Col md={3}>
						<Form.Group as={Row} className="mb-1 px-2" controlId="startDateInput">
							<Col sm={6} md={6}>
								<Form.Label column >Start Date</Form.Label>
							</Col>
							<Col sm={6} md={6}>
								<Form.Control type="date" onChange={handleDateChange} />
							</Col>
							{/*<DatePicker 
								selected={input.startDate} 
								onChange={handleChangeDate} 
								minDate={new Date(new Date().setHours(0, 0, 0, 0))} 
							/>*/}
						</Form.Group>
					</Col>
				</Row>
				<Row className="my-2">
				{/*<Stack direction="horizontal">*/}
					<Col md={6}>
						<Form.Group as={Row} className="mb-1 px-2" controlId="destinationInput">
							<Col sm={4} md={3}>
								<Form.Label column >Destination Address</Form.Label>
							</Col>
							<Col sm={8} md={9}>
								<Form.Control type="text" onChange={handleDestinationChange} placeholder="5678 Center St. Anytown, US" />
							</Col>
							{/*<Form.Text className="text-muted"></Form.Text>*/}
						</Form.Group>
					</Col>
					<Col md={3}>
						<Form.Group as={Row} className="mb-1 px-2" controlId="eveningStartTimeInput">
							<Col sm={8} md={7}>
								<Form.Label column >Evening Start Time</Form.Label>
							</Col>
							<Col sm={4} md={5}>
								<Form.Control type="time" onChange={handleEveningTimeChange} />
							</Col>
							{/*<TimePicker onChange={onEveningTimeChange} value={input.eveningStartTime} />*/}
						</Form.Group>
					</Col>
					<Col md={3} className="px-2 align-middle">
						{/*<br />*/}
						<Stack direction="horizontal" className="mb-1 px-2">
							<Form.Switch className="" 
								id="morningToggle" 
								onChange={handleToggleMorningSwitch} 
								checked={showMorning} 
								label={showMorning ? "Show Morning" : "Show Evening"} 
							/>
							<Button className="ms-auto" variant="secondary" onClick={handleSubmit}> {/*type="submit"*/}
								Submit
							</Button>
						</Stack>
					</Col>
				</Row>
				{/*</Stack>*/}
			{/*</Form>*/}
			</Stack>
		</>
	)
}

export default NavBar