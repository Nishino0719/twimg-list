/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import { Search } from '../components/search'
import { useContext } from 'react'
import { lightModeContext } from '../context/theme'
import { useRouter } from 'next/dist/client/router'
import { Theme } from '../components/theme'

export default function Home() {
  const router = useRouter()

  const { lightMode, setLightMode } = useContext(lightModeContext)
  const [userName, setUserName] = useState('')
  const [includeRT, setIncludeRT] = useState(false)

  function search() {
    router.push(`/${userName}`)
  }

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
        <Theme lightMode={lightMode} setLightMode={setLightMode} />
        <div className="p-10">
          <div className="flex justify-center mt-10 mb-20 ">
            <button
              className="absolute w-auto px-4 py-2 font-semibold text-white disabled:cursor-not-allowed disabled:bg-opacity-50 bg-twitter text-md rounded-3xl"
              disabled={userName.length === 0}
              onClick={search}
            >
              {userName.length === 0
                ? 'ユーザー名を入力してください'
                : '@' + userName + ' の画像を検索する'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
