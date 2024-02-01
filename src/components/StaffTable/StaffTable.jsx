import { chunkArray } from "../../utils/chunkArray"
import '../PermissionTable/PermissionTable.scss'
import { useNavigate } from "react-router-dom"
const StaffTable = ({allStaffs}) => { 
  const navigate = useNavigate()

  const handleViewRole = (staffId) => { 
    navigate(`/home/user/role/${staffId}`)
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