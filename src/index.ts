import express from 'express'

import { router as routerCommand } from './api/command'
import { router as routerAction } from './api/action'

const port = process.env.PORT || 3000
const app = express()

// app.use(bodyParser.json())

app.use('/slack/command', routerCommand)
app.use('/slack/action', routerAction)
app.listen(port, () => console.log(`listening`))
