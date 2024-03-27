import React from 'react';

const TimerRooms = ({ data,  }) => {
  return (
    <>
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 mt-10">
          {data &&
          
            data.map((room, index) => (
              <div key={room?._id} className="p-3 bg-blue-100 ">
                <div className="flex justify-between items-center border-b border-gray-500 pb-2">
                  <span className="flex items-center gap-x-2">
                    <p className="text-blue-500 font-bold">{room?.roomName}</p>
                  </span>
                  <div>
                    <div className="flex items-center gap-x-2">
                      {/* <input
                      type="checkbox"
                      id={room.task_id}
                      checked={selectedTasks.some(selectedTask => selectedTask.taskId === room.task_id)}
                      onChange={() => handleCheckboxChange(room.task_id)}
                      className=""

                      // onChange={event => handleChange(index, event)}
                    /> */}
                      {/* <p>{`${room?.detail?.detail?.length} items in room`}</p> */}
                    </div>
                  </div>
                </div>
                <div className="pt-2 w-full">
                  {/* <button
                  onClick={e => {
                    openModal(e);
                    setInventory(room);
                  }}
                  className="text-blue-500 flex justify-center   gap-x-2 items-center px-4 py-2 bg-blue-200 w-auto lg:h-[40px] text-base border border-blue-500 rounded-lg "
                  // disabled={}
                >
                  View
                </button> */}
                </div>
              </div>
            ))}
        </div>
        {/* {loading && (
          <div className="flex items-center justify-center pt-5">
            <div className="relative">
              <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
              <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
            </div>
          </div>
        )} */}
      </div>
    </>
  );
};

export default TimerRooms;
