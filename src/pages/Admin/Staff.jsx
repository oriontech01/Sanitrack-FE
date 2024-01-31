import { useEffect } from "react";
import "../../styles/Tasks.scss";
import { useNavigate } from "react-router-dom";
import useStaff from "../../Hooks/useStaff";

const Staff = () => {
  const navigate = useNavigate();
  const { getAllStaffs, allStaffs } = useStaff();

  useEffect(() => {
    getAllStaffs();
  }, []); // Dependency array is empty to fetch staffs only on component mount

  const handleNavigate = () => {
    navigate("/home/add-user");
  };

  // Before rendering, check if allStaffs is defined and has length
  const staffList = allStaffs && allStaffs.map((staff) => (
    <tr key={staff._id}>
      <td>{staff.username.charAt(0).toUpperCase() + staff.username.slice(1)}</td>
      <td>{staff.role.charAt(0).toUpperCase() + staff.role.slice(1)}</td>
      <td>{staff.flag}</td>
      <td>
        <button>Fire</button>
        <button>Restore</button>
      </td>
    </tr>
  ));

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
                {staffList ? staffList : <tr><td colSpan="4">Loading staff data...</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Staff;
