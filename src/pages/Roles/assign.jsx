import { useEffect, useState } from "react";
import useRole from "../../Hooks/useRole";
import useStaff from "../../Hooks/useStaff";
const AssignRole = () => {
    const {getRoles, roles, staffRoles, getStaffRoles, assignUserRole} = useRole()
    const {getStaffByUserName, staffByName} = useStaff()

    const [staffName, setStaffName] = useState()
    const [selectedRoles, setSelectedRoles] = useState([]);

    const handleSearch = async (e) => { 
        e.preventDefault()
        // make the request to get the staff by username
        await getStaffByUserName(staffName)
    }

    const assignRole = async (e) => { 
        e.preventDefault()
        console.log(selectedRoles)
        const assignedRolesData = selectedRoles.map((roleId) => ({
            user_id: staffByName._id,
            role_id: roleId,
            user_name: staffByName.username,
            role_name: roles.find((role) => role._id == roleId)?.role_name
        }));

        await assignUserRole(assignedRolesData)
    }
        
    
    useEffect(() => { 
        const fetchData = async ()=> {
            await getRoles()
            await getStaffRoles(staffByName._id)
        }
        if (staffByName?._id?.length > 0 ) {
            fetchData()
        }
    },[staffByName])

    useEffect(() => { 
        if (staffRoles && staffRoles.length > 0) {
            const initialRoles = staffRoles.map((role) => role.role_id);
            setSelectedRoles(initialRoles);
        }
    }, [staffRoles])


    return(
        <>
            <div className="add-user-container">
            <div className="add-user-header">
                <h2>Assign Role</h2>
            </div>
            <form >
                <label>
                    Staff Name:
                    <input
                        type="text"
                        name="staffName"
                        placeholder="search for staff by username"
                        onChange={(e) => setStaffName(e.target.value)}
                    />
                </label>
                <button onClick={(e) => { handleSearch(e) }}>Search</button>
                <div className="table-section">
                <table id="taskTable">
                  <thead>
                    <tr>
                      <th>Role Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {staffByName ? (
                      roles.map((item) => (
                        <tr key={item._id}>   
                          <td>
                            <input 
                            type="checkbox" 
                            checked={selectedRoles.includes(item._id)} 
                            onChange={() => {
                                setSelectedRoles((prevRoles) => {
                                  const roleId = item._id;
                            
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
                <button style={{marginTop: "12px"}} onClick={(e) => {assignRole(e)}}>Assign</button>
            </form>
        </div>
        </>
        
    )
}

export default AssignRole