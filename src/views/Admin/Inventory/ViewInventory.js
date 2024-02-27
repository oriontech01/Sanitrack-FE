import { useItemState } from 'context/ItemContext';
import React from 'react'

const ViewInventory = () => {
  const { inventory } = useItemState(); // Get setIsLoggedIn from context
  console.log(inventory);
  return (
    <>
      <div className=" top-20">
     
     <div>
       <div className="bg-white z-50 overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
         {/* <div className="relative">
             <div className="absolute top-3 right-5">
               <FaWindowClose className="text-xl text-black cursor-pointer " />
             </div>
           </div> */}
         <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
           <div className="flex justify-center itemms-center">
             
             <div className="mt-3 text-center sm:mt-0 sm:ml-4 ">
               <h3 className="text-lg leading-6 font-semibold text-gray-900 pb-2">
                  Item Details
               </h3>
               <img
                
                src={inventory.image}
                alt="Preview"
                className="w-full h-40 object-cover"
              />
               <div className="mt-2">
                <p className="text-base leading-5 text-gray-500">{`Name: ${inventory.equipment}`}</p>
                <p className="text-base leading-5 text-gray-500">{`Description: ${inventory.description}`}</p>
                <p className="text-base leading-5 text-gray-500">{`Qunatity: ${inventory.quantity}`}</p>
                <p className="text-base leading-5 text-gray-500">{`Weight: ${inventory.unit}`}</p>
                <p className="text-base leading-5 text-gray-500">{inventory.pairs ?"This item comes in pairs":""}</p>
               </div>
             </div>
           </div>
         </div>
      
       </div>
     </div>
   </div>
    </>
  )
}

export default ViewInventory