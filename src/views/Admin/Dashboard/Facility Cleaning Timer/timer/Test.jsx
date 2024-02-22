import React from 'react';
import SpeedometerValue from './SpeedometerValue'; // Assuming the component is defined in a separate file

const YourComponent = ({ data }) => {
  return (
    <div>
      {data.map(item => {
        const { task, actualTime } = item;
        const { task_stage } = task;

        // Extract clean_time, preOp_time, and release_time based on task_stage
        let cleanTime = null;
        let preOpTime = null;
        let releaseTime = null;

        if (actualTime && task_stage === 'clean') {
          cleanTime = actualTime.clean_time;
        } else if (actualTime && task_stage === 'preop') {
          preOpTime = actualTime.preOp_time;
        } else if (actualTime && task_stage === 'release') {
          releaseTime = actualTime.release_time;
        }

        // Render speedometer based on the extracted times
        return (
          <div key={task._id}>
            <h2>{task_stage}</h2>
            <SpeedometerValue cleanTime={cleanTime} preOpTime={preOpTime} releaseTime={releaseTime} />
          </div>
        );
      })}
    </div>
  );
};

export default YourComponent;
