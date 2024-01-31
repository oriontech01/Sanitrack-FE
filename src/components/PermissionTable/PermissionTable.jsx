import './PermissionTable.scss'
import { useState } from 'react';
import usePermission from '../../Hooks/usePermission';

const PermissionTable = ({ permissions, showCheckBox , showButton, roleId, showRevoke}) => {

    const [checkedPermissions, setCheckedPermissions] = useState([]);
    const {assignPermission, revokePermission} = usePermission()

    // Function to spilt the array
    const chunkArray = (array, chunkSize) => {
        return Array.from(
        { length: Math.ceil(array.length / chunkSize) },
        (_, index) => {
            const start = index * chunkSize;
            const end = start + chunkSize;
            return array.slice(start, end);
        }
        );
    };

    const chunkedPermissions = chunkArray(permissions, 5);

    // Function to handle all check
    const handleCheckAll = () => { 
        if (checkedPermissions.length === permissions.length) {
            // If all permissions are already checked, uncheck all
            setCheckedPermissions([]);
        } else {
            // Otherwise, check all permissions
            setCheckedPermissions(permissions.map(permission => permission._id));
        }
        }

    const handleCheckBoxChange = (permissionId) => {
        // Toggle the checkbox for a specific permission
        setCheckedPermissions((prevChecked) => {
          if (prevChecked.includes(permissionId)) {
            return prevChecked.filter((id) => id !== permissionId);
          } else {
            return [...prevChecked, permissionId];
          }
        });
    }

    const assignPermissions = async (e) => { 
        e.preventDefault()
        console.log(roleId)
        const dataToPass = {
            role_id: roleId,
            permissions: checkedPermissions.map((permissionId) => {
              const selectedPermission = permissions.find((permission) => permission._id === permissionId);
              return {
                permission_id: permissionId,
                permission_name: selectedPermission ? selectedPermission.permission_name : '',
              };
            }),
        };
        await assignPermission(dataToPass)
    }

    const revokePermissions = async (e) => { 
        e.preventDefault()
        const dataToPass = {
            role_id: roleId,
            permissions: checkedPermissions.map((permissionId) => {
              const selectedPermission = permissions.find((permission) => permission._id === permissionId);
              return {
                permission_id: selectedPermission.permission_id ? selectedPermission.permission_id: '',
                permission_name: selectedPermission ? selectedPermission.permission_name : '',
              };
            }),
        };
        await revokePermission(dataToPass)
    }
  return (
    <>
     {showCheckBox ? (
            <div className='checkAll'>
                <input type='checkbox' onChange={handleCheckAll} checked={checkedPermissions.length == permissions.length} ></input>Check ALL
            </div>
        ): (
            <div></div>
        )}
    <div className="permission-tables-container">
    {permissions ? (
  <>
    {chunkedPermissions.map((chunk, index) => (
      <div key={index}>
        <h2>Table {index + 1}</h2>
        <table>
          <thead>
            <tr>
              <th>Permission Name</th>
            </tr>
          </thead>
          <tbody>
            {chunk.map((permission, innerIndex) => (
              <tr key={innerIndex}>
                {showCheckBox ? (
                  <td className='checkbox-container'>
                    <input
                      type='checkBox'
                      onChange={() => handleCheckBoxChange(permission._id)}
                      checked={checkedPermissions.includes(permission._id)}
                    />
                    {permission.permission_name}
                  </td>
                ) : (
                  <td>{permission.permission_name}</td>
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
       {showButton ? (
            <button style={{marginTop: "12px"}} onClick={(e) => {assignPermissions(e)}} disabled={roleId == 'Select Role' || checkedPermissions.length < 1}>Assign</button>
         ): (
            <></>
         )}

        {showRevoke ? (
            <button style={{marginTop: "12px"}} onClick={(e) => {revokePermissions(e)}} disabled={roleId == 'Select Role' || checkedPermissions.length < 1}>Revoke Permission</button>
         ): (
            <></>
         )}
    </>
    
  );
};
export default PermissionTable;
