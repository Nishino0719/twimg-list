import { NextApiRequest, NextApiResponse } from 'next'
import client from '../../lib/Twitter'
import { Parameters, ResponseMedia, UserTimeline } from '../../model/Twitter'

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const reqs = req.body.userName as string
  const userName = reqs.replace('@', '')

  var params: Parameters = {
    screen_name: '@' + userName,
    count: 100,
    exclude_replies: true,
    trim_user: false,
    include_rts: true
  }
  const timelines = (await client.get(
    'statuses/user_timeline',
    params
  )) as UserTimeline[]
  const mediaTimelines: ResponseMedia[] = []
  timelines.forEach((timeline: UserTimeline) => {
    if (timeline.extended_entities) {
      for (let i = 0; i < timeline.extended_entities.media.length; i++) {
        mediaTimelines.push({
          type: timeline.extended_entities.media[i].type,
          tweet_url: timeline.extended_entities.media[i].display_url,
          src: timeline.extended_entities.media[i].media_url_https,
          description: timeline.text
        })
      }
    }
  })

  res.status(200).json({
    user: timelines[0].user,
    mediaTimelines
  })
}
