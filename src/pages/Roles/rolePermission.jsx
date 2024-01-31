import { useParams } from "react-router-dom"
import usePermission from "../../Hooks/usePermission"
import { useState, useEffect } from "react"
import PermissionTable from "../../components/PermissionTable/PermissionTable"

const RolePermissions = () => { 
    const {roleId} = useParams()
    const {getPermissionByRole, rolePermissions} = usePermission()

    useEffect(() => { 
        const fetchPermission = async () => { 
            await getPermissionByRole(roleId)
        }
        fetchPermission()
    }, [])

    return(
        <div>
      {rolePermissions !== null && (
        <div>
          {typeof rolePermissions === 'string' ? (
            <p>{rolePermissions}</p>
          ) : (
            <PermissionTable permissions={rolePermissions} showButton={false} showRevoke={true} showCheckBox={true} roleId={roleId}></PermissionTable>
          )}
        </div>
      )}
    </div>
    )
}
export default RolePermissions