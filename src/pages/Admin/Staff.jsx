import { useEffect, useState } from "react";
import "../../styles/Tasks.scss";
import { useNavigate } from "react-router-dom";
import useStaff from "../../Hooks/useStaff";
import StaffTable from "../../components/StaffTable/StaffTable";

const Staff = () => {
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100; // Change this number based on your preference
  const navigate = useNavigate();
  const { getAllStaffs, allStaffs, fireStaff, restoreStaff } = useStaff();

  useEffect(() => {
    getAllStaffs(currentPage, itemsPerPage);
  }, []); // Dependency array is empty to fetch staffs only on component mount

  const handleNavigate = () => {
    navigate("/home/add-user");
  };

 


  // Before rendering, check if allStaffs is defined and has length

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

          <StaffTable allStaffs={allStaffs}></StaffTable>
        </div>
      </div>
    </div>
  );
};

export default Staff;
