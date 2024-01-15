import React, { useState } from "react";
import "../styles/Tasks.scss"; // Import your CSS file if not already done

const Tasks = () => {
  // State for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  const openTaskModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeTaskModal = () => {
    setIsModalOpen(false);
  };

  // Function to handle task upload (you can implement this logic as needed)
  const uploadTask = () => {
    // Add your logic for task upload
    // For example, you might want to send a request to a server to create a new task
    // After successful upload, close the modal
    closeTaskModal();
  };

  return (
    <div className="tab-display">
      <div className="center-me">
        <div className="container">
          <div className="task-section">
            <h2>Previous Tasks</h2>
            <button id="createTaskBtn" onClick={openTaskModal}>
              Create New Task
            </button>
          </div>

          <div className="table-section">
            <table id="taskTable">
              <thead>
                <tr>
                  <th>Task name</th>
                  <th>Supervisor name</th>
                  <th>Cleaner name</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {/* Sample data for demonstration purposes */}
                <tr>
                  <td>Room 1</td>
                  <td>Daniel</td>
                  <td>Abel</td>
                  <td>2023-01-01</td>
                </tr>
                <tr>
                  <td>Room 2</td>
                  <td>Theresa</td>
                  <td>Martina</td>
                  <td>2023-01-02</td>
                </tr>
                <tr>
                  <td>Room 3</td>
                  <td>Matthew</td>
                  <td>Oboh</td>
                  <td>2023-01-03</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Modal */}
          {isModalOpen && (
            <div className="modal" id="createTaskModal">
              <div className="modal-content">
                <h2>Create New Task</h2>
                <div className="center-inputs">
                  <input className="type-pholder" type="text" placeholder="Name" />
                  <select>
                    <option value="Select Cleaner">Select Cleaner</option>
                    <option value="Ijelle">Ijelle Rose</option>
                    <option value="Thomas Erica">Thomas Erica</option>
                  </select>
                  <select>
                    <option value="Sarah Stone">Select Supervisor</option>
                    <option value="Micheal Smith">Micheal Smith</option>
                    <option value="Thomas Erica">Thomas Erica</option>
                    {/* Add more supervisor options as needed */}
                  </select>
                </div>
                <div className="center-btns">
                  <button className="cancel-button" onClick={closeTaskModal}>
                    Cancel
                  </button>
                  <button className="upload-button" onClick={uploadTask}>
                    Upload
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
