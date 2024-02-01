import React, { useEffect, useState } from 'react';
import '../styles/Tasks.scss';
import { useNavigate } from 'react-router-dom';
import useRoom from '../Hooks/useRoom';
import { useTranslation } from 'react-i18next';
const Room = () => {
  const {t} = useTranslation()
  const { getRoom, allRooms, deleteRoom, responseMessage } = useRoom()
  const [rooms, setRooms] = useState()

  

  const navigate = useNavigate()
  const handleNavigate = () => {
    navigate('/home/add-room')
  }

  
  useEffect(() => {
    const fetchData = async () => {
      await getRoom();
      setRooms(allRooms);
    };
  
    fetchData();
  }, [getRoom]);
  
  const handleViewDDetails = (roomId) => { 
    navigate(`/home/view-details/${roomId}`)
  }

  const handleRoomDelete = async(roomId) => {
    await deleteRoom(roomId)
    const updatedRooms = rooms.filter(room => room._id !== roomId);

    // Update the state to trigger a re-render
    setRooms(updatedRooms);
  }
  return (
    <div className="tab-display">
      <div className="center-me">
        <div className="container">
          <div className="task-section">
            <h2>{t('All Rooms')}</h2>
            <button id="createTaskBtn" onClick={handleNavigate}>
              {t('Create New Room')}
            </button>
          </div>

          <div className="table-section">
            <table id="taskTable">
              <thead>
                <tr>
                  <th>{t('Room name')}</th>
                  <th>{t('Location')}</th>
                  <th>{t('Action')}</th>
                </tr>
              </thead>
              <tbody>
                {rooms ? (
                  rooms.map((item) => (
                    <tr key={item._id}>
                      <td>{item.roomName}</td>
                      <td>{item.location.city},{item.location.state} {item.location.country}</td>
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
                    <td colSpan="3">{t('No rooms available')}</td>
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