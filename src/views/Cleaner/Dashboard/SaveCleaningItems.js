/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import useCleanerHook from 'Hooks/cleaner/useCleanerHook';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SaveCleaningItems = () => {
  const { cleaningItems, getCleaningItemsForCleaner, loading, confrimCleaningItems, itemsLoading } = useCleanerHook();
  const role = localStorage.getItem('role');
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    if (role !== 'Cleaner') {
      navigate(-1);
    }
  }, []);
  useEffect(() => {
    getCleaningItemsForCleaner(params.id);
  }, []);
  const roomId = localStorage.getItem('roomId');
  let newItem = cleaningItems.map(item => ({ cleaning_id: item?.cleaning_id, quantityReceived: item?.quantity }));
  const [quantities, setQuantities] = useState([]);
  console.log('fevgv', quantities);
  const handleChange = (event, index) => {
    const newQuantities = [...newItem];
    newQuantities[index].quantityReceived = event.target.value;
    setQuantities(newQuantities);
  };

  const handleSubmit = () => {
    // Implement your logic to handle submission, e.g., send data to server

    const newData = {
      roomId: roomId,
      cleanerItems: quantities
    };
    console.log('Quantities:', newData);
    confrimCleaningItems(newData);
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

          <h1 className="text-lg font-bold text-[#3366FF]">Enter Cleaning Items</h1>
        </span>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-10">
        {cleaningItems &&
          !loading &&
          cleaningItems.map((item, index) => (
            <div className="pb-2 w-full" key={item?.cleaning_id}>
              <p className="text-gray-400 pb-2 font-medium text-sm">{`${item?.item_name}(${item?.unit})`}</p>
              <input
                type="number"
                id={`quantity-${index}`}
                defaultValue={newItem[index]?.quantityReceived}
                onChange={event => handleChange(event, index)}
                // onChange={handleChange}
                name={`quantity-${index}`}
                placeholder=""
                className="border-2 p-2 outline-none border-none text-[#999999] bg-gray-300 rounded-md w-full"
              />
            </div>
          ))}
        {cleaningItems.length === 0 && !loading && <p className="text-center text-red-500 font-bold text-lg">No cleaning Item available</p>}
      </div>
      {loading && (
        <div className="flex items-center justify-center pt-5">
          <div className="relative">
            <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
            <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
          </div>
        </div>
      )}

      {cleaningItems.length > 0 && (
        <button
          onClick={handleSubmit}
          className="text-white flex justify-center  mb-4 gap-x-2 items-center px-4 py-2 bg-blue-700 w-full lg:w-1/2 lg:h-[40px] text-base border-t-2 mt-10 "
          disabled={itemsLoading}
        >
          {itemsLoading ? 'Loading...' : 'Save'}
        </button>
      )}
      {cleaningItems && cleaningItems.length === 0 && (
        <Link
          to="/dashboard/cleaner/request-cleaning-items"
          className="text-white flex justify-center  mb-4 gap-x-2 items-center px-4 py-2 bg-blue-700 w-full lg:w-1/2 lg:h-[40px] text-base border-t-2 mt-10 "
          // disabled={itemsLoading}
        >
          {'Request Cleaning Items'}
        </Link>
      )}
    </>
  );
};

export default SaveCleaningItems;
