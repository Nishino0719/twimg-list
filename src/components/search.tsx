import { Switch } from '@headlessui/react'
import React, { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'

type Props = {
  setUserName: Dispatch<SetStateAction<string>>
  userName: string
  includeRT: boolean
  setIncludeRT: Dispatch<SetStateAction<boolean>>
}

export const Search: React.FC<Props> = (props) => {
  return (
    <div className="">
      <div className="flex">
        <div className="relative text-gray-400 focus-within:text-gray-400">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <span
              className={`ml-2 ${
                props.userName.length !== 0 ? 'text-gray-900' : ''
              }`}
            >
              @
            </span>
          </span>
          <input
            type="search"
            className={`py-2 pl-8 text-sm bg-gray-200 border-blue-400 rounded-full w-72 xl:w-80 focus:border-blue-400 ${
              props.userName.length !== 0 ? 'text-gray-900' : ''
            } focus:bg-white focus:text-gray-900`}
            placeholder="ユーザー名"
            autoComplete="off"
            onChange={(e) => props.setUserName(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
