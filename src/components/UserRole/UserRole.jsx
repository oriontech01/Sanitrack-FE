import { chunkArray } from "../../utils/chunkArray";
import useRole from "../../Hooks/useRoles";
import { useEffect, useState } from "react";
const UserRoleTable = ({allRoles, showCheckBox , showButton, staffId, showRevoke}) => { 

    const chunkedPermissions = chunkArray(allRoles, 5);
    const {getStaffRoles, staffRoles} = useRole()

    const [checkedPermissions, setCheckedPermissions] = useState([]);

    useEffect(() => { 
        const fetchData = async () => { await getStaffRoles(staffId)}
        fetchData()
    }, [])

    const handleCheckAll = () => { 
        // console.log(`checkedPermissions => ${checkedPermissions}`)
        // console.log(`all roles => ${JSON.stringify(allRoles)}`)

        console.log(`checked Permission length => ${checkedPermissions.length} allroles => ${allRoles.length}`)
        if (checkedPermissions.length === allRoles.length) {
            // If all permissions are already checked, uncheck all
            setCheckedPermissions([]);
        } else {
            // Otherwise, check all permissions
            setCheckedPermissions(allRoles.map(role => role._id));
        }
    }

    return(
        <>
     {showCheckBox ? (
            <div className='checkAll'>
                <input type='checkbox' onChange={handleCheckAll} checked={checkedPermissions.length === allRoles.length}></input>Check ALL
            </div>
        ): (
            <div></div>
        )}
    <div className="permission-tables-container">
    {allRoles ? (
  <>
    {chunkedPermissions.map((chunk, index) => (
      <div key={index}>
        <h2>Table {index + 1}</h2>
        <table>
          <thead>
            <tr>
              <th>Role Name</th>
            </tr>
          </thead>
          <tbody>
            {chunk.map((role, innerIndex) => (
              <tr key={innerIndex}>
                {showCheckBox ? (
                  <td className='checkbox-container'>
                    <input
                      type='checkBox'
                      checked={checkedPermissions.includes(role._id)}
               
                    />
                    {role.role_name}
                  </td>
                ) : (
                  <td>{role.role_name}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ))}
  </>
) : (
  <p>No permissions available.</p>
)}

         
         
       </div>
       {/* {showButton ? (
            <button style={{marginTop: "12px"}} onClick={(e) => {assignPermissions(e)}} disabled={roleId == 'Select Role' || checkedPermissions.length < 1}>Assign</button>
         ): (
            <></>
         )}

        {showRevoke ? (
            <button style={{marginTop: "12px"}} onClick={(e) => {revokePermissions(e)}} disabled={roleId == 'Select Role' || checkedPermissions.length < 1}>Revoke Permission</button>
         ): (
            <></>
         )} */}
    </>
    )
}
export default UserRoleTable