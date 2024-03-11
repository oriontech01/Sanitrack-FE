/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import useRoom from 'Hooks/useRoom';
import { useWorkOrderState } from 'context/WorkOrderContext';
import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';

const WorkOrderDetails = () => {
  const params = useParams();
  const [filteredAssignedRoomsbyId, setFilteredAssignedRoomsById] = useState([]);
  const { getUnassignedRoomById, allUnassignedRoomsById, isLoading, getRoom, allRooms, responseMessage } = useRoom();
  const navigate = useNavigate();
  const LocationId = localStorage.getItem('locationId');
  useEffect(() => {
    getUnassignedRoomById(params.locationId);
  }, []);
  useEffect(() => {
    getRoom();
  }, []);
  console.log('first', allRooms);
  useEffect(() => {
    const filtered = allRooms.filter(room => room.location_id === LocationId);
    setFilteredAssignedRoomsById(filtered);
    console.log('first', filtered);
  }, []);
  const filtered = allRooms.filter(room => room.location_id === LocationId);
  const unFiltered = allRooms.filter(room => room.location_id !== LocationId);
  const LocationName = localStorage.getItem('locationName');

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

          <h1 className="text-2xl font-bold text-[#3366FF]">{LocationName}</h1>
        </span>

        {/* <Link
          to={`/dashboard/create-work-order`}
          className="text-white flex justify-center   gap-x-2 items-center px-4 py-2 bg-blue-700 w-auto lg:h-[40px] text-base border-t-2 "

        
        >
          Add New <FaPlus />
        </Link> */}
      </header>

      {allUnassignedRoomsById?.length > 0 && (
        <p className="text-sm text-gray-400 p-4">Number of Facilities :{allUnassignedRoomsById?.length}</p>
      )}
      <>
        {allUnassignedRoomsById.length > 0 && (
          <div>
            <h1 className="text-xl font-bold text-[#3366FF] ">Unassigned Rooms</h1>
          </div>
        )}
        <main className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-6 lg:mt-10 mt-5">
          {!isLoading &&
            (allUnassignedRoomsById.length > 0 ? (
              allUnassignedRoomsById.map(room => (
                <Link
                  onClick={() => {
                    localStorage.setItem('roomId', `${room?._id}`);
                  }}
                  to={`/dashboard/create-work-order`}
                  key={room?._id}
                  className="bg-[#EBF0FF] bg-opacity-90 px-3 py-3 flex justify-between items-center w-full text-[#3366FF] font-bold shadow-sm"
                >
                  <span className="flex gap-x-2 items-center">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M20 14.6662C20.7364 14.6662 21.3333 14.0692 21.3333 13.3328C21.3333 12.5964 20.7364 11.9995 20 11.9995H18.6667C17.9303 11.9995 17.3333 12.5964 17.3333 13.3328C17.3333 14.0692 17.9303 14.6662 18.6667 14.6662H20Z"
                        fill="#3366FF"
                      />
                      <path
                        d="M14.6667 17.3328C14.6667 18.0692 14.0697 18.6662 13.3333 18.6662H12C11.2636 18.6662 10.6667 18.0692 10.6667 17.3328C10.6667 16.5964 11.2636 15.9995 12 15.9995H13.3333C14.0697 15.9995 14.6667 16.5964 14.6667 17.3328Z"
                        fill="#3366FF"
                      />
                      <path
                        d="M13.3333 14.6662C14.0697 14.6662 14.6667 14.0692 14.6667 13.3328C14.6667 12.5964 14.0697 11.9995 13.3333 11.9995H12C11.2636 11.9995 10.6667 12.5964 10.6667 13.3328C10.6667 14.0692 11.2636 14.6662 12 14.6662H13.3333Z"
                        fill="#3366FF"
                      />
                      <path
                        d="M21.3333 17.3328C21.3333 18.0692 20.7364 18.6662 20 18.6662H18.6667C17.9303 18.6662 17.3333 18.0692 17.3333 17.3328C17.3333 16.5964 17.9303 15.9995 18.6667 15.9995H20C20.7364 15.9995 21.3333 16.5964 21.3333 17.3328Z"
                        fill="#3366FF"
                      />
                      <path
                        d="M13.3333 22.6662C14.0697 22.6662 14.6667 22.0692 14.6667 21.3328C14.6667 20.5964 14.0697 19.9995 13.3333 19.9995H12C11.2636 19.9995 10.6667 20.5964 10.6667 21.3328C10.6667 22.0692 11.2636 22.6662 12 22.6662H13.3333Z"
                        fill="#3366FF"
                      />
                      <path
                        d="M21.3333 21.3328C21.3333 22.0692 20.7364 22.6662 20 22.6662H18.6667C17.9303 22.6662 17.3333 22.0692 17.3333 21.3328C17.3333 20.5964 17.9303 19.9995 18.6667 19.9995H20C20.7364 19.9995 21.3333 20.5964 21.3333 21.3328Z"
                        fill="#3366FF"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M17.323 5.88651C16.5032 5.41804 15.4968 5.41804 14.677 5.88651L6.67696 10.4579C5.8461 10.9327 5.33333 11.8163 5.33333 12.7733V25.3328H3.33333C2.59695 25.3328 2 25.9298 2 26.6662C2 27.4025 2.59695 27.9995 3.33333 27.9995H28.6667C29.403 27.9995 30 27.4025 30 26.6662C30 25.9298 29.403 25.3328 28.6667 25.3328H26.6667V12.7733C26.6667 11.8163 26.1539 10.9327 25.323 10.4579L17.323 5.88651ZM17.3333 25.3328V23.9995C17.3333 23.2631 16.7364 22.6662 16 22.6662C15.2636 22.6662 14.6667 23.2631 14.6667 23.9995V25.3328H8V12.7733L16 8.20182L24 12.7733V25.3328H17.3333Z"
                        fill="#3366FF"
                      />
                    </svg>
                    <p>{`${room?.roomName}`}</p>
                  </span>
                  <span>
                    <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 11L6 6L1 1" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </Link>
              ))
            ) : (
              <p className="text-red-400 font-medium">No Unassigned Rooms for this facility</p>
            ))}
          {isLoading && (
            <div className="loader">
              <div className="justify-content-center jimu-primary-loading"></div>
            </div>
          )}
        </main>
      </>

      <>
        {unFiltered.length > 0 && (
          <div className="mt-10">
            <h1 className="text-xl font-bold text-[#3366FF]">Assigned Rooms</h1>
          </div>
        )}
        <main className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-6 lg:mt-10 mt-5">
          {!isLoading &&
            unFiltered.map(room => (
              <Link
                onClick={() => {
                  localStorage.setItem('roomId', `${room?._id}`);
                }}
                to={`/dashboard/work-order-facility/${room?._id}`}
                key={room?._id}
                className="bg-[#EBF0FF] bg-opacity-90 px-3 py-3 flex justify-between items-center w-full text-[#3366FF] font-bold shadow-sm"
              >
                <span className="flex gap-x-2 items-center">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M20 14.6662C20.7364 14.6662 21.3333 14.0692 21.3333 13.3328C21.3333 12.5964 20.7364 11.9995 20 11.9995H18.6667C17.9303 11.9995 17.3333 12.5964 17.3333 13.3328C17.3333 14.0692 17.9303 14.6662 18.6667 14.6662H20Z"
                      fill="#3366FF"
                    />
                    <path
                      d="M14.6667 17.3328C14.6667 18.0692 14.0697 18.6662 13.3333 18.6662H12C11.2636 18.6662 10.6667 18.0692 10.6667 17.3328C10.6667 16.5964 11.2636 15.9995 12 15.9995H13.3333C14.0697 15.9995 14.6667 16.5964 14.6667 17.3328Z"
                      fill="#3366FF"
                    />
                    <path
                      d="M13.3333 14.6662C14.0697 14.6662 14.6667 14.0692 14.6667 13.3328C14.6667 12.5964 14.0697 11.9995 13.3333 11.9995H12C11.2636 11.9995 10.6667 12.5964 10.6667 13.3328C10.6667 14.0692 11.2636 14.6662 12 14.6662H13.3333Z"
                      fill="#3366FF"
                    />
                    <path
                      d="M21.3333 17.3328C21.3333 18.0692 20.7364 18.6662 20 18.6662H18.6667C17.9303 18.6662 17.3333 18.0692 17.3333 17.3328C17.3333 16.5964 17.9303 15.9995 18.6667 15.9995H20C20.7364 15.9995 21.3333 16.5964 21.3333 17.3328Z"
                      fill="#3366FF"
                    />
                    <path
                      d="M13.3333 22.6662C14.0697 22.6662 14.6667 22.0692 14.6667 21.3328C14.6667 20.5964 14.0697 19.9995 13.3333 19.9995H12C11.2636 19.9995 10.6667 20.5964 10.6667 21.3328C10.6667 22.0692 11.2636 22.6662 12 22.6662H13.3333Z"
                      fill="#3366FF"
                    />
                    <path
                      d="M21.3333 21.3328C21.3333 22.0692 20.7364 22.6662 20 22.6662H18.6667C17.9303 22.6662 17.3333 22.0692 17.3333 21.3328C17.3333 20.5964 17.9303 19.9995 18.6667 19.9995H20C20.7364 19.9995 21.3333 20.5964 21.3333 21.3328Z"
                      fill="#3366FF"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M17.323 5.88651C16.5032 5.41804 15.4968 5.41804 14.677 5.88651L6.67696 10.4579C5.8461 10.9327 5.33333 11.8163 5.33333 12.7733V25.3328H3.33333C2.59695 25.3328 2 25.9298 2 26.6662C2 27.4025 2.59695 27.9995 3.33333 27.9995H28.6667C29.403 27.9995 30 27.4025 30 26.6662C30 25.9298 29.403 25.3328 28.6667 25.3328H26.6667V12.7733C26.6667 11.8163 26.1539 10.9327 25.323 10.4579L17.323 5.88651ZM17.3333 25.3328V23.9995C17.3333 23.2631 16.7364 22.6662 16 22.6662C15.2636 22.6662 14.6667 23.2631 14.6667 23.9995V25.3328H8V12.7733L16 8.20182L24 12.7733V25.3328H17.3333Z"
                      fill="#3366FF"
                    />
                  </svg>
                  <p>{`${room?.roomName}`}</p>
                </span>
                <span>
                  <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 11L6 6L1 1" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            ))}
          {isLoading && (
            <div className="loader">
              <div className="justify-content-center jimu-primary-loading"></div>
            </div>
          )}
        </main>
      </>
    </>
  );
};

export default WorkOrderDetails;
