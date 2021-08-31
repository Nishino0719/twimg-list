/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import { Switch } from '@headlessui/react'
import { useEffect } from 'react'
import client from '../lib/Twitter'
import axios from 'axios'

interface Tweet {
  url: string
}

const mock: Tweet[] = [
  { url: 'https://pbs.twimg.com/media/EroGSZtXAAc6vAy?format=jpg&name=medium' },
  { url: 'https://pbs.twimg.com/media/EqvWfC3W8AAM0FX?format=jpg&name=large' },
  { url: 'https://pbs.twimg.com/media/Eo4prXYXUA4sUJ1?format=jpg&name=large' },
  { url: 'https://pbs.twimg.com/media/E9jBaMJVIAIEjbZ?format=jpg&name=large' },
  {
    url: 'https://pbs.twimg.com/media/E9zRh4rVUAsJHtT?format=jpg&name=4096x4096'
  },
  { url: 'https://pbs.twimg.com/media/E9-W8PoVQAoglxP?format=jpg&name=large' },
  { url: 'https://pbs.twimg.com/media/E9j6LemWQAoJN2h?format=jpg&name=medium' },
  { url: 'https://pbs.twimg.com/media/E924XqdVQAMnJ7h?format=jpg&name=large' },
  {
    url: 'https://pbs.twimg.com/media/E9yZAO7VkAMsE5b?format=jpg&name=4096x4096'
  },
  { url: 'https://pbs.twimg.com/media/E9plvx2VgAoKxFc?format=jpg&name=medium' },
  { url: 'https://pbs.twimg.com/media/E99HistVkAYSUqS?format=jpg&name=large' },
  { url: 'https://pbs.twimg.com/media/E9zYvPWUUA8o_Zn?format=jpg&name=large' }
]

export default function Home() {
  const [lightMode, setLightMode] = useState(true)

  var params = {
    screen_name: '@flomorrissey',
    count: 200,
    exclude_replies: false,
    trim_user: true,
    include_rts: false
  }
  useEffect(() => {
    const f = async () => {
      await axios
        .post('/api/hello')
        .then((response) => {
          console.log(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
    f()
  }, [])

  return (
    <div className={` ${lightMode ? '' : 'dark'} bg-white`}>
      <div className="min-h-screen dark:bg-darkblue">
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
        <div className="p-10">
          {/* <p className="text-twitter">hello world</p> */}
          <div className="flex justify-center lg:mt-10 md:mt-5 ">
            <div className="box-border mx-auto md:masonry-2-col lg:masonry-3-col xl:masonry-4-col before:box-inherit after:box-inherit">
              {mock.map((tweet) => {
                return (
                  <div
                    key={tweet.url}
                    className="my-6 duration-300 transform cursor-pointer w-80 break-inside hover:scale-105"
                  >
                    <img src={tweet.url} alt="" />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
