import "../styles/AddTask.scss"
import useTask from "../Hooks/useTask"
import { useEffect, useState } from "react"

const AddTask = () => {
    const { getUnAssignedRooms, getAllCleaners, getAllInspectors, addTask,  unAssignedRooms,allCleaners, allInspectors } = useTask()
    const [selectedRoom, setSelectedRoom] = useState('')
    const [selectedCleaner, setSelectedCleaner] = useState('')
    const [selectedInspector, setSelectedInspector] = useState('')
    
    const handleRoomChange = (event) => {
        setSelectedRoom(event.target.value)
    }
    const handleCleanerChange = (event) => {setSelectedCleaner(event.target.value)}
    const handleInspectorChange = (event) => {setSelectedInspector(event.target.value)}
  

    const handleUpload = async() => { 
        console.log(selectedRoom)
        console.log(selectedCleaner)
        console.log(selectedInspector)
        await addTask(selectedRoom, selectedCleaner, selectedInspector)
    }
    useEffect(() => {
        const fetchRooms = async () => { await getUnAssignedRooms() }
        fetchRooms()

        const fetchCleaners = async () => { await getAllCleaners() }
        fetchCleaners()

        const fetchInspectors = async () => { await getAllInspectors() }
        fetchInspectors()
    }, [])
    return (
        <div className="add-task-container">
            <div className="add-user-header">
                <h2>Add Task</h2>
            </div>
            <div className="add-task-sub-container">
                <h2>Unassigned Rooms:</h2>
                <div className="unassigned-rooms-container">
                    <div className="unassigned-rooms">
                        {unAssignedRooms.map((room) => (
                            <div className="unassigned-rooms-result">
                                <input type="radio" checked={selectedRoom === room._id} value={room._id} onChange={(e) => { handleRoomChange(e) }} />
                                <p>{room.roomName}</p>
                            </div>
                        ))}

                    </div>

                </div>

                <h2>Cleaners:</h2>
                <div className="unassigned-rooms-container">
                    <div className="unassigned-rooms">
                        {allCleaners.map((cleaner) => (
                            <div className="unassigned-rooms-result">
                                <input type="radio" checked={selectedCleaner === cleaner._id} value={cleaner._id} onChange={(e) => { handleCleanerChange(e) }} />
                                <p>{cleaner.username}</p>
                            </div>
                        ))}


                    </div>

                </div>

                <h2>Inspectors</h2>
                <div className="unassigned-rooms-container">
                    <div className="unassigned-rooms">
                        {allInspectors.map((inspector) => (
                            <div className="unassigned-rooms-result">
                                <input type="radio" checked={selectedInspector === inspector._id} value={inspector._id} onChange={(e) => { handleInspectorChange(e) }}/>
                                <p>{inspector.username}</p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
            <button disabled = {selectedCleaner == '' || selectedInspector == '' || selectedRoom == ''} onClick={handleUpload}>Upload</button>

        </div>
    )
}
export default AddTask