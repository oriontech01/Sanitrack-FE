import { useState, useEffect } from "react";
import "../../styles/AddUser.scss";
import useStaff from "../../Hooks/useStaff";
import useRoles from "../../Hooks/useRoles";

const AddUser = () => {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [address, setAddress] = useState({
    country: "",
    state: "",
    city: "",
  });
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
        
  }, [])

// Custom Hooks
  const { addStaff, responseMessage } = useStaff();
  const {getAllRoles, allRoles} = useRoles()

  const handleUpload = async () => {
    console.log({ role, username, email, password, phoneNumber, address });
    // await addStaff(username, password, role);
    // alert(responseMessage);
  };
  return (
    <>
      <div className="add-user-container">
        <div className="add-user-header">
          <h2>Add User</h2>
        </div>
        <div className="add-user-form">
          <form>
            <div className="form-details">
              <label>Name:</label>
              <input
                placeholder="user name"
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              ></input>
            </div>
            <div className="form-details">
              <label>Password:</label>
              <input
                placeholder="user default password"
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              ></input>
            </div>{" "}
            <div className="form-details">
              <label>Email:</label>
              <input
                placeholder="john@doe.com"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></input>
            </div>{" "}
            <div className="form-details">
              <label>Phone Number:</label>
              <input
                placeholder="000000000"
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
              ></input>
            </div>{" "}
            <div className="form-details">
              <label>Address:</label>
              <input
                placeholder="Country"
                onChange={(e) => {
                  setAddress({
                    ...address,
                    country: e.target.value,
                  });
                }}
              ></input>
              <input
                placeholder="State"
                onChange={(e) => {
                  setAddress({
                    ...address,
                    state: e.target.value,
                  });
                }}
              ></input>
              <input
                placeholder="City"
                onChange={(e) => {
                  setAddress({
                    ...address,
                    city: e.target.value,
                  });
                }}
              ></input>
            </div>{" "}
            <div className="form-details">
              <label>Role:</label>
              <select
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                }}
              >
                <option value="">Select Role</option>
                <option value="Cleaner">Cleaner</option>
                <option value="Inspector">Inspector</option>
              </select>
            </div>
          </form>
          <button onClick={handleUpload} disabled={role == "" ? true : false}>
            Add User
          </button>
        </div>
      </div>
    </>
  );
};

export default AddUser;