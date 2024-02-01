import React from "react";
import { CgProfile } from "react-icons/cg";
import '../styles/Profile.scss';

const Profile = () => {
  return (
    <div>
      <header>
        <CgProfile size={32} /> <p>Username</p>
        <span>Edit Profile</span>
      </header>
      <form>
        <label htmlFor="name">Name:</label>
        <br />
        <input type="text" id="name" name="name" required />
        <br />
        <br />
        <label htmlFor="email">Email:</label>
        <br />
        <input type="email" id="email" name="email" required />
        <br />
        <br />

        <div>
          <h3>Address</h3>
          <label htmlFor="">Country:</label>
          <br />
          <input type="text" id="country" name="country" required />
          <br />
          <br />
          <label htmlFor="text">State:</label>
          <br />
          <input type="text" id="state" name="state" required />
          <br />
          <br />
          <label htmlFor="text">City:</label>
          <br />
          <input type="text" id="city" name="city" required />
        </div>
        <button type="submit">Update profile</button>
        {/* This button should only appear when the edit button in header is clicked */}
      </form>
    </div>
  );
};

export default Profile;