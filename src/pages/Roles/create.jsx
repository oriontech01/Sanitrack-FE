import { useState } from "react"
import useRole from "../../Hooks/useRole";

const CreateRole = () => {
    const [roleName, setRoleName] = useState('')

    const {addRole} = useRole()

    const handleSubmit = async (event) => {
        event.preventDefault();
        await addRole(roleName)    
    };
    return (
        <div className="add-user-container">
            <div className="add-user-header">
                <h2>Add Role</h2>
            </div>
            <form >
                <label>
                    Role Name:
                    <input
                        type="text"
                        name="roleName"
                        onChange={(event) => setRoleName(event.target.value)}
                    />
                </label>

                <button onClick={handleSubmit} disabled={roleName==='' || roleName.length <= 2} style={{marginTop: "12px"}} >Submit</button>
            </form>
        </div>
    )
}

export default CreateRole