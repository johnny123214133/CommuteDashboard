import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import {indexRouter, locationRouter} from './routes/index.js'
import ErrorResponse from './utils/errorResponse.js'

dotenv.config()

let apiPort = process.env.API_PORT

const app = express()
app.use(cors())
app.use(express.json())

// app.get('/', async(req, res) => {
// 	console.log('default response')
// 	res.send('api root')
// })

app.use('/', indexRouter)
app.use('/location', locationRouter)

// general error handler
app.use(function (err, req, res, next) {
  console.log('An Error Occurred: ', err.status)
  const error = new ErrorResponse(err.status, err.error, err.messages)
  console.log(error)
  res.status(err.status || 500).send(error);
})

app.listen(apiPort, () => {
	console.log('Server is runing on ' + apiPort + '.')
})