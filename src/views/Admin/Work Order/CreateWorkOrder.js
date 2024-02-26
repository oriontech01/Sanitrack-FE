/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import { useNavigate } from 'react-router';

import AddTask from './AddTask';

const CreateWorkOrder = () => {
    const navigate = useNavigate();
  return (
    <>
      <header className="flex justify-between items-center lg:mb-10 mb-5">
        <span className="flex gap-x-2 items-center cursor-pointer" onClick={() => navigate(-1)}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M18.6667 9.33268L12 15.9993L18.6667 22.666"
              stroke="#3366FF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <h1 className="text-2xl font-bold text-[#3366FF]">Create Work Order</h1>
        </span>

    
      </header>
      <p className='pl-5 mb-10'>Kindly select a location before you proceed. Click on input twice to generate data</p>
      <AddTask/>
    </>
  )
}

export default CreateWorkOrder