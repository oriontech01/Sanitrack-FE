/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Box, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import useTask from 'Hooks/useTask';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SelectInspector = () => {
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
  const params = useParams();

  const { getAllInspectors, assignInspectorsForFacility, taskLoading, allInspectors } = useTask();
  useEffect(() => {
    getAllInspectors();
  }, []);
  const navigate = useNavigate();
  const [inspector, setAllInspectors] = useState([]);
  const [clean_hours, setClean_hours] = useState('');
  const [clean_minutes, setClean_minutes] = useState('');
  const [preop_hours, setPreop_hours] = useState('');
  const [preop_minutes, setPreop_minutes] = useState('');
  const [inspect_hours, setInspect_Hours] = useState('');
  const [inspect_minutes, setInspect_Mins] = useState('');
  const [release_hours, setRelease_Hours] = useState('');
  const [release_minutes, setRelease_Mins] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = event => {
    console.log('first', event.target.value);
    // setViewDate(event.target.value);
    setSelectedDate(event.target.value);
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
  const handleSubmit = e => {
    e.preventDefault();
    const data = {
      facility_id: params.id,
      assigned_inspector: inspector,
      scheduled_date: selectedDate,
      stages: [
        { name: 'clean', stage_hour: clean_hours, stage_minute: clean_minutes },
        { name: 'preop', stage_hour: preop_hours, stage_minute: preop_minutes },
        { name: 'release', stage_hour: release_hours, stage_minute: release_minutes },
        { name: 'inspect', stage_hour: inspect_hours, stage_minute: inspect_minutes }
      ]
    };
    localStorage.setItem("inspectors",JSON.stringify(inspector))
    console.log(data);
    assignInspectorsForFacility(data);
  };
  return (
    <div className="w-full">
      <ToastContainer />
      <header className="flex lg:flex-row flex-col justify-between items-center pb-10">
        <span className="flex gap-x-2 items-center cursor-pointer" onClick={() => navigate(-1)}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M18.6667 9.33268L12 15.9993L18.6667 22.666"
              stroke="#3366FF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <h1 className="text-2xl font-bold text-[#3366FF]">Select Inspectors</h1>
        </span>
      </header>
      <form>
        <div className="form-group">
          <label className=" text-blue-500 font-bold">Select Inspectors</label>
          <FormControl className="w-full mt-2">
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
        <div className="relative my-3">
          <label htmlFor="date" className=" text-blue-500 font-bold">
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
          <h1 className="text-sm text-blue-500 font-bold pb-2">Enter Clean Time</h1>
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
                    {Array.from({ length: 24 }, (_, i) => (
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
                    {Array.from({ length: 60 }, (_, i) => (
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
          <h1 className="text-sm text-blue-500 font-bold pb-2">Enter Pre-Op Time</h1>
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
                    {Array.from({ length: 24 }, (_, i) => (
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
                    {Array.from({ length: 60 }, (_, i) => (
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
          <h1 className="text-sm text-blue-500 font-bold pb-2">Enter Inspect Time</h1>
          <Grid container spacing={4}>
            <Grid item lg={6} sm={6} xs={12}>
              <Box sx={{ mb: 2 }}>
                <FormControl className="w-full">
                  <InputLabel id="cleaners"> Inspect hours</InputLabel>
                  <Select
                    labelId="cleaners"
                    id="cleaners"
                    value={inspect_hours}
                    onChange={e => {
                      setInspect_Hours(e.target.value);
                    }}
                    input={<OutlinedInput label="Cleaner" />}
                    // renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                  >
                    {Array.from({ length: 24 }, (_, i) => (
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
                  <InputLabel id="cleaners"> Inspect minutes</InputLabel>
                  <Select
                    labelId="cleaners"
                    id="cleaners"
                    value={inspect_minutes}
                    onChange={e => {
                      setInspect_Mins(e.target.value);
                    }}
                    input={<OutlinedInput label="Cleaner" />}
                    // renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                  >
                    {Array.from({ length: 60 }, (_, i) => (
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
          <h1 className="text-sm text-blue-500 font-bold pb-2">Enter Release Time</h1>
          <Grid container spacing={4}>
            <Grid item lg={6} sm={6} xs={12}>
              <Box sx={{ mb: 2 }}>
                <FormControl className="w-full">
                  <InputLabel id="cleaners"> Release hours</InputLabel>
                  <Select
                    labelId="cleaners"
                    id="cleaners"
                    value={release_hours}
                    onChange={e => {
                      setRelease_Hours(e.target.value);
                    }}
                    input={<OutlinedInput label="Cleaner" />}
                    // renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                  >
                    {Array.from({ length: 24 }, (_, i) => (
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
                  <InputLabel id="cleaners"> Release minutes</InputLabel>
                  <Select
                    labelId="cleaners"
                    id="cleaners"
                    value={release_minutes}
                    onChange={e => {
                      setRelease_Mins(e.target.value);
                    }}
                    input={<OutlinedInput label="Cleaner" />}
                    // renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                  >
                    {Array.from({ length: 60 }, (_, i) => (
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
        <div className="flex justify-end">
          <button
            className="text-white flex justify-center  mb-4 gap-x-2 items-center px-4 py-2 bg-blue-700 w-1/2 lg:h-[40px] text-base border-t-2 "
            // disabled={id && inspector && clean_hours}
            disabled={taskLoading}
            onClick={handleSubmit}
          >
            {taskLoading ? 'Loading...' : 'Next'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SelectInspector;
