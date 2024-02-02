import { useState } from "react";
import Modal from "react-modal";
import "./AddLocation.scss";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const AddLocation = ({ isOpen, onRequestClose }) => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const token = localStorage.getItem("auth-token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ city, country, state, postalCode }); // Log the data or process as needed
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
    // setState('')
    // setCity('')
    // setCountry('')
    // setPostalCode('')
  };

  return (
    <Modal
      isOpen={isOpen}
      overlayClassName="modal-overlay"
      onRequestClose={onRequestClose}
      className="add-location-modal"
    >
      <form onSubmit={handleSubmit}>
        <h2>Add a New Facility Location</h2>
        <div className="form-group">
          <label htmlFor="country">Country</label>
          <input
            placeholder="Germany"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            type="text"
          />
        </div>
        <div className="form-group">
          <label htmlFor="state">State/Province</label>
          <input
            placeholder="Bavaria"
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            type="text"
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            placeholder="Berlin"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            type="text"
          />
        </div>
        <div className="form-group">
          <label htmlFor="postal-code">Postal Code</label>
          <input
            placeholder="900243"
            id="postal-code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            type="text"
          />
        </div>
        <button type="submit" className="submit-btn">
          Add Location
        </button>
      </form>
    </Modal>
  );
};

export default AddLocation;
