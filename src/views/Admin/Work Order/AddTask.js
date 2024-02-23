import React, { useEffect, useState } from 'react';
import useTask from '../../../Hooks/useTask';
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
  ListItemText
} from '@mui/material';
import { log } from 'util';
import useRoom from 'Hooks/useRoom';
// import {Select as ReactSelect} from 'react-select';
const allLocations = [
  { _id: 1, name: 'Abuja' },
  { _id: 2, name: 'Aba' }
];
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const AddTask = () => {
  const {
    getUnAssignedRooms,
    getAllCleaners,
    getAllInspectors,
    addTask,
    unAssignedRooms,
    allCleaners,
    allInspectors,
    getCleaningItems,
    cleaningItems
  } = useTask();

  const { getRoomById, allRoomsById } = useRoom();
  const [selectedRoom, setSelectedRoom] = useState('');
  const [selectedCleaner, setSelectedCleaner] = useState('');
  const [selectedInspector, setSelectedInspector] = useState('');
  const [id, setId] = useState('');

  // useEffect(() => {
  //   getUnAssignedRooms();
  //   getAllCleaners();
  //   getAllInspectors();
  // }, []);
  useEffect(() => {
    console.log('rooms', allCleaners);
  }, []);
  // Custom style for scrollable RadioGroup with enhanced visibility
  const scrollableGroupStyle = {
    maxHeight: '150px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '10px',
    border: '1px solid',
    borderColor: 'divider',
    borderRadius: '4px',
    padding: '10px',
    backgroundColor: '#f5f5f5' // A light grey to subtly highlight the area
  };
  const [selectedItems, setSelectedItems] = React.useState([]);

  const handleChange = event => {
    setSelectedItems(event.target.value || []);
  };
  const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder'
  ];

  const [cleaners, setCleaners] = React.useState([]);
  const [cleaningItem, setCleaningItem] = useState([]);
  const [itesmToClean, setItemsToClean] = useState([]);
  const [inspector, setAllInspectors] = useState('');
  const [clean_hours, setClean_hours] = useState();
  const [clean_minutes, setClean_minutes] = useState();
  const [preop_hours, setPreop_hours] = useState();
  const [preop_minutes, setPreop_minutes] = useState();
  const handleSelectCleaners = event => {
    const {
      target: { value }
    } = event;
    setCleaners(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
    console.log(cleaners);
  };
  const handleSelectRoom = e => {
    setId(e.target.value);
    console.log(e.target.value);
  };
  const handleSelectCleaningItem = event => {
    const {
      target: { value }
    } = event;
    setCleaningItem(typeof value === 'string' ? value.split(',') : value);

    const newValue = cleaningItem.filter((val) => {
      return cleaningItems.filter((innerVal) => innerVal._id === val);
    });


    

    // setCleaningItem(...newValue);
    console.log('val', cleaningItem);
    console.log('eheh', newValue);
  };
  const handleSelectItemToCleaning = event => {
    const {
      target: { value }
    } = event;
    setItemsToClean(
      // On autofill we get a stringified value.
      typeof value[0] === 'object' ? value.split(',') : value[0]
    );
    console.log('eheh', value[0]);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const data = {
      roomId: id,
      inspectors: inspector,
      cleaners: cleaners,
      clean_hours: clean_hours,
      clean_minutes: clean_minutes,
      preop_hours: preop_hours,
      preop_minutes: preop_minutes
    };

    console.log('hello', data);
  };
  return (
    <Grid container spacing={2} sx={{ padding: 2, justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Grid item xs={12} md={10} lg={8}>
        <Paper elevation={6} sx={{ p: 4, width: '100%', margin: 'auto', flexGrow: 1 }}>
          <Typography variant="h4" gutterBottom textAlign="center" color="primary">
            Add Task
          </Typography>
          <div className="form-group">
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="location"> Unassigned Rooms</InputLabel>
              <Select
                id="location"
                name="location"
                value={id}
                onClick={event => {
                  getUnAssignedRooms();
                }}
                onChange={handleSelectRoom}
                placeholder="Enter location"
                label="Location"
                sx={{ marginBottom: 2 }}
              >
                {unAssignedRooms?.map(rooms => {
                  // const address = `${location.city}, ${location.state}, ${location.country}`;
                  return (
                    <MenuItem key={rooms?._id} value={rooms?._id}>
                      {unAssignedRooms.length === 0 ? 'No rooms availablex' : `${rooms?.roomName}- ${rooms?._id}`}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className="form-group">
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="location"> Inspectors</InputLabel>
              <Select
                id="inspector"
                name="inspector"
                // value={formData.location_id}
                onClick={event => {
                  getAllInspectors();
                }}
                onChange={e => setSelectedInspector(e.target.value)}
                placeholder="Select Inspector"
                label="Inspector"
                sx={{ marginBottom: 2 }}
              >
                {allInspectors?.map(inspector => {
                  // const address = `${location.city}, ${location.state}, ${location.country}`;
                  return (
                    <MenuItem key={inspector?._id} value={inspector?._id} className="capitalize">
                      {allInspectors.length === 0 ? 'No Inspectors available' : `${inspector?.username}-(${inspector?.role_name})`}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>

          <FormControl className="w-full">
            <InputLabel id="cleaners">Cleaners</InputLabel>
            <Select
              labelId="cleaners"
              id="cleaners"
              multiple
              onClick={event => {
                getAllCleaners();
              }}
              value={cleaners}
              onChange={handleSelectCleaners}
              input={<OutlinedInput label="Cleaner" />}
              // renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {allCleaners.map(cleaner => (
                <MenuItem key={cleaner?._id} value={cleaner?._id} className="capitalize">
                  {allCleaners.length === 0 ? 'No Cleaner available' : `${cleaner?.username}-(${cleaner?.role_name})`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box className="my-3">
            <Typography variant="p" gutterBottom textAlign="left">
              Cleaning time
            </Typography>
            <Grid container spacing={4}>
              <Grid item lg={6} sm={6} xs={12}>
                <Box sx={{ mb: 2 }}>
                  <FormControl className="w-full">
                    <InputLabel id="cleaners"> Cleaning hours</InputLabel>
                    <Select
                      labelId="cleaners"
                      id="cleaners"
                      value={clean_hours}
                      onChange={e => {
                        setClean_hours(e.target.value);
                      }}
                      input={<OutlinedInput label="Cleaner" />}
                      // renderValue={(selected) => selected.join(', ')}
                      MenuProps={MenuProps}
                    >
                      {Array.from({ length: 13 }, (_, i) => (
                        <MenuItem key={i} value={i} className="capitalize">
                          {i}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item lg={6} sm={6} xs={12}>
                <Box sx={{ mb: 2 }}>
                  <FormControl className="w-full">
                    <InputLabel id="cleaners"> Cleaning minutes</InputLabel>
                    <Select
                      labelId="cleaners"
                      id="cleaners"
                      value={clean_minutes}
                      onChange={e => {
                        setClean_minutes(e.target.value);
                      }}
                      input={<OutlinedInput label="Cleaner" />}
                      // renderValue={(selected) => selected.join(', ')}
                      MenuProps={MenuProps}
                    >
                      {Array.from({ length: 61 }, (_, i) => (
                        <MenuItem key={i} value={i} className="capitalize">
                          {i}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box className="my-3">
            <Typography variant="p" gutterBottom textAlign="left">
              Operational Hours
            </Typography>
            <Grid container spacing={4}>
              <Grid item lg={6} sm={6} xs={12}>
                <Box sx={{ mb: 2 }}>
                  <FormControl className="w-full">
                    <InputLabel id="cleaners"> Operational hours</InputLabel>
                    <Select
                      labelId="cleaners"
                      id="cleaners"
                      value={preop_hours}
                      onChange={e => {
                        setPreop_hours(e.target.value);
                      }}
                      input={<OutlinedInput label="Cleaner" />}
                      // renderValue={(selected) => selected.join(', ')}
                      MenuProps={MenuProps}
                    >
                      {Array.from({ length: 13 }, (_, i) => (
                        <MenuItem key={i} value={i} className="capitalize">
                          {i}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item lg={6} sm={6} xs={12}>
                <Box sx={{ mb: 2 }}>
                  <FormControl className="w-full">
                    <InputLabel id="cleaners"> Operational minutes</InputLabel>
                    <Select
                      labelId="cleaners"
                      id="cleaners"
                      value={preop_minutes}
                      onChange={e => {
                        setPreop_minutes(e.target.value);
                      }}
                      input={<OutlinedInput label="Cleaner" />}
                      // renderValue={(selected) => selected.join(', ')}
                      MenuProps={MenuProps}
                    >
                      {Array.from({ length: 61 }, (_, i) => (
                        <MenuItem key={i} value={i} className="capitalize">
                          {i}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <FormControl className="w-full">
            <InputLabel id="cleanersItem">Cleaning Item</InputLabel>
            <Select
              labelId="cleanersItem"
              id="cleanersItem"
              multiple
              onClick={event => {
                getCleaningItems();
              }}
              value={cleaningItem}
              onChange={handleSelectCleaningItem}
              input={<OutlinedInput label="Cleaning Item" />}
              // renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {cleaningItems?.map(item => (
                <MenuItem key={item?._id} value={item?._id} className="capitalize">
                  {cleaningItems.length === 0 ? 'No Cleaner Item available' : `${item?.equipment}-(${item?.quantity})`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className="w-full my-3">
            <InputLabel id="cleaners"> Inventory</InputLabel>
            <Select
              labelId="cleaners"
              id="cleaners"
              multiple
              onClick={event => {
                getRoomById(id);
              }}
              value={itesmToClean}
              onChange={handleSelectItemToCleaning}
              input={<OutlinedInput label=" Item to Clean" />}
              // renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {allRoomsById?.detail?.detail?.map(item => (
                <MenuItem key={item?._id} value={item} className="capitalize">
                  {allRoomsById.length === 0 ? 'No Cleaner Item available' : `${item?.name}-(${item?._id})`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* <FormControl component="fieldset" fullWidth sx={{ mb: 3 }}>
            <FormLabel component="legend" sx={{ mb: 2, fontWeight: 'bold' }}>
              Cleaners
            </FormLabel>
            <RadioGroup
              name="selectedCleaner"
              value={selectedCleaner}
              onChange={event => setSelectedCleaner(event.target.value)}
              sx={scrollableGroupStyle}
            >
              {allCleaners.map(cleaner => (
                <FormControlLabel key={cleaner._id} value={cleaner._id} control={<Radio />} label={cleaner?.username} />
              ))}
            </RadioGroup>
          </FormControl> */}

          {/* <FormControl component="fieldset" fullWidth sx={{ mb: 3 }}>
            <FormLabel component="legend" sx={{ mb: 2, fontWeight: 'bold' }}>
              Inspectors
            </FormLabel>
            <RadioGroup
              name="selectedInspector"
              value={selectedInspector}
              onChange={event => setSelectedInspector(event.target.value)}
              sx={scrollableGroupStyle}
            >
              {allInspectors.map(inspector => (
                <FormControlLabel key={inspector._id} value={inspector._id} control={<Radio />} label={inspector.username} />
              ))}
            </RadioGroup>
          </FormControl> */}

          <div className='flex justify-center'>
            <button className="text-white flex justify-center  mb-4 gap-x-2 items-center px-4 py-2 bg-blue-700 w-auto lg:h-[40px] text-base border-t-2 "
              
              disabled={id && inspector && clean_hours}
              onClick={handleSubmit}
            
            >
              Upload Task
            </button>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AddTask;
