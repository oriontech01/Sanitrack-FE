import { useEffect, useState } from "react";
import useRole from "../../Hooks/useRole";
import usePermission from "../../Hooks/usePermission";
import PermissionTable from "../../components/PermissionTable/PermissionTable";

const AssignPermission = () => {
  const { getRoles, roles } = useRole();
  const { getPermissions, allPermissions } = usePermission();
  const [selectedRoleId, setSelectedRoleId] = useState('Select Role');

  useEffect(() => {
    getRoles();
  }, [getRoles]);

  useEffect(() => {
    getPermissions();
  }, [allPermissions]);

  

  const handleRoleChange = (e) => {
    setSelectedRoleId(e.target.value);
  };


  return (
    <>
      <div className="add-user-container">
        <div className="add-user-header">
          <h2>Assign Permission</h2>
        </div>
        <form>
          <label>
            Select Role:
            <select onChange={(e) => handleRoleChange(e)} value={selectedRoleId}>
              {roles ? (
                roles.map((role) => (
                  <option value={role._id}>{role.role_name} </option>
                ))
              ) : (
                <p>No roles</p>
              )}
            </select>
          </label>
          {roles ? (
            <PermissionTable
              permissions={allPermissions}
              showCheckBox={true}
              showButton={true}
              showRevoke={false}
              roleId={selectedRoleId}
            ></PermissionTable>
          ) : (
            <p>No Permissions</p>
          )}
        </form>
      </div>
    </>
  );
};
export default AssignPermission;
