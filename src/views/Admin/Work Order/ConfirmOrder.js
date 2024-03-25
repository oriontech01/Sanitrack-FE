import useItems from 'Hooks/useItems';
import { useItemState } from 'context/ItemContext';
import React from 'react';
import { Link } from 'react-router-dom';
import { toast, Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ConfirmOrder = ({ closeModal }) => {
  const { inventory } = useItemState(); // Get setIsLoggedIn from context
  const { deleteInventory, inLoading,sus } = useItems();

  console.log('first', inventory);
//   const handleSubmit = () => {
//     const data = { cleaningItemsData:[ { cleaning_id: inventory?._id, item_name: inventory?.equipment }] };
//     deleteInventory(data)
//     if(sus){
//       closeModal()
//     }
//   };
const id =localStorage.getItem("workIdx")
  return (
    <>
    <ToastContainer/>
      <div className=" top-20">
        <div>
          <div className="bg-white z-50 overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full pt-5 lg:pt-10">
            {/* <div className="relative">
             <div className="absolute top-3 right-5">
               <FaWindowClose className="text-xl text-black cursor-pointer " />
             </div>
           </div> */}
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ">
              <div className="flex items-center justify-center">
               
                <div className="mt-3 text-center sm:mt-0   flex flex-col justify-center items-center">
                  <h3 className="text-lg text-center leading-6 font-medium text-blue-500">Create Work Order</h3>
                  <div className="mt-2">
                    <p className="text-sm leading-5 text-gray-500 text-center">
                    Do you want set up Work Orders for this Facility?
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse w-full justify-between gap-5">
              <span className="flex w-full rounded-md shadow-sm sm:ml-3 ">
                <Link
                 to="/dashboard/work-schedule"
                  className="flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                >
                  No
                </Link>
              </span>
              <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 ">
                <Link

                 to={`/dashboard/work-order/facility-work-order/${id}`}
                  className="flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-green-600 text-white leading-6 font-medium shadow-sm hover:text-slate-300 focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                >
                  {inLoading ? 'Loading...' : 'Yes'}
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
