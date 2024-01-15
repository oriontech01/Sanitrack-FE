import React from 'react';
import '../styles/WorkOrderLocation.scss'; 

const WorkOrderLocation = () => {
  return (
    <div className="bg-color container 
    .work-order-location-container">
      <div className="rooms-container">
        <div className="room-row1">
          <a href="#" className="room-a rooms_all">ROOM A</a>
          <a href="#" className="room-b rooms_all">ROOM B</a>
        </div>
        <div className="room-row2">
          <a href="#" className="room-c rooms_all">ROOM C</a>
          <a href="#" className="room-d rooms_all">ROOM D</a>
        </div>
      </div>
    </div>
  );
};

export default WorkOrderLocation;
