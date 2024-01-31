import "../../styles/AddTask.scss";
import useTask from "../../Hooks/useTask";
import { useEffect, useState } from "react";

const AddTask = () => {
  const { getUnAssignedRooms, getAllCleaners, getAllInspectors, addTask, unAssignedRooms, allCleaners, allInspectors } = useTask();
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedCleaner, setSelectedCleaner] = useState("");
  const [selectedInspector, setSelectedInspector] = useState("");

  useEffect(() => {
    getUnAssignedRooms();
    getAllCleaners();
    getAllInspectors();
  }, []);

  console.log("Unassigned Rooms",unAssignedRooms)
  return (
    <div className="add-task-container">
      <div className="add-task-header">
        <h1>Add Task</h1>
      </div>
      <div className="form-container">
        <section className="selection-group">
          <h2>Unassigned Rooms:</h2>
          <div className="options-container">
            {unAssignedRooms.map((room) => (
              <label key={room._id} className="option">
                <input
                  type="radio"
                  name="selectedRoom"
                  checked={selectedRoom === room._id}
                  value={room._id}
                  onChange={() => setSelectedRoom(room._id)}
                />
                {room.roomName}
              </label>
            ))}
          </div>
        </section>

        <section className="selection-group">
          <h2>Cleaners:</h2>
          <div className="options-container">
            {allCleaners.map((cleaner) => (
              <label key={cleaner._id} className="option">
                <input
                  type="radio"
                  name="selectedCleaner"
                  checked={selectedCleaner === cleaner._id}
                  value={cleaner._id}
                  onChange={() => setSelectedCleaner(cleaner._id)}
                />
                {cleaner.username}
              </label>
            ))}
          </div>
        </section>

        <section className="selection-group">
          <h2>Inspectors:</h2>
          <div className="options-container">
            {allInspectors.map((inspector) => (
              <label key={inspector._id} className="option">
                <input
                  type="radio"
                  name="selectedInspector"
                  checked={selectedInspector === inspector._id}
                  value={inspector._id}
                  onChange={() => setSelectedInspector(inspector._id)}
                />
                {inspector.username}
              </label>
            ))}
          </div>
        </section>

        <button
          className="upload-btn"
          disabled={!selectedRoom || !selectedCleaner || !selectedInspector}
          onClick={() => addTask(selectedRoom, selectedCleaner, selectedInspector)}
        >
          Upload Task
        </button>
      </div>
    </div>
  );
};
export default AddTask;