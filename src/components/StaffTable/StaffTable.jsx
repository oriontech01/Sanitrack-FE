import { chunkArray } from "../../utils/chunkArray"
import '../PermissionTable/PermissionTable.scss'
import { useNavigate } from "react-router-dom"
import useStaff from "../../Hooks/useStaff";
import { useState } from "react";

const StaffTable = ({allStaffs}) => { 

  const [flag, setFlag] = useState("")
  const { fireStaff, restoreStaff } = useStaff();
  const navigate = useNavigate()

  const handleViewRole = (staffId) => { 
    navigate(`/home/user/role/${staffId}`)
  }

  const handleFire = async (staffId) => { 
    console.log("fire")
    await fireStaff(staffId)
    setFlag("INACTIVE")
  }

  const handleRestore = async (staffId) => {
    await restoreStaff(staffId)
    setFlag("ACTIVE")
  }
    return(
        <div className="permission-tables-container">
    {allStaffs ? (
  <>
      <div>
        <table>
          <thead>
            <tr>
              <th>Staff Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Action </th>
            </tr>
          </thead>
          <tbody>
            {allStaffs.map((staffs, innerIndex) => (
              <tr key={staffs._id}>
                <td>{staffs.username}</td>
                <td>{staffs.email}</td>
                <td>{staffs.phone_number}</td>
                <td>
                          
                    {staffs.flag == "INACTIVE" ? 
                    (
                        <button className='view-btn' onClick={() => handleRestore(staffs._id)}>Restore</button>
                    )
                    : 
                    (<button className='delete-btn' onClick={() => handleFire(staffs._id)}>Fire</button>)}
                    {/* <button className='view-btn' onClick={() => handleViewRole(staffs._id)}>View Role</button> */}
                          
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

  </>
) : (
  <p>No permissions available.</p>
)}

         
         
       </div>
    )
}
export default StaffTable