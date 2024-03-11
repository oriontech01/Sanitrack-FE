/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import useCleanerHook from 'Hooks/cleaner/useCleanerHook';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const CleanerSummary = () => {
  const { summary, getSummary } = useCleanerHook();
  const locationDetails = JSON.parse(localStorage.getItem('locationDeets'));
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  useEffect(() => {
    if (role !== 'Cleaner') {
      navigate(-1);
    }
  }, []);
  useEffect(() => {
    getSummary();
  }, []);
  console.log('sum', summary);
  const timers = summary?.taskDetails?.planned_time;
  const convertSecondsToHMS = totalSeconds => {
    const hours = Math.floor(totalSeconds / 3600);
    const remainingSecondsAfterHours = totalSeconds % 3600;
    const minutes = Math.floor(remainingSecondsAfterHours / 60);
    const remainingSeconds = remainingSecondsAfterHours % 60;

    return <p>{`${hours}: hrs ${minutes}: mins ${remainingSeconds}: s`}</p>;
  };
  return (
    <>
      <header className="flex lg:flex-row flex-col justify-between items-center">
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

          <h1 className="text-lg font-bold text-[#3366FF]">Summary</h1>
        </span>
      </header>
      <div className="flex flex-col gap-y-4 bg-[#FFF7F0] p-4 w-full lg:w-1/2 h-auto mt-5">
        <span className="bg-[#fff] p-2 rounded-full flex justify-center items-center w-10 h-10">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
            <path
              d="M10.0004 11.8079C8.22539 11.8079 6.77539 10.3662 6.77539 8.58288C6.77539 6.79954 8.22539 5.36621 10.0004 5.36621C11.7754 5.36621 13.2254 6.80788 13.2254 8.59121C13.2254 10.3745 11.7754 11.8079 10.0004 11.8079ZM10.0004 6.61621C8.91706 6.61621 8.02539 7.49954 8.02539 8.59121C8.02539 9.68288 8.90872 10.5662 10.0004 10.5662C11.0921 10.5662 11.9754 9.68288 11.9754 8.59121C11.9754 7.49954 11.0837 6.61621 10.0004 6.61621Z"
              fill="#AF6D31"
            />
            <path
              d="M10.0004 18.967C8.76706 18.967 7.52539 18.5003 6.55872 17.5753C4.10039 15.2087 1.38372 11.4337 2.40872 6.94199C3.33372 2.86699 6.89206 1.04199 10.0004 1.04199C10.0004 1.04199 10.0004 1.04199 10.0087 1.04199C13.1171 1.04199 16.6754 2.86699 17.6004 6.95033C18.6171 11.442 15.9004 15.2087 13.4421 17.5753C12.4754 18.5003 11.2337 18.967 10.0004 18.967ZM10.0004 2.29199C7.57539 2.29199 4.45872 3.58366 3.63372 7.21699C2.73372 11.142 5.20039 14.5253 7.43372 16.667C8.87539 18.0587 11.1337 18.0587 12.5754 16.667C14.8004 14.5253 17.2671 11.142 16.3837 7.21699C15.5504 3.58366 12.4254 2.29199 10.0004 2.29199Z"
              fill="#AF6D31"
            />
          </svg>
        </span>
        <p className="text-lg">Work Order Address</p>
        <p className="text-xl font-bold text-[#AF6D31]">{`${locationDetails?.city}-${locationDetails?.country}`}</p>
      </div>
      <div className="w-full lg:w-1/2 mt-5 fex flex-col space-y-3 ">
        <h1 className="text-lg font-bold text-black">Planned Time</h1>
        <div className="flex flex-row justify-between items-center text-blue-500 font-semibold">
          <p>Clean Time</p>
          <span>{convertSecondsToHMS(timers?.clean_time)}</span>
        </div>
        <div className="flex flex-row justify-between items-center text-blue-500 font-semibold">
          <p>Preop Time</p>
          <span>{convertSecondsToHMS(timers?.preOp_time)}</span>
        </div>
        <div className="flex flex-row justify-between items-center text-blue-500 font-semibold">
          <p>Release Time</p>
          <span>{convertSecondsToHMS(timers?.release_time)}</span>
        </div>
      </div>
      <main className="flex lg:flex-row flex-col items-start w-full lg:mt-10 mt-5 gap-x-8 gap-y-4">
        <div className=" w-full lg:w-1/2">
          <details>
            <summary
              className="question  cursor-pointer select-none w-full outline-none text-lg font-medium
            "
            >
              Items to Clean
            </summary>
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 mt-5">
              {summary?.taskDetails?.tasks?.map(item => (
                <div className="pb-2 border-b border-gray-500 w-full" key={item?._id}>
                  <p className="text-blue-500 font-medium text-sm">{item?.name}</p>
                </div>
              ))}
            </div>
          </details>
        </div>
        <div className=" w-full lg:w-1/2">
          <details>
            <summary className="question  cursor-pointer select-none w-full text-lg font-medium">Cleaning Items</summary>
         
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 mt-5">
            {summary?.cleaningItems?.cleaning_items?.map(item => (
              <div className="pb-2 border-b border-gray-500 w-full flex items-center justify-between" key={item?._id}>
                <p className="text-blue-500 font-medium text-sm">{item?.item_name}</p>
                <p className="text-black font-medium text-sm">{`${item?.quantity} ${item?.unit}`}</p>
              </div>
            ))}
          </div>
          </details>
        </div>
      </main>
      <Link
          to={`/dashboard/cleaner/cleaner-timer/${summary?.cleaningItems?.task_id}`}
          onClick={()=>localStorage.setItem("actualTimer",timers?.clean_time)}
          className="text-white flex justify-center  mb-4 gap-x-2 items-center px-4 py-2 bg-blue-700 w-full lg:w-1/2 lg:h-[40px] text-base border-t-2 mt-10 "
          // disabled={id && inspector && clean_hours}
        >
          Start Timer
        </Link>
    </>
  );
};

export default CleanerSummary;
