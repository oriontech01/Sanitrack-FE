import { useEffect, useState } from "react";
import '../styles/AddRoom.scss'
import useRoom from "../Hooks/useRoom";
import useLocation from "../Hooks/useLocation";

const AddRoom = () => {
    const {addRoom, responseMessage} = useRoom()
    const {getLocation, allLocations} = useLocation()
    const [formData, setFormData] = useState({
        roomName: '',
        location_id: '',
        details: [{ name: '' }],
    });

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const newDetails = [...formData.details];
        newDetails[index][name] = value;
        setFormData({
            ...formData,
            details: newDetails,
        });
    };

    const handleLocationChange = (event) => {
        event.persist();
        const selectedLocationId = event.target.value;
        setFormData({
            ...formData,
            location_id: selectedLocationId,
        });
    }

    const handleAddDetail = () => {
        setFormData({
            ...formData,
            details: [...formData.details, { name: '' }],
        });
    };

    const handleRemoveDetail = (index) => {
        const newDetails = [...formData.details];
        newDetails.splice(index, 1);
        setFormData({
            ...formData,
            details: newDetails,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Handle form submission, e.g., send data to the server
        console.log(formData);
        await addRoom(formData)
        // alert(responseMessage)
    };


    useEffect(() => { 
        const fetchData = async() =>{await getLocation()}

        fetchData()
    }, [getLocation])

    useEffect(() => {
        // console.log('formData.location_id:', formData.location_id);
    }, [formData.location_id])
    return (
        <div className="add-user-container">
            <div className="add-user-header">
                <h2>Add Room</h2>
            </div>
            <form >
                <label>
                    Room Name:
                    <input
                        type="text"
                        name="roomName"
                        value={formData.roomName}
                        onChange={(event) => setFormData({ ...formData, roomName: event.target.value })}
                    />
                </label>

                <label>
                    Location:
                    <select onChange={handleLocationChange} value={formData.location_id}>
                        {allLocations ? (
                            allLocations.map((location) => (
                                <option key={location._id} value={location._id}>{location.city} {location.state}, {location.country}.</option>
                            ))
                        ):(
                            <option>No Location Added</option>
                        )}
                    </select>
                </label>

                <div className="details-container">
                    <h4>Details:</h4>
                    {formData.details.map((detail, index) => (
                        <div key={index}>
                            <label>
                                Detail Name:
                                <input
                                    type="text"
                                    name="name"
                                    value={detail.name}
                                    onChange={(event) => handleInputChange(index, event)}
                                />
                            </label>
                            {index > 0 && (
                                <button type="button" onClick={() => handleRemoveDetail(index)}>
                                    Remove Detail
                                </button>
                            )}
                        </div>
                    ))}
                    <button type="button" onClick={handleAddDetail} style={{marginTop: "12px"}}>
                        Add Detail
                    </button>
                </div>

                <button onClick={handleSubmit} style={{marginTop: "12px"}} disabled = {formData.details.some(item => item.name === '') || formData.location_id == ''}>Submit</button>
            </form>
        </div>
    )
}

export default AddRoom