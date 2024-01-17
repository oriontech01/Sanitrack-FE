import { useState } from "react";
import '../styles/Tasks.scss'
import { useNavigate } from "react-router-dom";
const Staff = () => { 
    const navigate = useNavigate()
     
    const handleNavigate = () => { 
        navigate("/home/add-user")
    }
  
    return (
      <div className="tab-display">
        <div className="center-me">
          <div className="container">
            <div className="task-section">
              <h2>All Staffs</h2>
              <button id="createTaskBtn" onClick={handleNavigate}>
                Create New Staff
              </button>
            </div>
  
            <div className="table-section">
              <table id="taskTable">
                <thead>
                  <tr>
                    <th>Staff name</th>
                    <th>Role</th>
                    <th>Staff Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Sample data for demonstration purposes */}
                  <tr>
                
                    <td>Daniel</td>
                    <td>Cleaner</td>
                    <td>Active</td>       
                    <td>
                        <button>Fire</button>
                        <button>Opposite of Fire</button>
                    </td>
                
                  </tr>
                  <tr>
                
                    <td>Daniel</td>
                    <td>Cleaner</td>
                    <td>Active</td>
                    <td>
                        <button>Fire</button>
                        <button>Opposite of Fire</button>
                    </td>
                
                  </tr>
                </tbody>
              </table>
            </div>
  
          </div>
        </div>
      </div>
    );
}

export default Staff 