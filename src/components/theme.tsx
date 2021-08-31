import { Switch } from '@headlessui/react'
import React, { Dispatch, SetStateAction, useContext } from 'react'

type Props = {
  lightMode: boolean
  setLightMode: Dispatch<SetStateAction<boolean>>
}

export const Theme: React.FC<Props> = (props) => {
  return (
    <div className="absolute top-5 right-5 dark:bg-darkblue">
      <Switch
        checked={props.lightMode}
        onChange={props.setLightMode}
        className={`bg-gray-200 relative inline-flex flex-shrink-0 border-white 
    h-10 w-16 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span
          aria-hidden="true"
          className={`${props.lightMode ? 'translate-x-7  ' : 'translate-x-1'}
      pointer-events-none bg-white inline-block h-7 w-7 mt-1  rounded-full   shadow-lg transform ring-0 transition ease-in-out duration-200`}
        >
          {props.lightMode ? (
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
  )
}
