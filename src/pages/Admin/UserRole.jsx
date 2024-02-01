import { useParams } from "react-router-dom"
import useRole from "../../Hooks/useRoles"
import { useEffect } from "react"
import PermissionTable from "../../components/PermissionTable/PermissionTable"
import UserRoleTable from "../../components/UserRole/UserRole"

const UserRole = () => { 
    const {staffId} = useParams()
    const {getRoles, roles} = useRole()

    useEffect(() => { 
        const fetchData = async() => {await getRoles()}
        fetchData()
    },[])
    return(
        <UserRoleTable allRoles={roles} showCheckBox={true} showButton={true} showRevoke={false} staffId={staffId}></UserRoleTable>
    )
}
export default UserRole