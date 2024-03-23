import { useItemState } from 'context/ItemContext';
import React from 'react';
import { Link } from 'react-router-dom';

const SelectWorkOrderType = ({ closeModal }) => {
  //   const { inventory } = useItemState();
  const id = localStorage.getItem('locationId');
  return (
    <>
      <div className="flex flex-col gap-y-4 p-3">
        <header className="flex lg:flex-row flex-col justify-between items-center">
          <span className="flex gap-x-2 items-center cursor-pointer">
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
          </span>
        </header>
        <Link to={`/dashboard/work-order/select-inspector/${id}`} className="w-full bg-blue-200 rounded-lg h-auto p-2 flex gap-x-2 items-center">
        <svg  className="fill-[#3366FF] w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 148v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12zm140 12h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm-128 96h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm128 0h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm-76 84v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm76 12h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm180 124v36H0v-36c0-6.6 5.4-12 12-12h19.5V24c0-13.3 10.7-24 24-24h337c13.3 0 24 10.7 24 24v440H436c6.6 0 12 5.4 12 12zM79.5 463H192v-67c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v67h112.5V49L80 48l-.5 415z"/></svg>
      

          <p className="text-blue-500 font-bold">Facility Work Order</p>
        </Link>
        <Link to={`/dashboard/work-order/${id}`} className="w-full bg-blue-200 rounded-lg h-auto p-2 flex gap-x-2 items-center">
          <svg className="fill-[#3366FF] w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path d="M192 496c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V320h-64v176zm32-272h-50.9l-45.2-45.3C115.8 166.6 99.7 160 82.7 160H64c-17.1 0-33.2 6.7-45.3 18.8C6.7 190.9 0 207 0 224.1L.2 320 0 480c0 17.7 14.3 32 31.9 32 17.6 0 32-14.3 32-32l.1-100.7c.9 .5 1.6 1.3 2.5 1.7l29.1 43v56c0 17.7 14.3 32 32 32s32-14.3 32-32v-56.5c0-9.9-2.3-19.8-6.7-28.6l-41.2-61.3V253l20.9 20.9c9.1 9.1 21.1 14.1 33.9 14.1H224c17.7 0 32-14.3 32-32s-14.3-32-32-32zM64 128c26.5 0 48-21.5 48-48S90.5 32 64 32 16 53.5 16 80s21.5 48 48 48zm224-96l31.5 223.1-30.9 154.6c-4.3 21.6 13 38.3 31.4 38.3 15.2 0 28-9.1 32.3-30.4 .9 16.9 14.6 30.4 31.7 30.4 17.7 0 32-14.3 32-32 0 17.7 14.3 32 32 32s32-14.3 32-32V0H288v32zm-96 0v160h64V0h-32c-17.7 0-32 14.3-32 32zM544 0h-32v496c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V32c0-17.7-14.3-32-32-32z" />
          </svg>

          <p className="text-blue-500 font-bold">Room Work Order</p>
        </Link>
      </div>
    </>
  );
};

export default SelectWorkOrderType;
