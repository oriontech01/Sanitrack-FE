import React, { useEffect, useState } from 'react';
import '../styles/Tasks.scss';
import { useNavigate } from 'react-router-dom';
import useRoom from '../Hooks/useRoom';
const Room = () => {
  const { getRoom, allRooms, deleteRoom, responseMessage } = useRoom()
  const navigate = useNavigate()
  const handleNavigate = () => {
    navigate('/home/add-room')
  }

  useEffect(() => {
    getRoom()
  }, [])

  const handleViewDDetails = (roomId) => { 
    navigate(`/home/view-details/${roomId}`)
  }

  const handleRoomDelete = async(roomId) => {
    await deleteRoom(roomId)
    navigate("/home/room")
  }
  return (
    <div className="tab-display">
      <div className="center-me">
        <div className="container">
          <div className="task-section">
            <h2>All Rooms</h2>
            <button id="createTaskBtn" onClick={handleNavigate}>
              Create New Room
            </button>
          </div>

          <div className="table-section">
            <table id="taskTable">
              <thead>
                <tr>
                  <th>Room name</th>
                  <th>Location</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {allRooms ? (
                  allRooms.map((item) => (
                    <tr key={item._id}>
                      <td>{item.roomName}</td>
                      <td>{item.location}</td>
                      <td>
                        <div className='btn-group'>
                          <button className='view-btn' onClick={() => {handleViewDDetails(item._id)}}>View Details</button>
                          <button className='delete-btn' onClick={() => {handleRoomDelete(item._id)}}>Delete</button>
                        </div>
                        
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No rooms available</td>
                  </tr>
                )}

              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
};



export default Room;
