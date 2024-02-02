import { useState, useEffect } from "react";
import '../../styles/AddRoom.scss';
import useRoom from "../../Hooks/useRoom";
import useLocation from "../../Hooks/useLocation";
const AddRoom = () => {
    const { addRoom, responseMessage } = useRoom();
    const {allLocations, getLocation} = useLocation();

    useEffect(() =>{
        const fetchLocationData = async () => {
            await getLocation()
        }
        fetchLocationData();
    }, [])

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
        // await addRoom(formData);
        console.log(formData)
    };
    
    return (
        <div className="add-room-container">
            <form onSubmit={handleSubmit} className="add-room-form">
                <h2>Add Room</h2>
                <div className="form-group">
                    <label htmlFor="roomName">Room Name:</label>
                    <input
                        id="roomName"
                        type="text"
                        name="roomName"
                        value={formData.roomName}
                        onChange={(event) => setFormData({ ...formData, roomName: event.target.value })}
                        placeholder="Enter room name"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location:</label>
                    <select
                        id="location"
                        name="location"
                        value={formData.location_id}
                        onChange={(event) => {
                            setFormData({ ...formData, location_id: event.target.value })
                        }
                       }
                        placeholder="Enter location"
                    >

                        {
                            allLocations.map((location) => {
                                const address = `${location.city}, ${location.state}, ${location.country}`;
                                return <option key={location._id} value={location._id} >{location._id}{address}</option>
                            })
                        }
                    </select>
                </div>
                <div className="details-container">
                    <h4>Details:</h4>
                    {formData.details.map((detail, index) => (
                        <div className="detail-item" key={index}>
                            <label>
                                Detail Name:
                                <input
                                    type="text"
                                    name="name"
                                    value={detail.name}
                                    onChange={(event) => handleInputChange(index, event)}
                                    placeholder="Detail name"
                                />
                            </label>
                            {index > 0 && (
                                <button type="button" className="remove-btn" onClick={() => handleRemoveDetail(index)}>
                                    &times; Remove
                                </button>
                            )}
                        </div>
                    ))}
                    <button type="button" className="add-detail-btn" onClick={handleAddDetail}>
                        + Add Detail
                    </button>
                </div>
                {formData.details.some(item => item.name === '') || formData.location_id === '' || formData.roomName === '' || formData.roomName.length < 3 ? (
                    <></>
                ): (
                    <button type="submit" className="submit-btn" onClick={handleSubmit}>
                        Submit
                    </button>
                )} 
                
            </form>
        </div>
    );
};

export default AddRoom;