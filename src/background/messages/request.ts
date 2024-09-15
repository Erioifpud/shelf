import type { PlasmoMessaging } from '@plasmohq/messaging'
import axios from 'axios'

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const url = req.body.url as string
  const headerText = req.body.headers as string
  const isPost = req.body.isPost as boolean

  const headers = headerText.split("\n").reduce<Record<string, string>>((acc, cur) => {
    const [key, value] = cur.split(":")
    if (!key || !value) {
      return acc
    }
    acc[key] = value
    return acc
  }, {})

  const text = await axios(url, {
    method: isPost ? 'POST' : 'GET',
    headers,
  }).then(resp => {
    return resp.data as string
  })

  res.send({
    message: text
  })
}

export default handler
