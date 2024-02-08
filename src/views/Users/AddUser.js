import { useState, useEffect } from "react";
import useStaff from "../../Hooks/useStaff";
import useRoles from "../../Hooks/useRoles";
import { Button, FormControl, Grid, Input, InputLabel, MenuItem, Select, Typography } from "@mui/material";

const AddUser = () => {
  const { addStaff, responseMessage } = useStaff();
  const { getRoles, roles } = useRoles();

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
    const fetchData = async () => {
      await getRoles();
    };
    fetchData();
  }, [getRoles]);

  const disableButton = (username, password, email, address, phoneNumber) => {
    return (
      username === '' ||
      password.length < 3 ||
      email === '' ||
      address.country === '' ||
      address.state === '' ||
      address.city === '' ||
      phoneNumber.length < 5 ||
      selectedRole === ''
    );
  };

  const handleUpload = async () => {
    const dataToPass = {
      username: username,
      password: password,
      email: email,
      address: { country: address.country, state: address.state, city: address.city, home_address: address.home_address },
      phone_number: phoneNumber,
      role_id: selectedRole,
      role_name: roles.find((role) => role._id === selectedRole)?.role_name
    };
    await addStaff(dataToPass);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" spacing={2} style={{ padding: "20px" }}>
      <Grid item xs={12}>
        <Typography variant="h2">Add User</Typography>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel variant="h2">Name:</InputLabel>
          <Input
            placeholder="user name"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel variant="h2">Password:</InputLabel>
          <Input
            placeholder="user default password"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel variant="h2">Email:</InputLabel>
          <Input
            placeholder="john@doe.com"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel variant="h2">Phone Number:</InputLabel>
          <Input
            placeholder="000000000"
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel variant="h2">Country:</InputLabel>
          <Input
            placeholder="Country"
            onChange={(e) => {
              setAddress({ ...address, country: e.target.value });
            }}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel variant="h2">State:</InputLabel>
          <Input
            placeholder="State"
            onChange={(e) => {
              setAddress({ ...address, state: e.target.value });
            }}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel variant="h2">City:</InputLabel>
          <Input
            placeholder="City"
            onChange={(e) => {
              setAddress({ ...address, city: e.target.value });
            }}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel variant="h2">Home Address:</InputLabel>
          <Input
            placeholder="Home Address"
            onChange={(e) => {
              setAddress({ ...address, home_address: e.target.value });
            }}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <Typography variant="h4">Role:</Typography>
          <Select
            value={selectedRole}
            onChange={(e) => {
              setSelectedRole(e.target.value);
            }}
            style={{ width: "30%" }} // Reduce the width of the dropdown
          >
            {roles ? (
              roles.map((allroles) => (
                <MenuItem key={allroles._id} value={allroles._id}>
                  {allroles.role_name}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No Roles Available</MenuItem>
            )}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={handleUpload} disabled={disableButton(username, password, email, address, phoneNumber)}>
          Add User
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddUser;
