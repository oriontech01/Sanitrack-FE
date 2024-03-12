/* eslint-disable jsx-a11y/label-has-associated-control */
import useCleanerHook from 'Hooks/cleaner/useCleanerHook';
import useInspectorHook from 'Hooks/inspector/useInspectorHook';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast, Flip } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const InspectorItemsUpload = ({ selectedTasks, setSelectedTasks, rooms, loading }) => {
  console.log('rooms', rooms);
  const [base64String, setBase64String] = useState('');
  const [count, setCount] = useState('');
  const [formData, setFormData] = useState([]);
  const [formName, setFormName] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState([]);

  //   console.log('base', base64String);

  const handleChange = async (index, event) => {
    const newData = [...formData];

    newData[index] = {
      taskId: rooms[index].task_id
    };
    console.log(newData);
    //    countData[index]={
    //     taskId: rooms[index].roomDetailId,
    //   };
    setFormData(newData);
    //   setCount(countData)
  };
  const handleCheckboxChange = taskId => {
    if (selectedTasks.some(task => task.taskId === taskId)) {
      setSelectedTasks(selectedTasks.filter(task => task.taskId !== taskId));
    } else {
      setSelectedTasks([...selectedTasks, { taskId }]);
    }
  };
 
  return (
    <>
      <ToastContainer />
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 mt-10">
          {rooms &&
            !loading &&
            rooms.map((room, index) => (
              <div key={room?._id} className="p-3 bg-yellow-100 ">
                <div className="flex justify-between items-center border-b border-gray-500 pb-2">
                  <span className="flex items-center gap-x-2">
                    <p className="text-blue-500 font-bold">{room?.name}</p>
                  </span>
                  <div>
                    <div className="flex items-center gap-x-2">
                      <input
                        type="checkbox"
                        id={room.task_id}
                        checked={selectedTasks.some(selectedTask => selectedTask.taskId === room.task_id)}
                        onChange={() => handleCheckboxChange(room.task_id)}
                        className=""

                        // onChange={event => handleChange(index, event)}
                      />
                      <label className="flex items-center h-10  rounded cursor-pointer group" htmlFor={`imageUpload_${index}`}>
                        {/* <span className="checkbox-inner flex items-center justify-center w-5 h-5 text-transparent border-2 border-gray-300 rounded-full peer-[.is-checked]:peer-checked:bg-blue-500"></span> */}
                        <span className=" text-sm font-bold text-blue-500">Satisfied ?</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="pt-2 w-full">
                  <button
                    //   onClick={handleSubmit}
                    className="text-blue-500 flex justify-center   gap-x-2 items-center px-4 py-2 bg-blue-200 w-auto lg:h-[40px] text-base border border-blue-500 rounded-lg "
                    // disabled={}
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
        </div>
        {loading && (
          <div className="flex items-center justify-center pt-5">
            <div className="relative">
              <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
              <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
            </div>
          </div>
        )}
      </div>
      
    </>
  );
};

export default InspectorItemsUpload;
