/* eslint-disable @next/next/no-img-element */
import React, { Fragment, useState } from 'react'
import { ResponseMedia } from '../model/Twitter'
import { Dialog, Transition } from '@headlessui/react'

type Props = {
  tweet: ResponseMedia
}

export const TweetImage: React.FC<Props> = (props) => {
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  return (
    <>
      <div className="my-6 w-80 break-inside ">
        <img
          src={props.tweet.src}
          alt=""
          onClick={openModal}
          className="duration-300 transform cursor-pointer sm:hover:scale-105"
        />
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto bg-gray-900 bg-opacity-70"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                ></Dialog.Title>
                <div className="mt-2 ">
                  <img
                    src={props.tweet.src}
                    className="w-auto mx-auto max-h-modalImage"
                    alt=""
                  />
                  <p className="my-2 text-xs sm:text-sm">
                    {props.tweet.description}
                  </p>
                </div>

                <div className="flex justify-center mt-4">
                  <button
                    type="button"
                    className="inline-flex px-4 py-2 text-sm font-medium text-white border border-transparent rounded-full bg-twitter focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 "
                    onClick={closeModal}
                  >
                    Twitterで見る
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
