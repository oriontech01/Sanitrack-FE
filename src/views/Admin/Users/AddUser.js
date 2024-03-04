import { useState, useEffect } from 'react';
import useStaff from 'Hooks/useStaff';
import useRoles from 'Hooks/useRoles';
import { Button, FormControl, Grid, Input, InputLabel, MenuItem, Select, Typography, InputAdornment, IconButton, Container } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Modal from '@mui/material/Modal';
import Slide from '@mui/material/Slide';

const AddUser = ({ isOpen, onRequestClose }) => {
  const { addStaff, responseMessage } = useStaff();
  const { getRoles, roles } = useRoles();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState({
    country: '',
    state: '',
    city: '',
    home_address: ''
  });
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getRoles();
    };
    fetchData();
  }, []);

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
      role_name: roles.find(role => role._id === selectedRole)?.role_name
    };
    await addStaff(dataToPass);
    alert('Added staff Successfully');
  };

  return (
    <Modal
      open={isOpen}
      onClose={onRequestClose}
      aria-labelledby="add-user-modal"
      aria-describedby="add-user-form"
      closeAfterTransition
      // sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '50%', height: '50%', margin: '0 auto',p: 4, backgroundColor: 'background.paper', transformOrigin: 'top' }}
      TransitionComponent={Slide}
      TransitionProps={{ direction: 'down', timeout: { enter: 500 } }}
    >
      <Container spacing={2} style={{ padding: '20px', borderRadius: 10, marginTop: 10, backgroundColor: 'white', display: 'flex', flexDirection: 'column', gap: 10, width: '30%' }}>
        <Grid item xs={12}>
          <Typography variant="h2">Add User</Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl >
            <InputLabel variant="h2">Name:</InputLabel>
            <Input
              placeholder="user name"
              onChange={e => {
                setUserName(e.target.value);
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <InputLabel color='primary' variant="h2" htmlFor="password">
              Password:
            </InputLabel>
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="user default password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={handleTogglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl >
            <InputLabel variant="h2">Email:</InputLabel>
            <Input
              placeholder="john@doe.com"
              onChange={e => {
                setEmail(e.target.value);
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl >
            <InputLabel variant="h2">Phone Number:</InputLabel>
            <Input
              placeholder="000000000"
              onChange={e => {
                setPhoneNumber(e.target.value);
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl >
            <InputLabel variant="h2">Country:</InputLabel>
            <Input
              placeholder="Country"
              onChange={e => {
                setAddress({ ...address, country: e.target.value });
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl >
            <InputLabel variant="h2">State:</InputLabel>
            <Input
              placeholder="State"
              onChange={e => {
                setAddress({ ...address, state: e.target.value });
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl >
            <InputLabel variant="h2">City:</InputLabel>
            <Input
              placeholder="City"
              onChange={e => {
                setAddress({ ...address, city: e.target.value });
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl >
            <InputLabel variant="h2">Home Address:</InputLabel>
            <Input
              placeholder="Home Address"
              onChange={e => {
                setAddress({ ...address, home_address: e.target.value });
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth >
            <Typography variant="h4">Role:</Typography>
            <Select
              value={selectedRole}
              onChange={e => {
                setSelectedRole(e.target.value);
              }}
              style={{ width: '30%' }} // Reduce the width of the dropdown
            >
              {roles ? (
                roles.map(allroles => (
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
      </Container>
    </Modal>
  );
};

export default AddUser;
