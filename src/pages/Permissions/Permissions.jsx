const Permissions = () => { 
    return(
        <div className="tab-display">
        <div className="center-me">
          <div className="container">
            <div className="task-section">
              <h2>All Roles</h2>
              <button id="createTaskBtn" onClick={handleCreateNavigate}>
                Create New Permission
              </button>
              <button id="createTaskBtn" onClick={handleAssignNavigate}>
                Assign Permission
              </button>
            </div>
  
            <div className="table-section">
              <table id="taskTable">
                <thead>
                  <tr>
                    <th>Role Id</th>
                    <th>Role Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                {/* <tbody>
                  {roles ? (
                    roles.map((item) => (
                      <tr key={item._id}>
                        <td>{item._id}</td>
                        <td>{item.role_name}</td>
                        <td>
                          <div className='btn-group'>
                            <button className='view-btn' onClick={() => {handleViewPermissions(item._id)}}>View Permissions</button>
                            <button className='delete-btn' onClick={() => {handleRoomDelete(item._id)}}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3">No roles available</td>
                    </tr>
                  )}
  
                </tbody> */}
              </table>
            </div>
  
          </div>
        </div>
      </div>
    )
}

export default Permissions 