import { WebClient, MessageAttachment } from '@slack/web-api'
import { Router } from 'express'
import to from 'await-to-js'
import bodyParser from 'body-parser'
import axios from 'axios'

const web = new WebClient(process.env.SLACK_TOKEN)

export const router = Router()

router.use(bodyParser.urlencoded({ extended: true }))

interface IInteractiveMessagePayload {
  type: 'interactive_message',
  actions: [{ name: string, type: 'button', value: string }]
  callback_id: string,
  team: { id: string, domain: string }
  channel: { id: string, name: string }
  user: { id: string, name: string }
  action_ts: string
  message_ts: string
  attachment_id: string
  token: string
  is_app_unfurl: boolean
  original_message: {
    type: string
    subtype: string
    text: string
    ts: string
    username: string
    bot_id: string
    attachments: MessageAttachment[]
  }
  response_url: string
  trigger_id: string
}

router.all('/', async (req, res) => {
  const payload: IInteractiveMessagePayload = JSON.parse(req.body.payload)
  console.log(payload)
  axios.post(payload.response_url, {
    ...payload.original_message,
    text: 'replacedddd'
  })

  res.status(200).send('got aaction Thanks.')
})

