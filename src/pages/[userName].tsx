/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { Switch } from '@headlessui/react'
import axios from 'axios'
import { useRouter } from 'next/dist/client/router'
import React, { useContext, useEffect, useState } from 'react'
import { Search } from '../components/search'
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

  useEffect(() => {
    if (query.userName === undefined) {
      return
    }
    setUserName(query.userName)
    const f = async () => {
      await axios
        .post('/api/getMedia', { userName: query.userName })
        .then((response) => {
          const data = response.data as Response
          setUser(data.user)
          setTweets(data.mediaTimelines)
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
      <div className="min-h-screen dark:bg-darkblue">
        <div className="absolute top-5 left-5">
          <Search
            setUserName={setUserName}
            userName={userName}
            includeRT={includeRT}
            setIncludeRT={setIncludeRT}
          />
        </div>
        <div className="absolute top-5 right-5 dark:bg-darkblue">
          <Switch
            checked={lightMode}
            onChange={setLightMode}
            className={`bg-gray-200 relative inline-flex flex-shrink-0 border-white 
          h-10 w-16 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            <span
              aria-hidden="true"
              className={`${lightMode ? 'translate-x-7  ' : 'translate-x-1'}
            pointer-events-none bg-white inline-block h-7 w-7 mt-1  rounded-full   shadow-lg transform ring-0 transition ease-in-out duration-200`}
            >
              {lightMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`m-1  text-darkblue stroke-current w-5 h-5`}
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 m-1 fill-current text-darkblue"
                  viewBox="0 0 20 20"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </span>
          </Switch>
        </div>
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
          <div className="py-20">
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
