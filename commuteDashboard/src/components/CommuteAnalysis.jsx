// import {CommuteDurationsGraph, CommuteTable, ToggleBar} from './commuteAnalysis'
// import apis from '../../api'
import React, {useState, useEffect, createContext, useContext} from 'react'
// import {TripsContext} from '../App'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';

import ToggleBar from './ToggleBar.jsx'
import CommuteDurationsGraph from './CommuteDurationsGraph.jsx'
import CommuteTable from './CommuteTable.jsx'

// export const ActiveDateContext = React.createContext()
// export const DaysContext = React.createContext()

function CommuteAnalysis() {
	
	return (
		<>
		{/*<h1>Hello</h1>*/}
			<Stack className="mx-auto">
				<div className="p-1">
					<ToggleBar />
				</div>
				<div className="p-3">
					<CommuteDurationsGraph />
				</div>
				<div className="p-2">
					<CommuteTable />
				</div>
			</Stack>
		</>
	)
}

export default CommuteAnalysis