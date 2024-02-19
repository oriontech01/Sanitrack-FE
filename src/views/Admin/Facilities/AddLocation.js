import { useState } from "react";
import Modal from "@mui/material/Modal";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import Slide from "@mui/material/Slide";
import axios from "axios";

const AddLocation = ({ isOpen, onRequestClose }) => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const token = localStorage.getItem("auth-token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/locations/add`,
        {
          country,
          state,
          city,
          postal_code: postalCode,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      alert(res.data.message);
    } catch (error) {
      alert("Error", error);
      console.log(error);
    }
    onRequestClose(); // Close the modal after submission
  };

  return (
    <Modal
      open={isOpen}
      onClose={onRequestClose}
      aria-labelledby="add-location-modal"
      aria-describedby="add-location-form"
      closeAfterTransition
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}    
      // Animate from the top
      // Define the direction to 'down' for top to bottom animation
      // Adjust the timeout for smoother animation
      // Adjust the position for different top margin
      TransitionComponent={Slide}
      TransitionProps={{
        direction: "down",
        timeout: {
          enter: 500,
        },
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          p: 4,
          bgcolor: "background.paper",
          transformOrigin: "top",
        }}
      >
        <Typography variant="h5" component="h2" gutterBottom>
          Add a New Facility Location
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Country"
              variant="outlined"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="State/Province"
              variant="outlined"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="City"
              variant="outlined"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Postal Code"
              variant="outlined"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </Box>
          <Button type="submit" variant="contained" color="primary">
            Add Location
          </Button>
        </form>
      </Container>
    </Modal>
  );
};

export default AddLocation;
