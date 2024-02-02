import { useEffect, useState } from "react"
import useRole from "../../Hooks/useRole"
import { useNavigate } from "react-router-dom"
const StaffRoles = () => { 
    const navigate = useNavigate()
    const {getRoleForStaff, roleForStaff} = useRole()
    const [userRoles, setUserRoles] = useState([])


    useEffect(() => { 
        const fetchData = async() => { await getRoleForStaff()}
        fetchData()
    },[])
    useEffect(() => { 
        const uniqueUserRoles = []
        roleForStaff.forEach(userRole => { 
            const existingUser = uniqueUserRoles.find(u => u._id === userRole._id);

            if (!existingUser) {
                // If user doesn't exist, add a new entry with an array for role_name
                uniqueUserRoles.push({ ...userRole, role_name: [userRole.role_name] });
              } else {
                // If user already exists, push the role_name to the array
                existingUser.role_name.push(userRole.role_name);
              }
        })
        setUserRoles(uniqueUserRoles)

    },[roleForStaff])

    const handleRoleRevoke = (staffId) => {
        navigate(`/home/role/staff/revoke/${staffId}`)
      }

    const handleViewPermissions = (e) => { 
      e.preventDefault()
      navigate("/home/role")
    }
    return(
        <div className="tab-display">
          <div className="center-me">
            <div className="container">
                <div className="task-section">
                    <h2>Staff Roles</h2>
                </div>
            <div className="table-section">
                <table id="taskTable">
                  <thead>
                    <tr>
                      <th>Staff Name</th>
                      <th>Role Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userRoles ? (
                      userRoles.map((item) => (
                        <tr key={item._id}>
                          <td>{item.username}</td>
                          <td>{item.role_name.join(', ')}</td>
                          <td>
                            <div className='btn-group'>
                              <button className='view-btn' onClick={(e) => {handleViewPermissions(e)}}>View Permissions</button>
                              <button className='delete-btn' onClick={() => {handleRoleRevoke(item._id)}}>Revoke</button>
                            </div>
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
            </div>
      
        </div>
        </div>
    )
}

export default StaffRoles