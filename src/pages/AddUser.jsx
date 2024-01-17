import { useState } from 'react'
import '../styles/AddUser.scss'
import useStaff from '../Hooks/useStaff'

const AddUser = () => { 
    const [username, setUserName] = useState()
    const [password, setPassword] = useState()
    const [role, setRole] = useState('')

    const {addStaff, responseMessage} = useStaff()

    const handleUpload = async () => { 
        console.log(role)
        await addStaff(username, password, role)
        alert(responseMessage)

    }
    return(
        <>
            <div className="add-user-container">
                <div className="add-user-header">
                    <h2>Add User</h2>
                </div>
                <div className="add-user-form">
                    <form>
                        <div className="form-details">
                            <label>Name:</label>
                            <input placeholder="user name" onChange={(e) => {setUserName(e.target.value)}}></input>
                        </div>

                        <div className="form-details">
                            <label>Password:</label>
                            <input placeholder="user default password" onChange={(e) => {setPassword(e.target.value)}}></input>
                        </div>

                        <div className="form-details">
                            <label>Role:</label>
                            <select value={role} onChange={(e) => {setRole(e.target.value)}}>
                                <option value="">Select Role</option>
                                <option value="cleaner">Cleaner</option>
                                <option value="inspector">Inspector</option>
                            </select>
                        </div>
                        
                       
                    </form>
                    <button onClick={handleUpload} disabled = {role == '' ? true : false}>Upload</button>
                </div>

            </div>
        </>
    )
}

export default AddUser 