import { useItemState } from 'context/ItemContext';
import React from 'react';
import { Link } from 'react-router-dom';

const SuccessModal = ({ closeModal }) => {
  //   const { inventory } = useItemState();
  const id = localStorage.getItem('locationId');
  return (
    <>
      <div className="flex flex-col gap-y-4 p-3">
        <header className="flex lg:flex-row flex-col justify-between items-center">
          {/* <span className="flex gap-x-2 items-center cursor-pointer">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18.6667 9.33268L12 15.9993L18.6667 22.666"
                stroke="#3366FF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <h1 className="text-lg font-bold text-[#3366FF]">Select Work Order Type</h1>
          </span> */}
        </header>
        <div className="flex flex-col justify-center items-center">
          <svg width="218" height="218" viewBox="0 0 218 218" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M109 199.833C134.083 199.833 156.791 189.666 173.229 173.229C189.666 156.791 199.833 134.083 199.833 109C199.833 83.9171 189.666 61.2088 173.229 44.771C156.791 28.3334 134.083 18.1665 109 18.1665C83.9171 18.1665 61.2088 28.3334 44.771 44.771C28.3334 61.2088 18.1665 83.9171 18.1665 109C18.1665 134.083 28.3334 156.791 44.771 173.229C61.2088 189.666 83.9171 199.833 109 199.833Z"
              fill="#8AC446"
              fillOpacity="0.2"
              stroke="#8AC446"
              strokeWidth="6.60606"
              strokeLinejoin="round"
            />
            <path
              d="M72.6665 109L99.9165 136.25L154.417 81.75"
              stroke="#8AC446"
              strokeWidth="6.60606"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h1 className="text-lg font-bold text-[#3366FF]">Work Order Created Successfully</h1>
          <p className="text-sm text-gray-300">Your work order has been submitted</p>
          <Link
            onClick={() => {
              localStorage.removeItem('selectedItems');
            }}
            to="/dashboard/work-schedule"
            className="w-full flex justify-center items-center bg-blue-500 mt-5 rounded-lg h-12 p-2 flex gap-x-2 items-center"
          >
            <p className="text-white font-bold">Finish</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SuccessModal;
