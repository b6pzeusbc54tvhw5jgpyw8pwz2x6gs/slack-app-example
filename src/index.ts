import express from 'express'

import { router as routerCommand } from './api/command'
import { router as routerAction } from './api/action'

const port = process.env.PORT || 3000
const app = express()

// app.use(bodyParser.json())

app.use('/api/command', routerCommand)
app.use('/api/action', routerAction)
app.listen(port, () => console.log(`listening`))
