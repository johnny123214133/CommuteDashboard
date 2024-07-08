import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack'

// import TripsContext from './contexts/TripsContext/TripsContext.jsx'
import NavBar from './NavBar/NavBar.jsx'
import CommuteAnalysis from './CommuteAnalysis.jsx'
import GoogleMap from './GoogleMap.jsx'

import './Dashboard.css'
import { useState, useContext } from 'react'

function Dashboard() {
	// const [origin, setOrigin] = useState('')

	// function handleOriginChange(event) {
	// 	setOrigin(event.target.value)
	// }
	
	// function handleSubmit(event) {
	// 	event.preventDefault()
	// 	console.log(origin)
	// }

	return (
		<>
				<NavBar />
				<Stack direction="horizontal" gap={2}>
					<div className="p-2"><GoogleMap /></div>
					<div className="p-2 " style={{width: "100%"}}><CommuteAnalysis /></div>
				</Stack>
		</>
	)
}

export default Dashboard