import React, { useEffect, useState } from 'react';

import InputEmoji from 'react-input-emoji';
import { log } from 'util';

const chatData = [
  {
    message: 'Hello',
    chat_id: 1,
    user_id: 1,

    profilePicture: 'https://example.com/john_doe_profile.jpg'
  },
  {
    message: 'Hi, How are you ?',
    chat_id: 2,
    user_id: 2,

    profilePicture: 'https://example.com/jane_doe_profile.jpg'
  },
  {
    message: "I'm good, You?",
    chat_id: 3,
    user_id: 1,

    profilePicture: 'https://example.com/bob_smith_profile.jpg'
  },
  {
    message: "I'm okay, just checking on the patient",
    chat_id: 4,
    user_id: 2,

    profilePicture: 'https://example.com/bob_smith_profile.jpg'
  },
  {
    message: "He's in recovery and getting better",
    chat_id: 5,
    user_id: 1,

    profilePicture: 'https://example.com/bob_smith_profile.jpg'
  },
  {
    message: "That's great",
    chat_id: 6,
    user_id: 2,

    profilePicture: 'https://example.com/bob_smith_profile.jpg'
  },
  {
    message: 'Yes it is. Should I forward the medical report ?',
    chat_id: 7,
    user_id: 1,

    profilePicture: 'https://example.com/bob_smith_profile.jpg'
  },
  {
    message: 'Sure Dr.Senior Dev will get back to you',
    chat_id: 8,
    user_id: 2,

    profilePicture: 'https://example.com/bob_smith_profile.jpg'
  },
  {
    message: 'Okay',
    chat_id: 9,
    user_id: 1,

    profilePicture: 'https://example.com/bob_smith_profile.jpg'
  },
  {
    message: 'How is the family by the way',
    chat_id: 10,
    user_id: 2,

    profilePicture: 'https://example.com/bob_smith_profile.jpg'
  },
  {
    message: 'They are doing really fine.',
    chat_id: 11,
    user_id: 1,

    profilePicture: 'https://example.com/bob_smith_profile.jpg'
  },
  {
    message: "How's yours",
    chat_id: 12,
    user_id: 2,

    profilePicture: 'https://example.com/bob_smith_profile.jpg'
  },
  {
    message: 'They are good?',
    chat_id: 13,
    user_id: 1,

    profilePicture: 'https://example.com/bob_smith_profile.jpg'
  },
  {
    message: 'So submit the resonse from the doctor to me',
    chat_id: 14,
    user_id: 2,

    profilePicture: 'https://example.com/bob_smith_profile.jpg'
  },
  {
    message: 'I will, have a good day',
    chat_id: 15,
    user_id: 1,

    profilePicture: 'https://example.com/bob_smith_profile.jpg'
  },
  {
    message: 'Thank you',
    chat_id: 16,
    user_id: 2,

    profilePicture: 'https://example.com/bob_smith_profile.jpg'
  }
];
const Chat = ({ chats }) => {
  console.log('====================================');
  console.log(chats);
  console.log('====================================');
  const [text, setText] = useState('');

  function handleOnEnter(text) {
    console.log('enter', text);
  }
  useEffect(() => {
    console.log('yellll');
    chats?.chat?.sentMessages?.map(message => console.log('key', message));
  }, [chats]);

  return (
    <div>
      <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-[550px]">
        <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
          <div className="relative flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-700 flex justify-center items-center rounded-full">
              <p className="text-[#fff] text-lg">{chats?.userName?.charAt(0)}</p>
            </div>
            <div className="flex flex-col leading-tight">
              <div className="text-2xl mt-1 flex ">
                <span className="text-gray-700 mr-3">{chats?.userName}</span>
              </div>
              <span className="text-lg text-gray-400 capitalize">-{chats?.role}</span>
            </div>
          </div>
        </div>
        <div
          id="messages"
          className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
        >
          <>
            {chats?.chat?.sentMessages?.map(sent => (
              <div key={sent} className="chat-message">
                {chats?.chat?.sentMessages && (
                  <div className="flex items-end">
                    <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                      <div>
                        <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">{sent}</span>
                      </div>
                    </div>
                    <div className="w-7 h-7 bg-gray-300 flex justify-center items-center rounded-full">
                      <p className="text-[#fff] text-lg">{chats?.userName?.charAt(0)}</p>
                    </div>
                  </div>
                )}{' '}
              </div>
            ))}
            {chats?.chat?.receivedMessages?.map(
              received =>
                chats?.chat?.receivedMessages && (
                  <div key={received} className="flex items-end justify-end">
                    <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                      <div>
                        <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">{received}</span>
                      </div>
                    </div>
                    <div className="w-7 h-7 bg-blue-700 flex justify-center items-center rounded-full">
                      <p className="text-[#fff] text-lg">{chats?.userName?.charAt(0)}</p>
                    </div>
                  </div>
                )
            )}
          </>

          {/* <div className="chat-message"></div>
          <div className="chat-message">
            <div className="flex items-end">
              <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                <div>
                  <span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">
                    How are you
                  </span>
                </div>
                <div>
                  <span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">
                    blah blue
                  </span>
                </div>
                <div>
                  <span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">
                    ryryfhfhf
                  </span>
                </div>
                <div>
                  <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Nisi, voluptatibus?
                  </span>
                </div>
              </div>
              <img
                src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                alt="My profile"
                className="w-6 h-6 rounded-full order-1"
              />
            </div>
          </div>
          <div className="chat-message">
            <div className="flex items-end justify-end">
              <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                <div>
                  <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
                    Lorem ipsum dolor sit amet.
                  </span>
                </div>
              </div>
              <img
                src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                alt="My profile"
                className="w-6 h-6 rounded-full order-2"
              />
            </div>
          </div>
          <div className="chat-message">
            <div className="flex items-end">
              <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                <div>
                  <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                    hola hola
                  </span>
                </div>
              </div>
              <img
                src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                alt="My profile"
                className="w-6 h-6 rounded-full order-1"
              />
            </div>
          </div>
          <div className="chat-message">
            <div className="flex items-end justify-end">
              <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                <div>
                  <span className="px-4 py-2 rounded-lg inline-block bg-blue-600 text-white ">
                    lmao
                  </span>
                </div>
                <div>
                  <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white "></span>
                </div>
              </div>
              <img
                src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                alt="My profile"
                className="w-6 h-6 rounded-full order-2"
              />
            </div>
          </div>
          <div className="chat-message">
            <div className="flex items-end">
              <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                <div>
                  <span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">
                    fried rice
                  </span>
                </div>
                <div>
                  <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                    chicken
                  </span>
                </div>
              </div>
              <img
                src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                alt="My profile"
                className="w-6 h-6 rounded-full order-1"
              />
            </div>
          </div>
          <div className="chat-message">
            <div className="flex items-end justify-end">
              <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                <div>
                  <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
                    yes, I have a not
                  </span>
                </div>
              </div>
              <img
                src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                alt="My profile"
                className="w-6 h-6 rounded-full order-2"
              />
            </div>
          </div>
          <div className="chat-message">
            <div className="flex items-end">
              <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                <div>
                  <span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">
                    hola
                  </span>
                </div>
                <div>
                  <span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Beatae voluptatem perspiciatis cumque sapiente animi quae
                    dolorem modi? Laboriosam soluta placeat deleniti accusantium
                    eum ipsum itaque deserunt ab. Atque repellat officiis
                    provident, suscipit necessitatibus voluptatum voluptates
                    impedit corrupti ab minus enim facilis, maxime, magnam ipsam
                    quas sint illum rem omnis qui.
                  </span>
                </div>
                <div>
                  <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                    Goodbye
                  </span>
                </div>
              </div>
              <img
                src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                alt="My profile"
                className="w-6 h-6 rounded-full order-1"
              />
            </div>
          </div> */}
        </div>
        <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
          <div className="  gap-2 space-x-4 flex">
            <InputEmoji
              value={text}
              onChange={setText}
              cleanOnEnter
              onEnter={handleOnEnter}
              placeholder="Type a message"
              className="w-72"
            />
            <div className=" right-0 items-center inset-y-0 hidden sm:flex ">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-lg px-4 py-2 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
              >
                <span className="font-bold">Send</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-6 w-6 ml-2 transform rotate-90"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
