/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import useCleanerHook from 'Hooks/cleaner/useCleanerHook';
import useItems from 'Hooks/useItems';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const RequestCleaningItems = () => {
  const navigate = useNavigate();
  const { getInventory, inventoryLoading, allInventory } = useItems();
  const { requestCleaningItems, itemsLoading } = useCleanerHook();
  const [submittingInventory, setSubmittingInventory] = useState([]);
  const [req, setReq] = useState([]);
  useEffect(() => {
    getInventory();
  }, []);
  console.log('third', allInventory);

  useEffect(() => {
    let newItem = allInventory.map(item => ({
      cleaning_id: item?._id,
      asking_quantity: item?.quantity,
      comment: '',
      item_name: item?.equipment,
      unit: item?.unit
    }));

    setSubmittingInventory(() => newItem);
  }, [allInventory]);

  //   console.log('first', newItem);
  const handleChange = (event, index) => {
    // const newQuantities = [...newItem];
    if (event.target.name === `quantity-${index}`) {
      submittingInventory[index].asking_quantity = Number(event.target.value);
      console.log('req', req);
      console.log(submittingInventory[index].cleaning_id);
      setReq((val = req) => {

        if (!val.includes(submittingInventory[index].cleaning_id)) {
           val.push(submittingInventory[index].cleaning_id);
           return val;
        } else {
          return val;
        }
      });
    }
    if (event.target.name === `comment-${index}`) {
      submittingInventory[index].comment = event.target.value;
      setSubmittingInventory(submittingInventory);
      setReq((val = req) => {
        if (!val.includes(submittingInventory[index].cleaning_id)) {
          val.push(submittingInventory[index].cleaning_id);
          return val;
        } else {
          return val;
        }
      });
    }
  };

  console.log('sec', submittingInventory);
  const handleSubmit = () => {
    // Implement your logic to handle submission, e.g., send data to server

    const newData = submittingInventory.filter(val => req?.includes(val.cleaning_id));
    const data = { requestedCleaningData: newData };

    requestCleaningItems(data);
  };
  return (
    <>
      <ToastContainer />
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

          <h1 className="text-lg font-bold text-[#3366FF]">Request Cleaning Items</h1>
        </span>
      </header>
      <main className="grid grid-cols-1 lg:grid-cols-2   lg:mt-10 mt-5 gap-x-8 gap-y-4">
        {!inventoryLoading &&
          allInventory &&
          allInventory?.map((item, index) => (
            <div key={item?._id} className=" w-full border-b border-gray-500 pb-3">
              <details>
                <summary
                  className="question  cursor-pointer select-none w-full outline-none text-lg font-medium
            "
                >
                  {item?.equipment}
                </summary>
                <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 mt-5">
                  <div className="pb-2 flex flex-col gap-y-4 w-full" key={item?._id}>
                    <input
                      type="number"
                      id={`quantity-${index}`}
                      defaultValue={submittingInventory[index]?.asking_quantity}
                      onChange={event => handleChange(event, index)}
                      name={`quantity-${index}`}
                      placeholder="Enter Quantity"
                      className="border-2 p-2 outline-none border-none text-[#999999] bg-gray-300 rounded-md w-full"
                    />
                    <input
                      type="text"
                      id={`comment-${index}`}
                      defaultValue={submittingInventory[index]?.comment}
                      onChange={event => handleChange(event, index)}
                      name={`comment-${index}`}
                      placeholder="Enter Comment"
                      className="border-2 p-2 outline-none border-none text-[#999999] bg-gray-300 rounded-md w-full"
                    />
                  </div>
                </div>
              </details>
            </div>
          ))}
        {inventoryLoading && (
          <div className="flex items-center justify-center pt-5">
            <div className="relative">
              <div className="h-20 w-20 rounded-full border-t-8 border-b-8 border-gray-200"></div>
              <div className="absolute top-0 left-0 h-20 w-20 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
            </div>
          </div>
        )}
        {/* <div className=" w-full lg:w-1/2">
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
        </div> */}
      </main>
      <button
        onClick={handleSubmit}
        className="text-white flex justify-center  mb-4 gap-x-2 items-center px-4 py-2 bg-blue-700 w-full lg:w-1/2 lg:h-[40px] text-base border-t-2 mt-10 "
        disabled={itemsLoading}
      >
        {itemsLoading ? 'Loading...' : 'Save'}
      </button>
    </>
  );
};

export default RequestCleaningItems;
