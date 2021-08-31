import { NextApiRequest, NextApiResponse } from 'next'
import client from '../..//lib/Twitter'

interface Parameters {
  screen_name: string
  count: number
  max_id?: number
  trim_user: boolean
  exclude_replies: boolean
  include_rts: boolean
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  //   const doc = await firestore().collection('groups').doc(docId).get()
  var params: Parameters = {
    screen_name: '@BarackObama',
    count: 3,
    exclude_replies: true,
    trim_user: true,
    include_rts: false
  }
  const response = await client.get('statuses/user_timeline', params)
  console.log(response)

  res.status(200).json({
    response
  })
}
