import { useEffect , useState} from "react"
import { useParams } from "react-router-dom"
import useTask from "../Hooks/useTask"
const TaskDetails = () => { 
    const {taskId} = useParams()

    const [selectedCleaner, setSelectedCleaner] = useState('')
    const [selectedInspector, setSelectedInspector] = useState('')

    const {getAllCleaners, getAllInspectors, getTaskById, updateTask,  allCleaners, allInspectors, singleTaskDetail} = useTask()
    useEffect(() => { 
        const fetchAllCleaners = async () => {await getAllCleaners()}
        const fetchAllInspectors = async () => {await getAllInspectors()}
        const fetchSingleTask = async() => {await getTaskById(taskId)}

        fetchAllCleaners()
        fetchAllInspectors()
        fetchSingleTask()

    }, [])

    const handleUpdate = async() => {
        await updateTask(taskId, selectedCleaner, selectedInspector, singleTaskDetail.assigned_room._id) 
    }
    console.log("All cleaners are", allCleaners)
    console.log("All Inspectors are", allInspectors)
    console.log("The single task details", singleTaskDetail)
    return(
        <div className="add-task-container">
            {/* <h2> Room: {singleTaskDetail.assigned_room.roomName}</h2> */}
            {/* contains all the cleaners */}
            <div className="unassigned-rooms-container">
                <h3>Cleaners:</h3>
                <div className="unassigned-rooms">
                    {allCleaners.map((cleaner) => (
                        <div className="unassigned-rooms-result">
                            <input type="radio" value={cleaner._id} checked = {selectedCleaner == cleaner._id} onChange={(e) => setSelectedCleaner(e.target.value)} />
                            <p>{cleaner.username}</p>
                        </div>
                    ))}


                </div>
            </div>

            <div className="unassigned-rooms-container">
                <h3>Inspectors:</h3>
                <div className="unassigned-rooms">
                    {allInspectors.map((inspector) => (
                        <div className="unassigned-rooms-result">
                            <input type="radio" value={inspector._id} checked = {selectedInspector == inspector._id} onChange={(e) => setSelectedInspector(e.target.value)}  />
                            <p>{inspector.username}</p>
                        </div>
                    ))}

                </div>

            </div>

            <button disabled = {selectedCleaner == '' || selectedInspector == '' || singleTaskDetail.isSubmitted == true} onClick={handleUpdate}>Update</button>
        </div>
    )
}
export default TaskDetails