import { useContext } from 'react'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack'

import NavBar from './NavBar/NavBar.jsx'
import CommuteAnalysis from './CommuteAnalysis.jsx'
import GoogleMap from './GoogleMap.jsx'
import { IsLoadingContext } from './contexts/CommuteDataContext/CommuteDataContext'

import './Dashboard.css'

function Dashboard() {
	const [isLoading] = useContext(IsLoadingContext)

	return (
		<>
			{/*<div className="h-100">*/}
				<NavBar />
				{isLoading &&  (<h1>Loading...</h1>) }
				{!isLoading && (
					<Stack className="h-100" direction="horizontal" gap={2}>
						<div className="p-2"><GoogleMap /></div>
						<div className="p-2 " style={{width: "100%"}}><CommuteAnalysis /></div>
					</Stack>
				)}
			{/*</div>*/}
		</>
	)
}

export default Dashboard