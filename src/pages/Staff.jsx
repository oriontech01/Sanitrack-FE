import { useEffect, useState } from "react";
import '../styles/Tasks.scss'
import { useNavigate } from "react-router-dom";
import useStaff from "../Hooks/useStaff"
import { useTranslation } from 'react-i18next';

const Staff = () => { 
    const {t} = useTranslation()
    const navigate = useNavigate()
    const {getAllStaffs, allStaffs, totalPages,  fireStaff, restoreStaff} = useStaff()
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 100; // Change this number based on your preference


    const [flag, setFlag] = useState("")

    const handleNavigate = () => { 
        navigate("/home/add-user")
    }

    // console.log("Basic",currentPage)

    // const handleNext = async () => {
    //   setCurrentPage((prevPage) => {
    //     const nextPage = prevPage + 1;
    //     if (nextPage <= totalPages) {
    //       getAllStaffs(nextPage, itemsPerPage);
    //     }
    //     return nextPage;
    //   });
    // };
    
    // const handlePrevious = async () => {
    //   if (currentPage > 1) {
    //     setCurrentPage((prevPage) => {
    //       console.log("Current page after previous", currentPage)
    //       const newPage = prevPage - 1;
    //       getAllStaffs(newPage, itemsPerPage);
    //       return newPage;
    //     });
    //   }
    // };
    

    const handleFire = async (staffId) => { 
      await fireStaff(staffId)
      setFlag("INACTIVE")
    }

    const handleRestore = async (staffId) => {
      await restoreStaff(staffId)
      setFlag("ACTIVE")
    }

    useEffect(() => { 
      getAllStaffs(currentPage, itemsPerPage)
    }, [flag])

    console.log(allStaffs)

    return (
      <div className="tab-display">
        <div className="center-me">
          <div className="container">
            <div className="task-section">
              <h2>{t('All Staffs')}</h2>
              <button id="createTaskBtn" onClick={handleNavigate}>
                {t('Create New Staff')}
              </button>
            </div>
  
            <div className="table-section">
              <table id="taskTable">
                <thead>
                  <tr>
                    <th>{t('Staff name')}</th>
                    <th>{t('Role')}</th>
                    <th>{t('Staff Status')}</th>
                    <th>{t('Action')}</th>
                  </tr>
                </thead>
                <tbody>
                  {allStaffs.map((staff) => (
                    <tr key={staff._id}>
                
                      <td>{`${staff.username?.charAt(0).toUpperCase()}${staff.username?.slice(1)}`}</td>
                      <td>{`${staff.role?.charAt(0).toUpperCase()}${staff.role?.slice(1)}`}</td>
                      <td>{staff.flag}</td>       
                      <td>
                          
                          {staff.flag == "INACTIVE" ? 
                            (
                              <button className='view-btn' onClick={() => handleRestore(staff._id)}>{t('Restore')}</button>
                            )
                            : 
                            (<button className='delete-btn' onClick={() => handleFire(staff._id)}>{t('Fire')}</button>)}
                          
                      </td>
            
                    </tr>
                  ))}
              
                </tbody>
              </table>
              {/* <div style={{marginTop: "2em", display:"flex", gap:"10px"}}>
                <button disabled={currentPage == 1} onClick={() => {handlePrevious()}}>Previous</button>
                <button disabled={currentPage == totalPages} onClick={() => handleNext()}>Next</button>
              </div> */}
              
            </div>
  
          </div>
        </div>
      </div>
    );
}

export default Staff 