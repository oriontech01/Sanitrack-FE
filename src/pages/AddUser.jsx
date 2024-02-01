import { useState, useEffect } from 'react'
import '../styles/AddUser.scss'
import useStaff from '../Hooks/useStaff'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

const AddUser = () => { 
    const {t} = useTranslation()
    const navigate = useNavigate()

    const [username, setUserName] = useState()
    const [password, setPassword] = useState()
    const [role, setRole] = useState('')

    const {addStaff, responseMessage} = useStaff()

    const handleUpload = async () => { 
        await addStaff(username, password, role)
        navigate('/home/user')
    }
    return(
        <>
            <div className="add-user-container">
                <div className="add-user-header">
                    <h2>{t('Add User')}</h2>
                </div>
                <div className="add-user-form">
                    <form>
                        <div className="form-details">
                            <label>{t('Name')}:</label>
                            <input placeholder="user name" onChange={(e) => {setUserName(e.target.value)}}></input>
                        </div>

                        <div className="form-details">
                            <label>{t('Password')}:</label>
                            <input placeholder="user default password" onChange={(e) => {setPassword(e.target.value)}}></input>
                        </div>

                        <div className="form-details">
                            <label>{t('Role')}:</label>
                            <select value={role} onChange={(e) => {setRole(e.target.value)}}>
                                <option value="">{t('Select Role')}</option>
                                <option value="cleaner">{t('Cleaner')}</option>
                                <option value="inspector">{t('Inspector')}</option>
                            </select>
                        </div>
                        
                       
                    </form>
                    <button onClick={handleUpload} disabled = {role == '' ? true : false}>{t('Create')}</button>
                </div>

            </div>
        </>
    )
}

export default AddUser 