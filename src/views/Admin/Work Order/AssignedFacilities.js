/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { ArrowForward } from '@mui/icons-material';
import useLocation from 'Hooks/useLocation';
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

const AssignedFacilities = () => {
    const { getAssignedFac, assignedFac, loadings } = useLocation();
    useEffect(()=>{
getAssignedFac()
    },[])
    console.log(assignedFac)
  return (
    <>   <div className='grid grid-cols-1 gap-5 lg:grid-cols-2'
    >
      {!loadings &&
        assignedFac?.map(location => (
          <Link
          to={`/dashboard/work-order-facility/${location?._id}`}
            onClick={() => {
              localStorage.setItem('locationName', `${location?.facility_id?.city}- ${location?.facility_id?.facility_name} `);
              localStorage.setItem('locationId', `${location?.facility_id?._id}`);
       
            }}

            // to={`/dashboard/work-order/${location?._id}`}
            key={location?._id}
            className={`bg-[#EBF0FF] px-3 py-3 flex justify-between items-center w-full text-[#3366FF] font-bold shadow-sm cursor-pointer`}
          >
            <div className='flex flex-col gap-y-2'>
            <span>{location?.facility_id ?`${location?.facility_id?.city}- ${location?.facility_id?.country}`:"N/A"}</span>
            <span className='font-normal'>{location?.facility_id?.facility_name}</span>
            </div>
          
            <span>
              <ArrowForward />
            </span>
          </Link>
        ))}
    </div>
    {loadings && (
          <div className="flex items-center justify-center pt-5">
            <div className="relative">
              <div className="h-16 w-16 rounded-full border-t-8 border-b-8 border-gray-200"></div>
              <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
            </div>
          </div>
        )}
    </>
  )
}

export default AssignedFacilities