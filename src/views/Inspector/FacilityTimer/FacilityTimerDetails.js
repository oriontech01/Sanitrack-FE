import useCleanerHook from 'Hooks/cleaner/useCleanerHook';
import React, { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { useNavigate, useParams } from 'react-router';
import { toast, Flip } from 'react-toastify';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

import useInspectorHook from 'Hooks/inspector/useInspectorHook';
import axios from 'axios';
import useRoom from 'Hooks/useRoom';
import TimerRooms from './TimerRooms';
import useTask from 'Hooks/useTask';
import FacilityStopWatch from './FacilityStopWatch';
const FacilityTimerDetails = () => {
  const params = useParams();
  const access_token = localStorage.getItem('auth-token');
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const { getFacilityStages, facilityStages } = useTask();
  useEffect(() => {
    getFacilityStages(params.id);
  }, []);
  const navigate =useNavigate()
  const [itemsLoading, setItemsLoading] = useState(false);
  const storedStage = localStorage.getItem('startedStage');
  const start = localStorage.getItem('stopwatchStartTime');
  const { roomByLocation, getRoomByLocation, isLoading } = useRoom();
  const [startTime, setStartTime] = useState(start ? start : 0);
  const firstStage = facilityStages[0]?.name;
  console.log('gjjgj', firstStage);
  const [stage, setStage] = useState('');
  const assignedRooms = JSON.parse(localStorage.getItem('assignedRooms'));
  const filteredStage = facilityStages.filter(item => item?.name === stage);
  console.log('filter', filteredStage);
  const [endTime, setEndTime] = useState(0);

  useEffect(() => {
    getRoomByLocation(params.id);
  }, []);

  // const { inspectorSummary, getSummaryInspector, rooms, getRoomsToClean, } = useInspectorHook();
  //   const { submitTask, itemsLoading } = useCleanerHook();

  const locName = localStorage.getItem('locationName');

  // useEffect(() => {
  //   getSummaryInspector();
  // }, []);
  // useEffect(() => {
  //   getRoomsToClean();
  // }, []);

  console.log('stages', stage);

  function dateToTimestamp(dateString) {
    return Date.parse(dateString);
  }

  const releaseTask = async () => {
    setItemsLoading(true);
    await axios
      .post(
        `${BASE_URL}inspector/facility-release?work_order_id=${params.id}`,

        {},
        { headers: { Authorization: `Bearer ${access_token}` } }
      )
      .then(response => {
        console.log(response);
        // send user back to the task home page
        if (response.data) {
          setItemsLoading(false);
          toast.success('Facility Released Successfully', {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
            transition: Flip
          });
          setTimeout(() => {
            navigate(`/dashboard/facility-timers`);
          }, 2000);
          localStorage.removeItem('stopwatchStartTime');
          localStorage.removeItem('running');
          localStorage.setItem('elaspedTime', elapsedTime);
        }

        // console.log(response.json())
      })
      .catch(error => {
        if (error.response) {
          setItemsLoading(false);
          const { status, data } = error.response;
          toast.error(data.message, {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
            transition: Flip
          });
          if (status === 400 && data && data.message) {
           
            console.log('An error occured', data.message);
          } else if (status === 403 && data && data.message) {
            // navigate('/')
          } else {
            console.log('Axios error:', error);
          }
        } else {
          setItemsLoading(false);
          console.log('Network error:', error.message);
        }
      });
  };
  const handleSubmit = () => {
    // const data = { cleanTime: elapsedTime, roomId: roomId };
    // console.log(data);
    // const newData = { timer: elapsedTime, passedTasks: selectedTasks };
    // localStorage.removeItem('stopwatchStartTime');
    // localStorage.removeItem('running');
    // localStorage.setItem('elaspedTime', elapsedTime);
    // console.log('submoitted', newData);
    // navigate('/dashboard/inspector/coming-soon');
    releaseTask();
  };
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day} - ${month} - ${year}`;
  }
  return (
    <>
      {/* <ToastContainer /> */}
      <header className={`flex lg:flex-row flex-col justify-between items-center mb-4`}>
        <h1 className="text-xl font-bold text-[#3366FF] capitalize">{locName}</h1>
        {/* Conditionally render or adjust styles for your link based on `matches` */}
        <div className="flex flex-col items-start gap-y-2">
          <p>{`Start Time: ${filteredStage[0]?.actual_stage_stop_time ? formatDate(filteredStage[0]?.actual_stage_stop_time) : 'N/A'}`}</p>
          <select
            // defaultValue={facilityStages[0]?.name}
            value={storedStage ? storedStage : facilityStages[0]?.name}
            className="capitalize h-12 py-1 px-2 border w-60 border-black text-black focus-within:border-black focus:border-black"
          >
            {/* <option value="">Please choose&hellip;</option> */}
            {facilityStages.map((stage, i) => (
              <option disabled key={stage.name} value={stage.name} className="capitalize">
                {`${stage.name} 
              `}
              </option>
            ))}
          </select>
        </div>
      </header>
      <div className="flex justify-center mb-5">
        <select
          // defaultValue={facilityStages[0]?.name}
          value={storedStage ? storedStage : facilityStages[0]?.name}
          onChange={e => {
            setStage(e.target.value);
            getFacilityStages();
            localStorage.setItem('startedStage', e.target.value);
          }}
          onClick={() => {
            getFacilityStages(params.id);
          }}
          className="capitalize h-12 py-1 px-2 border w-60 border-red-300 text-red-400 focus-within:border-red-300 focus:border-red-300"
        >
          {/* <option value="">Please choose&hellip;</option> */}
          {facilityStages.map((stage, i) => (
            <option key={stage.name} value={stage.name} className="capitalize">
              {stage.name}
            </option>
          ))}
        </select>
      </div>
      <FacilityStopWatch
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={startTime}
        stage={stage === '' ? firstStage : stage}
        id={filteredStage[0]?._id}
      />

      {/* {isRunning && (
        <InspectorItemsUpload selectedTasks={selectedTasks} setSelectedTasks={setSelectedTasks} rooms={rooms} loading={loading} />
      )} */}
      <TimerRooms data={assignedRooms} />
      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          className="text-white flex justify-center  mb-4 gap-x-2 items-center px-4 py-2 bg-blue-700 w-full lg:w-1/2 lg:h-[40px] text-base border-t-2 mt-10 "
          disabled={itemsLoading}
        >
          {itemsLoading ? 'Loading...' : 'Release Facility'}
        </button>
      </div>
    </>
  );
};

export default FacilityTimerDetails;
