import React, { useEffect, useState } from "react";
import "../styles/Tasks.scss"; // Import your CSS file if not already done
import { useNavigate } from "react-router-dom";
import useTask from "../Hooks/useTask";
import { useTranslation } from 'react-i18next';


const Tasks = () => {
  const {t} = useTranslation()
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
    console.log("Tasks", allTasks);
  }, []);

  return (
    <div className="tab-display">
      <div className="center-me">
        <div className="container">
          <div className="task-section">
            <h2> {t('Tasks')}</h2>
            <button id="createTaskBtn" onClick={handleNavigate}>
              {t('Create New Task')}
            </button>
          </div>

          <div className="table-section">
            <table id="taskTable">
              <thead>
                <tr>
                  <th>{t('Room name')}</th>
                  <th>{t('Assigned Supervisor')}</th>
                  <th>{t('Assigned Cleaner')} </th>
                  <th>{t('Status')}</th>
                  <th>{t('Action')}</th>
                </tr>
              </thead>
              <tbody>
                {/* Sample data for demonstration purposes */}
                {allTasks.map((task) => (
                  <tr key={task._id}>
                    <td>{task.roomName.roomName}</td>
                    <td>{`${task.cleanerUsername.username
                      .charAt(0)
                      .toUpperCase()}${task.cleanerUsername.username.slice(
                      1
                    )}`}</td>
                    <td>{`${task.inspectorUsername.username
                      .charAt(0)
                      .toUpperCase()}${task.inspectorUsername.username.slice(
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
                            // handleViewDetails(task._id);
                            handleTaskEdit(task.taskId);
                          }}
                        >
                          {t('Edit')} 
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => {
                            handleTaskDelete(task._id);
                          }}
                        >
                          {t('Delete')}
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