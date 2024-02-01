import { useState, useEffect } from "react";
import "../../styles/AddUser.scss";
import useStaff from "../../Hooks/useStaff";
import useRoles from "../../Hooks/useRoles";

const AddUser = () => {
  const { addStaff, responseMessage } = useStaff();
  const {getRoles, roles} = useRoles()

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState({
    country: "",
    state: "",
    city: "",
    home_address: ''
  });
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
 

  useEffect(() => {
    const fetchData = async() => {await getRoles()}
    fetchData()
    setSelectedRole(roles[0]?._id)
    // console.log(roles[0]._id)
    // console.log(`calling the getRoles => ${JSON.stringify(selectedRole)}`)
  }, [])

// Custom Hooks
 
  const disableButton = (username, password, email, address, phoneNumber) => { 
    return (username == '' || password.length < 3 || email == '' || address.country == '' || address.state == '' || address.city == '' || phoneNumber.length < 5 || selectedRole == '')
  }
  const handleUpload = async () => {
    console.log({ selectedRole });
    const dataToPass = { 
      username: username, 
      password: password, 
      email: email, 
      address: {country: address.country, state: address.state, city: address.city, home_address: address.home_address}, 
      phone_number: phoneNumber, 
      role_id: selectedRole, 
      role_name: roles.find((role) => role._id == selectedRole)?.role_name
    }
    // console.log(dataToPass)
    await addStaff(dataToPass);
    
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
              <input
                placeholder="Home Address"
                onChange={(e) => {
                  setAddress({
                    ...address,
                    home_address: e.target.value,
                  });
                }}
              ></input>
            </div>{" "}
            <div className="form-details">
              <label>Role:</label>
              <select
                value={selectedRole}
                onChange={(e) => {
                  setSelectedRole(e.target.value);
                }}
                
              >
                {roles ? (
                  roles.map((allroles) => (
                    <option value={allroles._id}>{allroles.role_name}</option>
                  ))
                  
                ): (
                  <p>Please Add Roles. </p>
                )}
              </select>
            </div>
          </form>
          <button onClick={handleUpload} disabled={disableButton(username, password, email, address, phoneNumber)}>
            Add User
          </button>
        </div>
      </div>
    </>
  );
};

export default AddUser;