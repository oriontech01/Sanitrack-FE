import { useState } from "react"
import usePermission from "../../Hooks/usePermission";
import { useNavigate } from "react-router-dom";

const AddPermission = () => { 
    const [permissionName , setPermissionName] = useState('')
    const navigate = useNavigate()
    const {addPermission, errorResponse} = usePermission()

    const handleSubmit = async (event) => {
        event.preventDefault();
        await addPermission(permissionName)   
        // navigate("/home/permission")
    };
    return(
        <div className="add-user-container">
            <div className="add-user-header">
                <h2>Add Permission</h2>
            </div>
            <form >
                <label>
                    Permission Name:
                    <input
                        type="text"
                        name="permissionName"
                        onChange={(event) => setPermissionName(event.target.value)}
                    />
                </label>

                <button onClick={handleSubmit} disabled={permissionName==='' || permissionName.length <= 5} style={{marginTop: "12px"}} >Submit</button>
            </form>
            {errorResponse && <p style={{ color: 'red' }}>{errorResponse}</p>}
        </div>
    )
}

export default AddPermission