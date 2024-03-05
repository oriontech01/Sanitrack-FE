import React, { useEffect, useState } from 'react';
import { Button, Container, FormControl, Grid, Input, InputLabel, MenuItem, Select, Typography, InputAdornment, IconButton, Modal, Slide, useTheme, useMediaQuery } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import useStaff from 'Hooks/useStaff';
import useRoles from 'Hooks/useRoles';

const AddUser = ({ isOpen, onRequestClose }) => {
  const { addStaff } = useStaff();
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
    getRoles();
  }, [getRoles]);

  const handleTogglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleChange = (prop) => (event) => {
    if (['country', 'state', 'city', 'home_address'].includes(prop)) {
      setUserDetails({ ...userDetails, address: { ...userDetails.address, [prop]: event.target.value } });
    } else {
      setUserDetails({ ...userDetails, [prop]: event.target.value });
    }
  };

  const handleUpload = async () => {
    await addStaff({ ...userDetails, role_name: roles.find(role => role._id === userDetails.selectedRole)?.role_name });
    alert('Added staff Successfully');
    onRequestClose(); // Close modal after adding user
  };

  const disableButton = () => {
    const { username, password, email, phoneNumber, address, selectedRole } = userDetails;
    return !username || password.length < 3 || !email || !address.country || !address.state || !phoneNumber || phoneNumber.length < 5 || !selectedRole;
  };

  return (
    <Modal
      open={isOpen}
      onClose={onRequestClose}
      aria-labelledby="add-user-modal"
      aria-describedby="add-user-form"
      closeAfterTransition
      TransitionComponent={Slide}
      TransitionProps={{ direction: 'down', timeout: { enter: 500 } }}
    >
      <Container sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: isXsScreen ? '90%' : '50%',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        maxHeight: '90vh',
        overflowY: 'auto',
      }}>
        <Typography id="add-user-modal-title" variant="h6" component="h2" marginBottom={2}>
          Add User
        </Typography>
        <Grid container spacing={2}>
          {['username', 'password', 'email', 'phoneNumber', 'country', 'state', 'city', 'home_address'].map((field, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>{field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')}</InputLabel>
                <Input
                  type={field === 'password' ? (showPassword ? 'text' : 'password') : 'text'}
                  value={userDetails[field]}
                  onChange={handleChange(field)}
                  endAdornment={field === 'password' ? (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleTogglePasswordVisibility}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ) : null}
                />
              </FormControl>
            </Grid>
          ))}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="role-select-label">Role</InputLabel>
              <Select
                labelId="role-select-label"
                id="role-select"
                value={userDetails.selectedRole}
                label="Role"
                onChange={handleChange('selectedRole')}
              >
                {roles.map((role) => (
                  <MenuItem key={role._id} value={role._id}>{role.role_name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button 
              fullWidth 
              variant="contained" 
              onClick={handleUpload} 
              disabled={disableButton()}
              sx={{ mt: 2 }}
            >
              Add User
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Modal>
  );
};

export default AddUser;
