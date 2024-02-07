import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useRoom from '../../Hooks/useRoom';
import useLocation from '../../Hooks/useLocation';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Divider,
} from '@mui/material';

const RoomDetails = () => {
  const { roomId } = useParams();
  const { getRoomById, allRoomsById} = useRoom();
  const { getLocation, allLocations } = useLocation();

  const [selectedLocation, setSelectedLocation] = useState('');
  const [formData, setFormData] = useState({
    roomId: '',
    roomName: '',
    locationId: '',
    details: [{ name: '' }],
  });

  useEffect(() => {
    getRoomById(roomId);
  }, [roomId]);

  useEffect(() => {
    const fetchData = async () => {
      await getLocation();
    };
    fetchData();
    setSelectedLocation(allLocations[0]?._id);
  }, []);

  useEffect(() => {
    // This effect runs when allRoomsById is updated
    if (Object.keys(allRoomsById).length > 0) {
      const detailsWithNames = allRoomsById.detail.detail.map((detail) => ({ name: detail.name }));
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
    console.log(formData);
    // await updateRoomDetail(formData)
    // alert(responseMessage)
    // navigate("/home/room")
  };

  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
    >
      <Container
        maxWidth="md"
        component={Paper}
        elevation={3}
        sx={{ padding: 4, borderRadius: 4 }}
      >
        <form onSubmit={handleSubmit} className="add-user-form">
          <Typography variant="h4" gutterBottom>
            Edit Room
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />
          <div className="form-group">
            <TextField
              id="roomName"
              label="Room Name"
              type="text"
              name="roomName"
              value={formData.roomName}
              onChange={(event) =>
                setFormData({ ...formData, roomName: event.target.value })
              }
              placeholder="Enter room name"
              variant="outlined"
              fullWidth
              sx={{ marginBottom: 2 }}
            />
          </div>
          <div className="form-group">
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="location">Location</InputLabel>
              <Select
                id="location"
                name="location"
                value={selectedLocation}
                onChange={(event) => {
                  setSelectedLocation(event.target.value);
                  console.log(`clicked change => ${selectedLocation}`);
                }}
                placeholder="Enter location"
                label="Location"
                sx={{ marginBottom: 2 }}
              >
                {allLocations ? (
                  allLocations.map((location) => (
                    <MenuItem key={location._id} value={location._id}>
                      {location._id} {location.state}, {location.country}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="" disabled>
                    Please Add Locations
                  </MenuItem>
                )}
              </Select>
            </FormControl>
          </div>
          <div className="details-container">
            <Typography variant="h6" gutterBottom>
              Details:
            </Typography>
            {formData.details &&
              formData.details.map((detail, index) => (
                <div className="detail-item" key={index}>
                  <TextField
                    label="Detail Name"
                    type="text"
                    name="name"
                    value={detail.name}
                    onChange={(event) => handleInputChange(index, event)}
                    placeholder="Detail name"
                    variant="outlined"
                    fullWidth
                    sx={{ marginBottom: 2 }}
                  />
                  {index > 0 && (
                    <Button
                      type="button"
                      variant="outlined"
                      color="error"
                      className="remove-btn"
                      onClick={() => handleRemoveDetail(index)}
                    >
                      Delete Detail
                    </Button>
                  )}
                </div>
              ))}
            <Button
              type="button"
              variant="outlined"
              color="primary"
              className="add-detail-btn"
              onClick={handleAddDetail}
              sx={{ marginBottom: 2 }}
            >
              + Add Detail
            </Button>
          </div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: '12px' }}
            disabled={formData.details.some((item) => item.name === '')}
          >
            Save Changes
          </Button>
        </form>
      </Container>
    </Box>
  );
};

export default RoomDetails;
