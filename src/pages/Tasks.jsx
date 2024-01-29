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

  const handleTaskDelete = async (taskId) => {
    await deleteTask(taskId);
    window.location.reload();
  };
  useEffect(() => {
    getAllTasks();
    console.log("Tasks", allTasks);
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
                  <tr key={task._id}>
                    <td>{task.assigned_room.roomName}</td>
                    <td>{`${task.assigned_inspector.username
                      .charAt(0)
                      .toUpperCase()}${task.assigned_inspector.username.slice(
                      1
                    )}`}</td>
                    <td>{`${task.assigned_cleaner.username
                      .charAt(0)
                      .toUpperCase()}${task.assigned_cleaner.username.slice(
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
                            // Ensure you update this to use task._id
                            handleViewDetails(task._id);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => {
                            handleTaskDelete(task._id);
                          }}
                        >
                          Delete
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