import { useParams } from "react-router-dom"
import usePermission from "../../Hooks/usePermission"
import { useState, useEffect } from "react"

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
            <ul>
              {rolePermissions.map((permission, index) => (
                <li key={index}>{permission._id} {permission.permission_name}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
    )
}
export default RolePermissions