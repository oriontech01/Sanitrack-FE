/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import ModalComponent from 'component/Modals/Modal';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import TaskDetails from 'views/Admin/Work Order/TaskDetails';
import ViewImage from './ViewImage';
import { useItemState } from 'context/ItemContext';
const SanitationDetails = () => {
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem('sanitationDeets'));
  const taskData = JSON.parse(localStorage.getItem('taskDeets'));

  const formatDate = dateString => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based
    const year = date.getFullYear();

    // Ensure two digits for day and month
    const formattedDay = String(day).padStart(2, '0');
    const formattedMonth = String(month).padStart(2, '0');

    return `${formattedDay}/${formattedMonth}/${year}`;
  };
  const { setInventory } = useItemState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = e => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
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

          <h1 className="text-2xl font-bold text-[#3366FF]">{data?.roomName ?? 'New Room'}</h1>
        </span>
      </header>
      <div className="flex flex-col gap-y-3 py-10">
        <span className="flex gap-2 items-center">
          <p className="text-black text-lg">Frequency Days:</p>
          <p className="text-black text-lg">{taskData?.tasks[-1]?.last_cleaned ? formatDate(taskData?.tasks[-1]?.last_cleaned) : 'N/A'}</p>
        </span>
        <span className="flex gap-2 items-center">
          <p className="text-black text-lg">Last Due Date:</p>
          <p className="text-black text-lg">{formatDate(taskData?.scheduled_date) ?? '-'}</p>
        </span>
        <span className="flex gap-2 items-center">
          <p className="text-black text-lg">Status:</p>
          <p className="text-black text-lg capitalize">{taskData?.task_stage}</p>
        </span>
      </div>
      <h1 className="text-xl font-bold text-[#3366FF] pb-2">Items in Room</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 ">
        {taskData?.tasks?.map((room, index) => (
          <div key={room?._id} className="p-3 bg-yellow-100 ">
            <div className="flex justify-between items-center border-b border-gray-500 pb-2">
              <span className="flex items-center gap-x-2">
                <p className="text-blue-500 font-bold">{room?.name}</p>
              </span>
            </div>
            <div className="pt-2 w-full">
              <button
                onClick={e => {
                  openModal(e);
                  setInventory(room);
                }}
                className="text-blue-500 flex justify-center   gap-x-2 items-center px-4 py-2 bg-blue-200 w-auto lg:h-[40px] text-base border border-blue-500 rounded-lg "
                // disabled={}
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
      <ModalComponent
        isOpen={isModalOpen}
        onClose={closeModal}
        setIsModalOpen={setIsModalOpen}
      >
        <ViewImage  closeModal={closeModal}/>
      </ModalComponent>
    </div>
  );
};

export default SanitationDetails;
