import { useNavigate } from "react-router-dom"
import usePermission from "../../Hooks/usePermission"
import { useEffect } from "react"
import PermissionTable from "../../components/PermissionTable/PermissionTable"

const Permissions = () => { 
  const {allPermissions, getPermissions} = usePermission()
  const navigate = useNavigate()

  const handleCreateNavigate = () => { 
    navigate("/home/permission/add")
  } 
  const handleAssignNavigate = () => { 
      navigate("/home/permission/assign")
  }

  const handlePermissionDelete = async (permissionId) => { 

  }
  useEffect(() => { 
    const fetchData = async () => { 
      await getPermissions()
    }
    fetchData()
  }, [])
    return(
        <div className="tab-display">
        <div className="center-me">
          <div className="container">
            <div className="task-section">
              <h2>All Permissions</h2>
              <button id="createTaskBtn" onClick={handleCreateNavigate}>
                Create New Permission
              </button>
              <button id="createTaskBtn" onClick={handleAssignNavigate}>
                Assign Permission
              </button>
            </div>
  
            <PermissionTable permissions={allPermissions} showCheckBox={false} showButton={false} showRevoke={false} roleId={0}></PermissionTable>
  
          </div>
        </div>
      </div>
    )
}

export default Permissions 