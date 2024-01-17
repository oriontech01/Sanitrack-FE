import { useParams } from "react-router-dom"
import React, { useState, useEffect } from 'react';
import useRoom from "../Hooks/useRoom";
import '../styles/AddRoom.scss'
import { useNavigate } from "react-router-dom";
const RoomDetails = () => {
    const { roomId } = useParams()
    const { getRoomById, allRoomsById, updateRoomDetail, responseMessage } = useRoom()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        roomId: '',
        roomName: '',
        location: '',
        details: [{ name: '' }],
    });
    useEffect(() => {
        getRoomById(roomId)
    }, [roomId]);

    useEffect(() => {
        // This effect runs when allRoomsById is updated
        if (Object.keys(allRoomsById).length > 0) {
            const detailsWithNames = allRoomsById.detail.detail.map(detail => ({ name: detail.name }));
            setFormData({
                roomId: roomId,
                roomName: allRoomsById.roomName || '',
                location: allRoomsById.location || '',
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
        // console.log(formData)
        await updateRoomDetail(formData)
        alert(responseMessage)
        navigate("/home/room")
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

                <label>
                    Location:
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={(event) => setFormData({ ...formData, location: event.target.value })}
                    />
                </label>

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