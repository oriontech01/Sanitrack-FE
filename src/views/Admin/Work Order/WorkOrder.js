/* eslint-disable jsx-a11y/heading-has-content */
import React, { useContext, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa6';
import useLocation from '../../../Hooks/useLocation';
import { Link } from 'react-router-dom';
import { useWorkOrderState } from 'context/WorkOrderContext';

const WorkOrder = () => {
  const { getLocation, allLocations, loading } = useLocation();

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <>
      <header className="flex  lg:flex-row flex-col justify-between items-center">
        <h1 className="text-3xl font-bold text-[#3366FF]">Work Orders</h1>

        <Link
          to={`/dashboard/create-work-order`}
          onClick={()=>{
            localStorage.removeItem('roomId');
            localStorage.removeItem('locationId');
            localStorage.removeItem('locationName');
          }}
          className="text-white flex justify-center   gap-x-2 items-center px-4 py-2 bg-blue-700 w-auto lg:h-[40px] text-base border-t-2 "

          //   disabled={id && inspector && clean_hours}
          //   onClick={handleSubmit}
        >
          Add New <FaPlus />
        </Link>
      </header>

      <main className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-6 lg:mt-10 mt-5">
        {!loading &&
          allLocations.map(location => (
            <Link
              onClick={() => {
                localStorage.setItem('locationName', `${location?.city}- ${location?.country}`);
                localStorage.setItem('locationId', `${location?._id}`);
              }}
              to={`/dashboard/work-order/${location?._id}`}
              key={location?._id}
              className="bg-[#EBF0FF] px-3 py-3 flex justify-between items-center w-full text-[#3366FF] font-bold shadow-sm"
            >
              <span>{`${location?.city}- ${location?.country}`}</span>
              <span>
                <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 11L6 6L1 1" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          ))}
        {loading && (
          <div className="loader">
            <div className="justify-content-center jimu-primary-loading"></div>
          </div>
        )}
      </main>
    </>
  );
};

export default WorkOrder;
