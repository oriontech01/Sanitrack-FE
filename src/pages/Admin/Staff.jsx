import { useEffect, useState } from "react";
import "../../styles/Tasks.scss";
import { useNavigate } from "react-router-dom";
import useStaff from "../../Hooks/useStaff";
import StaffTable from "../../components/StaffTable/StaffTable";

const Staff = () => {
  const [flag, setFlag] = useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100; // Change this number based on your preference
  const navigate = useNavigate();
  const { getAllStaffs, allStaffs, fireStaff, restoreStaff } = useStaff();

  useEffect(() => {
    getAllStaffs(currentPage, itemsPerPage);
  }, [flag]); // Dependency array is empty to fetch staffs only on component mount

  const handleNavigate = () => {
    navigate("/home/add-user");
  };

  const handleFire = async (staffId) => { 
    console.log("fire")
    await fireStaff(staffId)
    setFlag("INACTIVE")
  }

  const handleRestore = async (staffId) => {
    await restoreStaff(staffId)
    setFlag("ACTIVE")
  }


  // Before rendering, check if allStaffs is defined and has length
  const staffList = allStaffs && allStaffs.map((staff) => (
    <tr key={staff._id}>

      <td>{staff.username?.charAt(0).toUpperCase() + staff.username?.slice(1)}</td>
      <td>{staff.role?.charAt(0).toUpperCase() + staff.role?.slice(1)}</td>
      <td>{staff.flag}</td>
      <td>
        

        <button className="view-btn">View Role(s)</button>
        {staff.flag == "INACTIVE" ? 
          (
            <button className='view-btn' onClick={() => handleRestore(staff._id)}>Restore</button>
          )
          : 
          (<button className='delete-btn' onClick={() => handleFire(staff._id)}>Fire</button>)
        }
      </td>
    </tr>
  ));

  console.log(allStaffs);

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
