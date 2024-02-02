import { useParams } from "react-router-dom"
import useRole from "../../Hooks/useRole"
import { useEffect, useState } from "react"

const RevokeRole = () => { 
    const {staffId} = useParams()
    const {staffRoles, getStaffRoles, revokeUserRole} = useRole()
    const [selectedRoles, setSelectedRoles] = useState([])

    useEffect(() => {
        const fetchData = async() => {
            await getStaffRoles(staffId)
        }
        fetchData()
    }, [])

    useEffect(() => { 
        if (staffRoles && staffRoles.length > 0) {
            const initialRoles = staffRoles.map((role) => role.role_id);
            setSelectedRoles(initialRoles);
        }
    }, [staffRoles])

    const revokeRole = async(e) => { 
        e.preventDefault()
        const dataToPass = {userId: staffId, roleIds: selectedRoles}
        await revokeUserRole(dataToPass)
        
    }
    return(
        <>
        <div className="add-user-container">
        <div className="add-user-header">
            <h2>Revoke Role</h2>
        </div>
        <form >
            <div className="table-section">
            <table id="taskTable">
              <thead>
                <tr>
                  <th>Role Name</th>
                </tr>
              </thead>
              <tbody>
                {staffRoles ? (
                  staffRoles.map((item) => (
                    <tr key={item._id}>   
                      <td>
                        <input 
                        type="checkbox" 
                        checked={selectedRoles.includes(item.role_id)} 
                        onChange={() => {
                            setSelectedRoles((prevRoles) => {
                              const roleId = item.role_id;
                        
                              if (prevRoles.includes(roleId)) {
                                // If role is already selected, remove it
                                return prevRoles.filter((prevRoleId) => prevRoleId !== roleId);
                              } else {
                                // If role is not selected, add it
                                return [...prevRoles, roleId];
                              }
                            });
                          }}
                        
                        ></input>{item.role_name}
                    </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No roles available</td>
                  </tr>
                )}


              </tbody>
            </table>
          </div>
            <button style={{marginTop: "12px"}} onClick={(e) => {revokeRole(e)}}>Revoke Role</button>
        </form>
    </div>
    </>
    )

}
export default RevokeRole