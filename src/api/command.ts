import { WebClient } from '@slack/web-api'
import { Router } from 'express'
import to from 'await-to-js'
import bodyParser from 'body-parser'
import { IncomingMessage, ServerResponse } from 'http';

const web = new WebClient(process.env.SLACK_TOKEN)

export const router = Router()

type TypeVerify = (req: IncomingMessage, res: ServerResponse, buf: Buffer, encoding: string) => void
const verify: TypeVerify = (req, res, buf, encoding) => {
  console.log('verify')
  console.log(buf.toString())
}
router.use(bodyParser.urlencoded({ extended: true, verify }))

interface ISlashCommandRequest {
  token: string
  team_id: string
  team_domain: string
  channel_id: string
  channel_name: string
  user_id: string
  user_name: string
  command: string
  text: string
  response_url: string
  trigger_id: string
}

router.all('/', async (req, res) => {
  const body: ISlashCommandRequest  = req.body

  console.log('req.headers')
  console.log(req.headers)
  console.log('req.body')
  console.log(req.body)


  const [err,result] = await to(web.chat.postMessage({
    text: body.text,
    channel: body.channel_id,
    as_user: false,
    attachments: [
      {
        "text": "Choose a game to play",
        "fallback": "You are unable to choose a game",
        "callback_id": "wopr_game",
        "color": "#3AA3E3",
        "actions": [
          {
            "name": "game",
            "text": "Chess",
            "type": "button",
            "value": "chess"
          },
          {
            "name": "game",
            "text": "Falken's Maze",
            "type": "button",
            "value": "maze"
          },
          {
            "name": "game",
            "text": "Thermonuclear War",
            "style": "danger",
            "type": "button",
            "value": "war",
            "confirm": {
              "title": "Are you sure?",
              "text": "Wouldn't you prefer a good game of chess?",
              "ok_text": "Yes",
              "dismiss_text": "No"
            }
          }
        ]
      }
    ]
  }))
  if (err) {
    console.error(err)
    res.status(200).send('err.')
    return
  }

  console.log(JSON.stringify(result))
  res.status(200).send('Thanks.')
})

