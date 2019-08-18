import bodyParser from 'body-parser'
import express from 'express'

import { router as routerCommand } from './api/command'

const port = process.env.PORT || 3000
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api', routerCommand)
app.listen(port, () => console.log(`listening`))
