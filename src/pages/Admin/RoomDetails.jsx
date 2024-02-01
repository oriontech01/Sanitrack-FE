import { useParams } from "react-router-dom"
import React, { useState, useEffect } from 'react';
import useRoom from "../../Hooks/useRoom";
import useLocation from "../../Hooks/useLocation";
import '../../styles/AddRoom.scss'
import { useNavigate } from "react-router-dom";
const RoomDetails = () => {
    const { roomId } = useParams()
    const { getRoomById, allRoomsById, updateRoomDetail, responseMessage } = useRoom()
    const {getLocation, allLocations} = useLocation()

    const navigate = useNavigate()

    const [selectedLocation, setSelectedLocation] = useState("");
    const [formData, setFormData] = useState({
        roomId: '',
        roomName: '',
        locationId: '',
        details: [{ name: '' }],
    });
    useEffect(() => {
        getRoomById(roomId)  
    }, [roomId]);

    useEffect(() => { 
        const fetchData = async() =>{await getLocation()}
        fetchData()
        setSelectedLocation(allLocations[0]?._id)
    }, [])

    useEffect(() => {
        // This effect runs when allRoomsById is updated
        if (Object.keys(allRoomsById).length > 0) {
            const detailsWithNames = allRoomsById.detail.detail.map(detail => ({ name: detail.name }));
            setFormData({
                roomId: roomId,
                roomName: allRoomsById.roomName || '',
                locationId: selectedLocation || '',
                details: detailsWithNames || [],
            });
        }
    }, [allRoomsById]);


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

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const newDetails = [...formData.details];
        newDetails[index][name] = value;
        setFormData({
            ...formData,
            details: newDetails,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formData)
        // await updateRoomDetail(formData)
        // alert(responseMessage)
        // navigate("/home/room")
    }

    return (
        <div className="add-user-container">
            <div className="add-user-header">
                <h2>Edit Room</h2>
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

                <label>Location:</label>
                <select
                    value={selectedLocation}
                    onChange={(e) => {
                        
                        setSelectedLocation(e.target.value);
                        console.log(`clicked change => ${selectedLocation}`)
                    }}
                    
                >
                    {allLocations ? (
                    allLocations.map((location) => (
                        <option key={location._id} value={location._id}>
                        {location._id} {location.state}, {location.country}
                    </option>
                    ))
                    
                    ): (
                    <p>Please Add Locations. </p>
                    )}
                </select>

                <div className="details-container">
                    <h4>Details:</h4>
                    {formData.details && formData.details.map((detail, index) => (
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

                            <button type="button" onClick={() => handleRemoveDetail(index)}>
                                Delete Detail
                            </button>

                        </div>
                    ))}
                    <button type="button" onClick={handleAddDetail} style={{ marginTop: "12px" }}>
                        Add Detail
                    </button>
                </div>


            </form>
            <button onClick={handleSubmit} style={{ marginTop: "12px" }} disabled={formData.details.some(item => item.name === '')}>Save Changes</button>
        </div>
    );
}
export default RoomDetails