/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import useCleanerHook from 'Hooks/cleaner/useCleanerHook';
import useInspectorHook from 'Hooks/inspector/useInspectorHook';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';

const InspectorFacilityCleaningItems = () => {
  const {  loading,getRoomsToClean,rooms } = useInspectorHook();
  const navigate = useNavigate();
  const params = useParams();
  const role = localStorage.getItem('role');
  const id = localStorage.getItem('roomId');
  useEffect(() => {
    if (role !== 'Inspector') {
      navigate(-1);
    }
  }, []);
  useEffect(() => {
    getRoomsToClean();
  }, []);
 console.log("roomie",rooms)
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

          <h1 className="text-lg font-bold text-[#3366FF]">Facility Details</h1>
        </span>
      </header>
      {rooms?.length > 0 && <p className="text-sm text-gray-400 p-4">Items to Clean :{rooms?.length}</p>}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-10">
        {rooms &&
          !loading &&
          rooms?.map(item => (
            <div className="pb-2 border-b border-gray-500 w-full" key={item?._id}>
              <p className="text-blue-500 font-bold text-lg">{item?.name}</p>
            </div>
          ))}
        {rooms?.length === 0 && !loading && <p className="text-center text-red-500 font-bold text-lg">No cleaning Item available</p>}
      </div>
      {loading && (
        <div className="flex items-center justify-center pt-5">
          <div className="relative">
            <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
            <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
          </div>
        </div>
      )}

      {rooms?.length > 0 && (
        <Link
          to={`/dashboard/cleaner/save-cleaning-items/${params.id}`}
          className="text-white flex justify-center  mb-4 gap-x-2 items-center px-4 py-2 bg-blue-700 w-full lg:w-1/2 lg:h-[40px] text-base border-t-2 mt-10 "
          // disabled={id && inspector && clean_hours}
        >
          Save
        </Link>
      )}
    </>
  );
};

export default InspectorFacilityCleaningItems;
