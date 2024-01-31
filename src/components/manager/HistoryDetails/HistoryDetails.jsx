import { useEffect, useState } from "react";
import Modal from "react-modal";
import "../HistoryDetails/index.scss";

// eslint-disable-next-line react/prop-types
const HistoryDetails = ({ name, detailId, historyData }) => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  useEffect(() => {
    console.log("Historyyyyy", historyData)
  }, [])
  return (
    <div className="cleaner-history">
      <Modal
        onRequestClose={handleCloseModal}
        overlayClassName="modal-overlay"
        isOpen={openModal}
        contentLabel="Work History"
        className="work-history-modal"
      >
        <h1>History for {name}</h1>
        <p>Detail ID: {detailId}</p>
        {historyData && historyData.length > 0 ? (
          historyData.map((assignment, index) => (
            <div key={index} className="assignment">
              <h3 className="room-name">
                Room: {assignment.assigned_room.roomName}
              </h3>
              <p className="status">
                Status: {assignment.isSubmitted ? "Submitted" : "Not Submitted"}
              </p>
              <h4 className="tasks-heading">Tasks:</h4>
              {assignment.tasks && assignment.tasks.length > 0 ? (
                assignment.tasks.map((task, taskIndex) => (
                  <div key={taskIndex} className="task">
                    <p className="task-name">Task Name: {task.name}</p>
                    <p className="task-status">
                      Task Status: {task.isDone ? "Done" : "Pending"}
                    </p>
                    {task.image !== "empty" && (
                      <img
                        src={task.image}
                        alt={task.name}
                        className="task-image"
                      />
                    )}
                  </div>
                ))
              ) : (
                <p className="no-tasks">No tasks available.</p>
              )}
            </div>
          ))
        ) : (
          <p className="no-history">No history available.</p>
        )}
      </Modal>
      <span className="user-history-name">{name}</span>
      <span className="view-history-button" onClick={handleOpenModal}>
        View History
      </span>
    </div>
  );
};

export default HistoryDetails;