import { Router } from 'express'

export const router = Router()

router.all('/command', async (req, res) => {
  console.log(req.body)
  res.status(200).send('Thanks.')
})

