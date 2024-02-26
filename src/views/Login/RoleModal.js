import {
  Grid,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  Box,
  Paper,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  OutlinedInput,
  Checkbox,
  ListItemText,
  Container
} from '@mui/material';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import Slide from '@mui/material/Slide';
import Modal from '@mui/material/Modal';
import React, { useState } from 'react';
import { useAuthRolesState } from 'context/AuthRolesContext';
import axios from 'axios';
import { useCurrentRole } from 'context/UserRoleContext';
import { useAuthState } from 'context/AuthContext';
import JWT from 'jsonwebtoken';
import { Flip, toast } from 'react-toastify';

const RoleModal = ({ closeModal }) => {
  const { roles, token,setModal } = useAuthRolesState();
  const { currentRole, setCurrentRole } = useCurrentRole();
  const { setIsLoggedIn, isLoggedIn } = useAuthState();
  console.log('toky', token);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [selectedRole, setSelectedRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
        box-sizing: border-box;
        width: 320px;
        font-family: 'IBM Plex Sans', sans-serif;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.5;
        padding: 8px 12px;
        border-radius: 8px;
        color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
        background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
        border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
        box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
    
        &:hover {
          border-color: ${blue[400]};
        }
    
        &:focus {
          border-color: ${blue[400]};
          box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
        }
    
        // firefox
        &:focus-visible {
          outline: 0;
        }
      `
  );

  const roleSubmit = async data => {
    console.log('first');
    // Add setIsLoggedIn as parameter
    setIsLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}select-role`, data, {
        headers: {
          // 'Content-Type': 'application/json',
          // 'Accept-Language': localStorage.getItem('i18nextLng'),
          Authorization: `Bearer ${token}`
        }
      });

      if (response?.data?.status === true) {
        setModal(false)
        const JWT_KEY = process.env.REACT_APP_JWT_KEY;
        console.log(JWT_KEY);
        const decodedResponse = JWT.decode(response.data.data.token, JWT_KEY);
        //     const loggedInUserRole = decodedResponse.role_id.role_name;
        //    console.log("rl",decodedResponse)
        const newRole = roles.filter(role => role?.role_id == selectedRole);
      
  
        setCurrentRole(newRole[0].role_name);
        // Set auth details in localStorage
        localStorage.setItem('isLoggedIn', 'true'); // Use to maintain session state
        localStorage.setItem('auth-token', response.data.data.token);
        localStorage.setItem('name', response.data.data.username);
        localStorage.setItem('id', response.data.data.userId);
        localStorage.setItem('role', newRole[0].role_name);
        setIsLoggedIn(true); // Update global state via context
      }
      // console.log('Resty', response?.data);
      // if (response?.data?.data?.requiredRoleSelection === false) {
      //   console.log('first hiiii');
      //   console.log('hety', response?.data?.data?.requiredRoleSelection);
      // }

      // console.log('Decoded----', decodedResponse);
      // console.log('User Role', loggedInUserRole);
      // console.log('Response data', response.data);
      // console.log('My role buddy', currentRole);
      console.log(response);
   
      // else {
      //   console.log('User not logged in');
      //   navigate('/unauthorized');
      //   return false;
      // }
    } catch (error) {
      // alert(error.message);
      toast.error(error?.response?.data?.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Flip,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const data = { selectedRoleId: selectedRole };

    console.log(data);
    roleSubmit(data);
  };

  console.log(roles);
  return (
    <>
      <Container
      
        sx={{
          p: 4,
          bgcolor: 'background.paper',
          transformOrigin: 'top'
        }}
      >
        <Typography variant="h3" component="h2" gutterBottom>
          You have {roles?.length} roles. Select a Role
        </Typography>
        <form onSubmit={handleSubmit}>
          <div className="form-group w-full lg:w-full">
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="location"> Choose Role</InputLabel>
              <Select
                id="inspector"
                name="inspector"
                className="w-full"
                value={selectedRole}
                onChange={e => {
                  console.log(e.target.value);
                  setSelectedRole(e.target.value);
                }}
                placeholder="Select Inspector"
                label="Inspector"
                sx={{ marginBottom: 2 }}
              >
                {roles?.map(role => {
                  // const address = `${location.city}, ${location.state}, ${location.country}`;
                  return (
                    <MenuItem key={role?.role_id} value={role?.role_id} className="capitalize">
                      {roles.length === 0 ? 'No roles available' : `${role?.role_name}`}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className="p-2 w-full flex justify-end">
            <button
              disabled={isLoading}
              className="text-white flex justify-center  gap-x-2 items-center px-4 py-2 bg-blue-700 w-full lg:h-[40px] text-base border-t-2 border-empWhite"
            >
              {isLoading ? 'Loading...' : 'Send'}
            </button>{' '}
          </div>
        </form>
      </Container>
    </>
  );
};

export default RoleModal;
