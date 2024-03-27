/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import useTask from '../../../Hooks/useTask';
import { Grid, FormControl, Box, InputLabel, Select, MenuItem, OutlinedInput } from '@mui/material';
import useRoom from 'Hooks/useRoom';
import useLocation from '../../../Hooks/useLocation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NetworkDetector from 'utils/networkDetector';

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

const AddTask = props => {
  console.log('Dev Team', props);
  const { isDisconnected } = props;
  const {
    getUnAssignedRooms,
    getAllCleaners,
    getAllInspectors,
    addTask,
    unAssignedRooms,
    allCleaners,
    allInspectors,
    getCleaningItems,
    cleaningItems,
    taskLoading
  } = useTask();
  const { getLocation, allLocations, loading } = useLocation();
  const { getRoomById, allRoomsById, getUnassignedRoomById, allUnassignedRoomsById } = useRoom();
  const [id, setId] = useState('');
  const [locationSelectId, setLocationSelectId] = useState('');
  const [cleaners, setCleaners] = React.useState([]);
  const [cleaningItem, setCleaningItem] = useState([]);
  const [itemsToClean, setItemsToClean] = useState([]);
  const [inspector, setAllInspectors] = useState([]);
  const [clean_hours, setClean_hours] = useState('');
  const [clean_minutes, setClean_minutes] = useState('');
  const [preop_hours, setPreop_hours] = useState('');
  const [preop_minutes, setPreop_minutes] = useState('');
  const [filteredCleaning, setFilteredCleaning] = useState([]);
  const [items, setItems] = useState([]);
  const [modifiedItem, setModifiedItem] = useState([]);
  const [filteredItems, setFilteredItems] = useState({});
  const [viewDate, setViewDate] = useState(new Date());

  const [selectedDate, setSelectedDate] = useState(new Date());

  const storedLocationId = localStorage.getItem('locationId');
  const storedRoomId = localStorage.getItem('roomId');

  const handleDateChange = event => {
    console.log('first', event.target.value);
    // setViewDate(event.target.value);
    setSelectedDate(event.target.value);
  };

  useEffect(() => {
    getUnassignedRoomById(storedLocationId ? storedLocationId : locationSelectId);
  }, [locationSelectId]);
  useEffect(() => {
    setItems(filteredCleaning);
  }, [filteredCleaning]);

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
  const saveDataOffline = data => {
    localStorage.setItem('offlineWorkOrderData', JSON.stringify(data));
  };

  const loadDataOffline = () => {
    return JSON.parse(localStorage.getItem('offlineWorkOrderData'));
  };

  const handleSelectCleaners = event => {
    const {
      target: { value }
    } = event;
    setCleaners(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };
  const handleSelectInspectors = event => {
    const {
      target: { value }
    } = event;
    setAllInspectors(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };
  const handleSelectRoom = e => {
    setId(e.target.value);
  };
  const handleSelectLocation = e => {
    setLocationSelectId(e.target.value);
  };
  const handleSelectCleaningItem = event => {
    const {
      target: { value }
    } = event;
    setCleaningItem(typeof value === 'string' ? value.split(',') : value);

    const newValue = value.filter(val => !cleaningItems.some(innerVal => innerVal._id === val));
    const filteredObjects = cleaningItems.filter(obj => value.includes(obj._id));
    // setCleaningItem(...newValue);
    setFilteredCleaning(filteredObjects);
  };
  const handleSelectItemToCleaning = event => {
    const {
      target: { value }
    } = event;
    setItemsToClean(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );

    const filteredItems = allRoomsById?.detail?.detail?.filter(obj => value.includes(obj._id));
    const modifiedItems = filteredItems.map(({ _id, name }) => ({
      roomDetailId: _id,
      name
    }));
    setFilteredItems(modifiedItems);
  };

  const handleQuantityChange = (index, event) => {
    const newItems = [...items];
    newItems[index].quantity = event.target.value;
    setItems(newItems);
  };
  const handleRenameAndStore = () => {
    const modifiedItems = items.map(({ _id, equipment, quantity, unit }) => ({
      cleaning_id: _id,
      item_name: equipment,
      quantity,
      unit
    }));

    setModifiedItem(modifiedItems);
  };
  const handleSubmit = e => {
    e.preventDefault();
    const filteredLocationName = allLocations.filter(loc => loc._id === locationSelectId);

    localStorage.setItem('locationName', `${filteredLocationName[0]?.city}- ${filteredLocationName[0]?.country}`);
    localStorage.setItem('roomId', storedRoomId ? storedRoomId : id);
    const data = {
      locationId: storedLocationId ? storedLocationId : locationSelectId,
      roomId: storedRoomId ? storedRoomId : id,
      inspectors: inspector,
      cleaners: cleaners,
      clean_hours: clean_hours,
      clean_minutes: clean_minutes,
      preop_hours: preop_hours,
      preop_minutes: preop_minutes,
      cleaningData: modifiedItem,
      itemsToClean: filteredItems,
      scheduled_date: selectedDate
    };

    console.log("first,data",data)
    let savedData;
    if (isDisconnected) {
      saveDataOffline(data);
    } else {
      savedData = loadDataOffline();
      if (data) {
        null;
      } else {
        console.log('jhdvbjdb', savedData);
        addTask(savedData);
      }
    }
    addTask(data);
  };
  useEffect(() => {
    getUnassignedRoomById(storedLocationId);
    getAllInspectors();
    getAllCleaners();
    getCleaningItems();
    getRoomById(storedRoomId);
  }, []);
  console.log('first hjhjh', allRoomsById);
  return (
    <Grid container spacing={2} sx={{ padding: 2, justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <ToastContainer />
      <Grid item xs={12} md={10} lg={8}>
        <div>
          <Grid container spacing={4}>
            {!storedLocationId && (
              <Grid item lg={6} sm={6} xs={12}>
                <div className="form-control" style={{ width: '100%' }}>
                  <label htmlFor="location">Select Location</label>
                  <select
                    id="location"
                    name="location"
                    value={locationSelectId}
                    onClick={event => {
                      console.log('clicked');
                      event.preventDefault();
                      getLocation();
                    }}
                    onChange={handleSelectLocation}
                    style={{ marginBottom: '16px', width: '100%', padding: '10px', borderRadius: '4px' }}
                  >
                    {allLocations.length > 0 ? (
                      allLocations?.map(location => (
                        <option key={location?._id} value={location?._id}>
                          {`${location?.city}- ${location?.country}`}
                        </option>
                      ))
                    ) : (
                      <option>Click here to select a location</option>
                    )}
                  </select>
                </div>
              </Grid>
            )}
            {!storedRoomId && (
              <Grid item lg={6} sm={6} xs={12}>
                <div style={{ marginBottom: '16px', width: '100%' }}>
                  <label htmlFor="location" style={{ display: 'block', marginBottom: '8px' }}>
                    Select Facility
                  </label>
                  <select
                    id="facilities"
                    name="facilities"
                    value={id}
                    // onClick={event => {
                    //   getUnassignedRoomById(storedLocationId ? storedLocationId : locationSelectId);
                    // }}

                    onChange={handleSelectRoom}
                    style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ced4da' }}
                  >
                    {allUnassignedRoomsById?.length === 0 ? (
                      <option>Select a location first</option>
                    ) : (
                      allUnassignedRoomsById?.map(rooms => (
                        <option key={rooms._id} value={rooms._id}>
                          {`${rooms.roomName}`}
                        </option>
                      ))
                    )}
                  </select>
                </div>
              </Grid>
            )}
          </Grid>
          <Grid container spacing={4}>
            <Grid item lg={6} sm={6} xs={12}>
              <div className="form-group">
                <FormControl className="w-full">
                  <InputLabel id="inspectors">Inspectors</InputLabel>
                  <Select
                    labelId="inspectors"
                    id="inspectors"
                    multiple
                    value={inspector}
                    onChange={handleSelectInspectors}
                    input={<OutlinedInput label="Cleaner" />}
                    // renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                  >
                    {allInspectors.map(inspector => (
                      <MenuItem key={inspector?._id} value={inspector?._id} className="capitalize">
                        {allInspectors.length === 0 ? 'No inspector available' : `${inspector?.username}-(${inspector?.role_name})`}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </Grid>
            <Grid item lg={6} sm={6} xs={12}>
              <FormControl className="w-full">
                <InputLabel id="cleaners">Cleaners</InputLabel>
                <Select
                  labelId="cleaners"
                  id="cleaners"
                  multiple
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
            </Grid>
          </Grid>
          <div className="relative my-3">
            <label htmlFor="date" className="font-bold text-xs">
              Scheduled Date
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 rounded-lg h-12  bg-transparent shadow-sm border border-gray-400"
              value={selectedDate}
              onChange={handleDateChange}
              min={new Date().toISOString().slice(0, 10)} // Set minimum date to today
            />
          </div>
          <Box className="my-3">
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
          <div>
            {items.map((item, index) => (
              <div key={item._id} className="flex lg:flex-row flex-col items-center gap-3 my-3">
                <span className="w-full lg:w-1/3">
                  {' '}
                  <p>{item?.equipment}:</p>
                </span>
                <span className="w-full lg:w-1/3">
                  <input
                    id="number"
                    type="number"
                    placeholder="m"
                    className="border w-full h-10 md:h-10 px-5  md:text-sm rounded-[40px] outline-none focus:border-slate-400 "
                    name="quan"
                    value={item.quantity}
                    onChange={event => handleQuantityChange(index, event)}
                  />
                </span>

                <span>
                  <button
                    className="text-white flex justify-center   gap-x-2 items-center px-4 py-2 bg-blue-700 w-auto lg:h-[40px] text-base border-t-2 "
                    onClick={handleRenameAndStore}
                  >
                    Save
                  </button>
                </span>
              </div>
            ))}
          </div>
          <FormControl className="w-full my-3">
            <InputLabel id="itemstoclean"> Inventory</InputLabel>
            <Select
              labelId="itemstoclean"
              id="itemstoclean"
              multiple
              // onClick={event => {
              //   event.preventDefault();
              //   getRoomById(storedRoomId ? storedRoomId : id);
              // }}
              value={itemsToClean}
              onChange={handleSelectItemToCleaning}
              input={<OutlinedInput label=" Items to Clean" />}
              // renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {allRoomsById?.detail?.detail.length > 0 ? (
                allRoomsById?.detail?.detail?.map(item => (
                  <MenuItem key={item?._id} value={item?._id} className="capitalize">
                    {`${item?.name}`}
                  </MenuItem>
                ))
              ) : (
                <MenuItem>No Cleaner Item available</MenuItem>
              )}
            </Select>
          </FormControl>
          <div className="flex justify-center">
            <button
              className="text-white flex justify-center  mb-4 gap-x-2 items-center px-4 py-2 bg-blue-700 w-auto lg:h-[40px] text-base border-t-2 "
              // disabled={id && inspector && clean_hours}
              disabled={taskLoading}
              onClick={handleSubmit}
            >
              {taskLoading ? 'Loading...' : 'Upload Task'}
            </button>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default NetworkDetector(AddTask);
