import React, { useEffect, useState } from "react";
import "../styles/Tasks.scss"; // Import your CSS file if not already done
import { useNavigate } from "react-router-dom";
import useTask from "../Hooks/useTask";
const Tasks = () => {
  const { getAllTasks, allTasks, deleteTask } = useTask();

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/home/add-task");
  };

  console.log("This is all the task. Checking for the roomId", allTasks)
  const handleTaskDelete = async (taskId) => {
    await deleteTask(taskId);
    window.location.reload();
  };

  const handleTaskEdit = async (taskId) => {
    navigate(`/home/edit-task/${taskId}`)
  }
  useEffect(() => {
    getAllTasks();
  }, []);

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
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Sample data for demonstration purposes */}
                {allTasks.map((task) => (
                  <tr key={task.taskId}>
                    <td>{task.roomName.roomName}</td>
                    <td>{`${task.inspectorUsername.username
                      .charAt(0)
                      .toUpperCase()}${task.inspectorUsername.username.slice(
                      1
                    )}`}</td>
                    <td>{`${task.cleanerUsername.username
                      .charAt(0)
                      .toUpperCase()}${task.cleanerUsername.username.slice(
                      1
                    )}`}</td>
                    <td className={`status ${task.isSubmitted ? "done" : ""}`}>
                      {task.isSubmitted ? "Completed" : "Pending"}
                    </td>
                    <td>
                      <div className="btn-group">
                        <button
                          className="view-btn"
                          onClick={() => {
                            handleTaskEdit(task.taskId);
                          }}
                        >
                          Edit 
                        </button>
                        
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
