/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { Switch } from '@headlessui/react'
import axios from 'axios'
import { useRouter } from 'next/dist/client/router'
import React, { useContext, useEffect, useState } from 'react'
import { Search } from '../components/search'
import { Theme } from '../components/theme'
import { lightModeContext } from '../context/theme'
import { ResponseMedia, User } from '../model/Twitter'

type Query = {
  userName: string
}

interface Response {
  user: User
  mediaTimelines: ResponseMedia[]
}

export default function Index() {
  const router = useRouter()
  const query = router.query as Query
  const [userName, setUserName] = useState('')
  const { lightMode, setLightMode } = useContext(lightModeContext)
  const [tweets, setTweets] = useState<ResponseMedia[]>([])
  const [user, setUser] = useState<User>()
  const [includeRT, setIncludeRT] = useState(false)
  const [error, setError] = useState(false)
  const [userImage, setUserImage] = useState('')

  useEffect(() => {
    if (query.userName === undefined) {
      return
    }
    const userName = query.userName.replace('@', '')
    setUserName(userName)
    const f = async () => {
      await axios
        .post('/api/getMedia', { userName })
        .then((response) => {
          const data = response.data as Response
          setUser(data.user)
          setTweets(data.mediaTimelines)
          var extension = data.user.profile_image_url_https.slice(-3)
          var s = data.user.profile_image_url_https.slice(0, -10)
          s += '200x200.' + extension
          setUserImage(s)
        })
        .catch((error) => {
          console.log(error)
          setError(true)
        })
    }
    f()
  }, [query.userName])
  return (
    <div className={` ${lightMode ? '' : 'dark'} bg-white`}>
      <div className="relative min-h-screen dark:bg-darkblue">
        <div className="absolute top-5 left-5">
          <Search
            setUserName={setUserName}
            userName={userName}
            includeRT={includeRT}
            setIncludeRT={setIncludeRT}
          />
        </div>
        <Theme lightMode={lightMode} setLightMode={setLightMode} />
        {error ? (
          <div className="py-20 dark:text-white">
            <div className="border-b">
              <div className="text-left ">
                <h3 className="text-lg font-bold text-center">@{userName}</h3>
              </div>
            </div>
            <div className="text-center">
              <h3 className="mt-10 text-xl font-bold">
                このアカウントは存在しない、または鍵のついたアカウントです。
              </h3>
              <p className="mt-2 font-normal text-gray-500">
                キーワードを変えて検索してみてください。
              </p>
            </div>
          </div>
        ) : (
          <div className="py-16">
            <div className="py-5 border-b dark:text-white">
              <div className="flex justify-center mx-10">
                <img
                  src={userImage}
                  className="w-16 h-16 rounded-full md:w-32 md:h-32 "
                  alt={user?.name}
                />
                <div className="ml-4 ">
                  <a
                    href={`https://twitter.com/${userName}`}
                    target="_blank"
                    className="text-lg font-bold cursor-pointer hover:underline"
                    rel="noreferrer"
                  >
                    {user?.name}
                  </a>
                  <h3 className="text-base font-normal text-gray-500">
                    @{userName}
                  </h3>
                  <p>{user?.description}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center lg:mt-10 md:mt-5 ">
              <div className="box-border mx-auto md:masonry-2-col lg:masonry-3-col xl:masonry-4-col before:box-inherit after:box-inherit">
                {tweets
                  .filter(
                    (tweet) =>
                      tweet.type === 'photo' || tweet.type === 'animated_gif'
                  )
                  .map((tweet: ResponseMedia) => {
                    return (
                      <div key={tweet.src} className="my-6 w-80 break-inside ">
                        <img
                          src={tweet.src}
                          alt=""
                          className="duration-300 transform cursor-pointer hover:scale-105"
                        />
                      </div>
                    )
                  })}
              </div>
            </div>
            <div className="flex justify-center mt-10 mb-20 ">
              <button
                className="absolute w-auto px-4 py-2 font-semibold text-white disabled:cursor-not-allowed disabled:bg-opacity-50 bg-twitter text-md rounded-3xl"
                disabled={userName.length === 0}
              >
                もっと見る
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
