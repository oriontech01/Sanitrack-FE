/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react';

const dummyUserData = [
  {
    name: 'John Doe',
    email: 'johndoe@example.com',
    key: 1,
    address: '123 Main Street, New York, NY 10001',
    profilePicture: 'https://example.com/john_doe_profile.jpg'
  },
  {
    name: 'Jane Doe',
    email: 'janedoe@example.com',
    key: 2,
    address: '456 Park Avenue, San Francisco, CA 94102',
    profilePicture: 'https://example.com/jane_doe_profile.jpg'
  },
  {
    name: 'Bob Smith',
    email: 'bobsmith@example.com',
    key: 3,
    address: '789 Elm Street, Chicago, IL 60601',
    profilePicture: 'https://example.com/bob_smith_profile.jpg'
  },
  {
    name: 'Will Smith',
    email: 'bobsmith@example.com',
    key: 4,
    address: '789 Elm Street, Chicago, IL 60601',
    profilePicture: 'https://example.com/bob_smith_profile.jpg'
  },
  {
    name: 'Jamie Smith',
    email: 'bobsmith@example.com',
    key: 5,
    address: '789 Elm Street, Chicago, IL 60601',
    profilePicture: 'https://example.com/bob_smith_profile.jpg'
  },
  {
    name: 'Willow Smith',
    email: 'bobsmith@example.com',
    key: 6,
    address: '789 Elm Street, Chicago, IL 60601',
    profilePicture: 'https://example.com/bob_smith_profile.jpg'
  },
  {
    name: 'Scott Smith',
    email: 'bobsmith@example.com',
    key: 7,
    address: '789 Elm Street, Chicago, IL 60601',
    profilePicture: 'https://example.com/bob_smith_profile.jpg'
  },
  {
    name: 'Alexa Smith',
    email: 'bobsmith@example.com',
    key: 8,
    address: '789 Elm Street, Chicago, IL 60601',
    profilePicture: 'https://example.com/bob_smith_profile.jpg'
  },
  {
    name: 'Michael Bay',
    email: 'bobsmith@example.com',
    key: 9,
    address: '789 Elm Street, Chicago, IL 60601',
    profilePicture: 'https://example.com/bob_smith_profile.jpg'
  },
  {
    name: 'Bob Smith',
    email: 'bobsmith@example.com',
    key: 10,
    address: '789 Elm Street, Chicago, IL 60601',
    profilePicture: 'https://example.com/bob_smith_profile.jpg'
  },
  {
    name: 'Bob Smith',
    email: 'bobsmith@example.com',
    key: 11,
    address: '789 Elm Street, Chicago, IL 60601',
    profilePicture: 'https://example.com/bob_smith_profile.jpg'
  },
  {
    name: 'BEren Yaegar',
    email: 'bobsmith@example.com',
    key: 12,
    address: '789 Elm Street, Chicago, IL 60601',
    profilePicture: 'https://example.com/bob_smith_profile.jpg'
  },
  {
    name: 'Mikasa Ackermman',
    email: 'bobsmith@example.com',
    key: 13,
    address: '789 Elm Street, Chicago, IL 60601',
    profilePicture: 'https://example.com/bob_smith_profile.jpg'
  },
  {
    name: 'Denj Smith',
    email: 'bobsmith@example.com',
    key: 14,
    address: '789 Elm Street, Chicago, IL 60601',
    profilePicture: 'https://example.com/bob_smith_profile.jpg'
  }
];

const UserList = ({ data, setChat }) => {
  return (
    <div className="bg-white h-[550px] shadow-lg border-r-2">
      {/* <div className="group relative w-full md:w-full lg:w-full">
        <input
          id="1"
          type="text"
          placeholder="Search.."
          className="peer h-10 w-full rounded-md border border-gray-400 bg-gray-100 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-gray-300 focus:ring-1 focus:ring-blue-400 placeholder:text-black  placeholder:text-lg"
        />
      </div> */}
      <div className="pt-10 pl-2">
        <header className="border-b border-gray-300 pb-3 ">
          <h1 className="text-center text-2xl font-semibold text-gray-600">Chats</h1>
        </header>
        <ul
          id="messages"
          className="flex flex-col space-y-4 py-3 overflow-y-auto h-[550px]   scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
        >
          {data.map(user => (
            <li
              key={user?.name}
              onClick={() => setChat(user)}
              className="py-3 sm:py-4 shadow-sm cursor-pointer px-2 hover:bg-gray-100"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-700 flex justify-center items-center rounded-full">
                  <p className="text-[#fff] text-lg">{user?.userName?.charAt(0)}</p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-lg font-semibold text-gray-900 truncate ">{user?.userName}</p>
                  <p className="text-sm font-semiboldf text-black truncate capitalize dark:text-gray-400">{user?.role}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserList;
