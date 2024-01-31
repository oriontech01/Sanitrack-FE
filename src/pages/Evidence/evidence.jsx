import { useEffect } from "react";
import useEvidence from "../../Hooks/useEvidence";
import { useNavigate } from "react-router-dom";

const Evidence = () => {
    const navigate = useNavigate()
    const { getRoom, allRooms } = useEvidence();

    const handleViewImages = (taskId) =>{
        navigate(`/home/evidence/view/${taskId}`)
        console.log(taskId)
    }
    useEffect(() => {
        const fetchData = async () => {
        await getRoom();
        };

        fetchData();
    }, [getRoom]);
  return (
    <>
      <div className="tab-display">
        <div className="center-me">
          <div className="container">
            <div className="table-section">
              <table id="taskTable">
                <thead>
                  <tr>
                    <th>Room name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allRooms ? (
                    allRooms.map((item) => (
                      <tr key={item._id}>
                        <td>{item.roomName}</td>
                        <td>
                          <div className="btn-group">
                            <button
                              className="view-btn"
                              onClick={() => {
                                handleViewImages(item.task_id);
                              }}
                            >
                              View Images
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3">No rooms available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Evidence;
