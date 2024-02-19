import React, { useState, useEffect } from 'react';
import useLocation from 'Hooks/useLocation';
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

const AddRoom = () => {
  // const { addRoom, responseMessage } = useRoom();
  const { allLocations, getLocation } = useLocation();

  useEffect(() => {
    const fetchLocationData = async () => {
      await getLocation();
    };
    fetchLocationData();
  }, []);

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
    console.log(formData);
  };

  return (
    <Box height="100vh" display="flex" flexDirection="column">
      <Container maxWidth="md" component={Paper} elevation={3} sx={{ padding: 4, borderRadius: 4 }}>
        <form onSubmit={handleSubmit} className="add-room-form">
          <Typography variant="h2" gutterBottom>
            Add Room
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />
          <div className="form-group">
            <TextField
              id="roomName"
              label="Room Name"
              type="text"
              name="roomName"
              value={formData.roomName}
              onChange={(event) => setFormData({ ...formData, roomName: event.target.value })}
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
                value={formData.location_id}
                onChange={(event) => {
                  setFormData({ ...formData, location_id: event.target.value });
                }}
                placeholder="Enter location"
                label="Location"
                sx={{ marginBottom: 2 }}
              >
                {allLocations.map((location) => {
                  const address = `${location.city}, ${location.state}, ${location.country}`;
                  return (
                    <MenuItem key={location._id} value={location._id}>
                      {location._id} {address}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className="details-container">
            <Typography variant="h6" gutterBottom>
              Details:
            </Typography>
            {formData.details.map((detail, index) => (
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
                    Remove
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
          {formData.details.some((item) => item.name === '') ||
          formData.location_id === '' ||
          formData.roomName === '' ||
          formData.roomName.length < 3 ? (
            <></>
          ) : (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="submit-btn"
            >
              Submit
            </Button>
          )}
        </form>
      </Container>
    </Box>
  );
};

export default AddRoom;
