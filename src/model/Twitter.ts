interface Parameters {
  screen_name: string
  count: number
  max_id?: number
  trim_user: boolean
  exclude_replies: boolean
  include_rts: boolean
}
interface Media {
  display_url: string
  id_str: string
  media_url_https: string
  url: string
  type: MediaType
}
type MediaType = 'photo' | 'video' | 'animated_gif'

interface User {
  description: string
  id_str: string
  default_profile_image: boolean
  location: string
  name: string
  profile_image_url_https: string
}
interface ExtendedEntities {
  media: Media[]
}

interface UserTimeline {
  created_at: string
  extended_entities?: ExtendedEntities
  text: string
  user: User
}

interface ResponseMedia {
  type: MediaType
  tweet_url: string
  src: string
  description: string
}

export type {
  Parameters,
  Media,
  User,
  ExtendedEntities,
  UserTimeline,
  ResponseMedia,
  MediaType
}
