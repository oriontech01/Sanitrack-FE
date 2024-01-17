import React, { useEffect, useState } from "react";
import "../styles/Tasks.scss"; // Import your CSS file if not already done
import { useNavigate } from 'react-router-dom';
import useTask from "../Hooks/useTask";
const Tasks = () => {
  const {getAllTasks, allTasks, getStaffById} = useTask()

  const navigate = useNavigate()
  const handleNavigate = () => {
    navigate('/home/add-task')
  }

  useEffect(() => { 
    // getAllTasks()
  },[])


  return (
    <div className="tab-display">
      <div className="center-me">
        <div className="container">
          <div className="task-section">
            <h2> Tasks</h2>
            <button id="createTaskBtn" onClick={handleNavigate}>
              Create New Task
            </button>
          </div>

          <div className="table-section">
            <table id="taskTable">
              <thead>
                <tr>
                  <th>Room name</th>
                  <th>Assigned Supervisor</th>
                  <th>Assigned Cleaner </th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {/* Sample data for demonstration purposes */}
                <tr>
                  <td>Room 1</td>
                  <td>Daniel</td>
                  <td>Abel</td>
                  <td>DONE</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Tasks;
