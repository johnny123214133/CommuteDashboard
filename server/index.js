import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

let apiPort = process.env.API_PORT

const app = express()
app.use(cors())

app.get('/', async(req, res) => {
	console.log('default response')
	res.send('api root')
})

app.listen(apiPort, () => {
	console.log('Server is runing on ' + apiPort + '.')
})