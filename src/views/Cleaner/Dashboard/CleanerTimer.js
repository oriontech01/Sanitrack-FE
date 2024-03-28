import useCleanerHook from 'Hooks/cleaner/useCleanerHook';
import React, { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useStopwatch, useTimer } from 'react-timer-hook';
import CleanerItemsUpload from './CleanerItemsUpload';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const CleanerTimer = () => {
  const { submitTask, itemsLoading } = useCleanerHook();
  const locationDeets = localStorage.getItem('locationDeets');
  const start = localStorage.getItem('stopwatchStartTime');
  const elapsed = localStorage.getItem('elapsedTime');
  const run = localStorage.getItem('running');
  const roomId = localStorage.getItem('roomId');
  const actualTime = localStorage.getItem('actualTimer');
  const [isRunning, setIsRunning] = useState(run ? run : false);
  const [elapsedTime, setElapsedTime] = useState(elapsed? elapsed :0); // Total elapsed time in seconds
  const [startTime, setStartTime] = useState(start ? start : 0); // Start time in milliseconds

  const actualTimeInSeconds = Number(localStorage.getItem('actualTimer'));

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setElapsedTime(prevTime => Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(intervalId); // Clear interval on unmount
  }, [isRunning, startTime]);

  const handleStart = () => {
    setIsRunning(true);
    // Set start time or adjust for paused time
    setStartTime(startTime === 0 ? Date.now() : Date.now() - elapsedTime * 1000);
    localStorage.setItem('stopwatchStartTime', Date.now());
  };

  const handleStop = () => {
    setIsRunning(false);
    localStorage.removeItem('stopwatchStartTime');
    localStorage.removeItem('running');
    localStorage.setItem('elaspedTime', elapsedTime);
  };

  const handleReset = () => {
    setIsRunning(false);
    setElapsedTime(0);
    setStartTime(0);
    localStorage.removeItem('stopwatchStartTime');
  };

  const getFormattedTime = time => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Persist start time in localStorage
  useEffect(() => {
    // const storedStartTime = localStorage.getItem('stopwatchStartTime');
    if (start) {
      setStartTime(parseInt(start, 10));
      // Calculate elapsed time based on stored start time
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }
    localStorage.setItem('running', true);
    // window.addEventListener('beforeunload', () => {
    //   localStorage.setItem('stopwatchStartTime', startTime);
    //   setIsRunning(true);
    // });
  }, []);
  useEffect(() => {
    const handleBeforeUnload = event => {
      event.preventDefault();
      // Custom logic to handle the refresh
      // Display a confirmation message or perform necessary actions
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // useEffect to handle the timer and reminders
  // Add this right after your existing useState and useEffect hooks and before the return statement

  // useEffect to handle the timer and reminders
  useEffect(() => {
    // Define the function to check the elapsed time and trigger reminders
    console.log("WOOOOOOOEEEEEEEE")
    const checkTimeAndSetReminder = () => {
      const currentElapsedTime = Math.floor((Date.now() - Number(startTime)) / 1000);
      setElapsedTime(currentElapsedTime);

      // Trigger an alert when the elapsed time is close to the actual time
      if (currentElapsedTime < actualTimeInSeconds) {
        const timeLeft = actualTimeInSeconds - currentElapsedTime;
        if (timeLeft <= 120) {
          // When 2 minutes or less are left
          alert(`Reminder: Only ${timeLeft} seconds left until the allotted time is reached.`);
        }
      } else {
        alert("Time's up!");
        setIsRunning(false);
        clearInterval(reminderIntervalId);
      }
    };

    let reminderIntervalId;

    // Set up the reminder interval if the timer is running and there's time left
    if (isRunning && elapsedTime < actualTimeInSeconds) {
      console.log("PLEASE DOING")
      reminderIntervalId = setInterval(checkTimeAndSetReminder, 120000); // Reminder every 2 minutes
    }

    // Clear the reminder interval on cleanup
    return () => clearInterval(reminderIntervalId);
  }, [isRunning, elapsedTime, actualTimeInSeconds, startTime]);

  // Continue with the rest of your component...

  // Ensure to include actualTimeInSeconds and startTime in the dependency array to get the latest values

  console.log('first', elapsedTime);
  const percentage = Math.floor((elapsedTime / actualTime) * 100);

  const handleSubmit = () => {
    const data = { cleanTime: elapsedTime, roomId: roomId };
    console.log(data);
    submitTask(data);
    localStorage.removeItem('plannedTime');
  };
  return (
    <>
      {/* <ToastContainer/> */}
      {/* <ToastContainer/> */}
      <div className="flex flex-col items-center justify-center">
        <div className="w-[300px]">
          <CircularProgressbar
            value={percentage}
            text={getFormattedTime(elapsedTime)}
            strokeWidth={2}
            styles={buildStyles({
              // Rotation of path and trail, in number of turns (0-1)

              // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
              strokeLinecap: 'butt',

              // Text size
              textSize: '16px',

              // How long animation takes to go from one percentage to another, in seconds
              pathTransitionDuration: 0.5,

              // Can specify path transition in more detail, or remove it entirely
              // pathTransition: 'none',

              // Colors
              pathColor: elapsedTime > actualTime ? 'red' : `#3366FF`,
              textColor: 'black',
              trailColor: '#E0E8FF',
              backgroundColor: '#3e98c7'
            })}
          />
          ;
        </div>

        {/* <div className="text-4xl font-bold text-center mb-4">{getFormattedTime(elapsedTime)}</div> */}
        <div className="flex space-x-4">
          <span className="flex flex-col gap-y-2 items-center">
            <button
              onClick={handleStart}
              className={` p-3  text-white font-bold rounded-full ${
                isRunning ? 'bg-green-500 hover:bg-green-700' : 'bg-blue-300 hover:bg-blue-700'
              }`}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7.87 21.2805C7.08 21.2805 6.33 21.0905 5.67 20.7105C4.11 19.8105 3.25 17.9805 3.25 15.5705V8.44048C3.25 6.02048 4.11 4.20048 5.67 3.30048C7.23 2.40048 9.24 2.57048 11.34 3.78048L17.51 7.34048C19.6 8.55048 20.76 10.2105 20.76 12.0105C20.76 13.8105 19.61 15.4705 17.51 16.6805L11.34 20.2405C10.13 20.9305 8.95 21.2805 7.87 21.2805ZM7.87 4.22048C7.33 4.22048 6.85 4.34048 6.42 4.59048C5.34 5.21048 4.75 6.58048 4.75 8.44048V15.5605C4.75 17.4205 5.34 18.7805 6.42 19.4105C7.5 20.0405 8.98 19.8605 10.59 18.9305L16.76 15.3705C18.37 14.4405 19.26 13.2505 19.26 12.0005C19.26 10.7505 18.37 9.56048 16.76 8.63048L10.59 5.07048C9.61 4.51048 8.69 4.22048 7.87 4.22048Z"
                  fill="#3366FF"
                />
              </svg>
            </button>
            <p className="text-sm text-[#3366FF] font-bold">Start Timer</p>
          </span>
          <span className="flex flex-col gap-y-2 items-center">
            <button
              onClick={handleStop}
              className={`p-3  text-white font-bold rounded-full bg-red-300 hover:bg-gray-700 ${!isRunning ? 'disabled opacity-50' : ''}`}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M14.7 21.75H9.3C4.36 21.75 2.25 19.64 2.25 14.7V9.3C2.25 4.36 4.36 2.25 9.3 2.25H14.7C19.64 2.25 21.75 4.36 21.75 9.3V14.7C21.75 19.64 19.64 21.75 14.7 21.75ZM9.3 3.75C5.2 3.75 3.75 5.2 3.75 9.3V14.7C3.75 18.8 5.2 20.25 9.3 20.25H14.7C18.8 20.25 20.25 18.8 20.25 14.7V9.3C20.25 5.2 18.8 3.75 14.7 3.75H9.3Z"
                  fill="#6D0808"
                />
              </svg>
            </button>
            <p className="text-sm text-red-500 font-bold">Stop Timer</p>
          </span>
          {/* <button onClick={handleReset} className="px-4 py-2 rounded-md text-white font-bold bg-gray-500 hover:bg-gray-700">
            Reset
          </button> */}
        </div>
      </div>
      {isRunning && <CleanerItemsUpload />}
      {isRunning && <CleanerItemsUpload />}

      <button
        onClick={handleSubmit}
        className="text-white flex justify-center  mb-4 gap-x-2 items-center px-4 py-2 bg-blue-700 w-full lg:w-1/2 lg:h-[40px] text-base border-t-2 mt-10 "
        disabled={itemsLoading}
      >
        {itemsLoading ? 'Loading...' : 'Submit Task'}
      </button>
    </>
  );
};

export default CleanerTimer;
