import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import {indexRouter, locationRouter} from './routes/index.js'

dotenv.config()

let apiPort = process.env.API_PORT

const app = express()
app.use(cors())

// app.get('/', async(req, res) => {
// 	console.log('default response')
// 	res.send('api root')
// })

app.use('/', indexRouter)
app.use('/location', locationRouter)

app.listen(apiPort, () => {
	console.log('Server is runing on ' + apiPort + '.')
})