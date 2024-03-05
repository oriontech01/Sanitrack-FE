
import { useState, useEffect } from 'react';
import useStaff from 'Hooks/useStaff';
import useRoles from 'Hooks/useRoles';
import {
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  InputAdornment,
  IconButton,
  Container
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Modal from '@mui/material/Modal';
import Slide from '@mui/material/Slide';
import { toast, Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddUser = ({ isOpen, onRequestClose }) => {
  const { addStaff, responseMessage, isLoadings } = useStaff();

  const { getRoles, roles } = useRoles();
  const [showPassword, setShowPassword] = useState(false);
  const [userDetails, setUserDetails] = useState({
    username: '',
    password: '',
    email: '',
    phoneNumber: '',
    address: {
      country: '',
      state: '',
      city: '',
      home_address: '',
    },
    selectedRole: '',
  });

  const theme = useTheme();
  const isXsScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {

    getRoles()
  }, []);
  const handleTogglePasswordVisibility = () => setShowPassword(!showPassword);
  const disableButton = (username, password, email, address, phoneNumber) => {
    return (
      username === '' ||
      password.length < 3 ||
      email === '' ||
      address.country === '' ||
      address.state === '' ||
      address.city === '' ||
      phoneNumber.length < 5 ||
      selectedRole === '' ||
      isLoading
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
   

  };

  return (
    <>
       <ToastContainer />
        <Modal
      open={isOpen}
      onClose={onRequestClose}
      aria-labelledby="add-user-modal"
      aria-describedby="add-user-form"
      closeAfterTransition
      TransitionComponent={Slide}
      TransitionProps={{ direction: 'down', timeout: { enter: 500 } }}
    >

    
      <Container
        spacing={2}
        style={{
          padding: '20px',
          borderRadius: 10,
          marginTop: 10,
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          width: '30%'
        }}
      >
        <Grid item xs={12}>
          <Typography variant="h2">Add User</Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
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
          <FormControl fullWidth>
            <InputLabel color="primary" variant="h2" htmlFor="password">
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
          <FormControl fullWidth>
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
          <FormControl fullWidth>
            <InputLabel fullWidth variant="h2">Phone Number:</InputLabel>
            <Input
              placeholder="000000000"
              onChange={e => {
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
              onChange={e => {
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
              onChange={e => {
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
              onChange={e => {
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
              onChange={e => {
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
              onChange={e => {
                setSelectedRole(e.target.value);
              }}
              style={{ width: '100%' }} // Reduce the width of the dropdown
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
          <button   className="text-white flex justify-center  gap-x-2 items-center px-4 py-2 bg-blue-700 w-full lg:h-[40px] text-base border-t-2 border-empWhite" onClick={handleUpload} disabled={isLoadings}>
            {isLoadings ? 'Loading...' : ' Add User'}
          </button>

        </Grid>
      </Container>
    </Modal>
    </>

  );
};

export default AddUser;
