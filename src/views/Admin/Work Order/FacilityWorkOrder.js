/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import useLocation from 'Hooks/useLocation';
import useRoom from 'Hooks/useRoom';
import useTask from 'Hooks/useTask';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { ToastContainer } from 'react-toastify';
import { toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SuccessModal from './SuccessModal';
import ModalComponent from 'component/Modals/Modal';

const FacilityWorkOrder = () => {
  const [taskLoading, setTaskLoading] = useState(false);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const access_token = localStorage.getItem('auth-token');
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

  const {
    getUnassignedRoomById,
    allUnassignedRoomsById,
    isLoading,
    getRoom,
    allRooms,
    responseMessage,
    getAssignedRoomById,
    allAssignedRoomsById,
    getRoomById,
    allRoomsById
  } = useRoom();
  const {
    getUnAssignedRooms,
    getAllCleaners,
    getAllInspectors,

    unAssignedRooms,
    allCleaners,
    allInspectors,
    getCleaningItems,
    cleaningItems
  } = useTask();

  useEffect(() => {
    getAllCleaners();
    getCleaningItems()
  }, []);
  const { getLocation, allLocations, loading } = useLocation();

  //   const [id, setId] = useState('');
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

    const filteredItems = specificRoom?.detail?.detail?.filter(obj => value.includes(obj._id));
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
  const LocationId = localStorage.getItem('locationId');
  useEffect(() => {
    getAssignedRoomById(LocationId);
  }, []);

  const [selectedTasks, setSelectedTasks] = useState([]);
  const [id, setId] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [specificRoom, setSpecificROOM] = useState([]);
  const handleCheckboxChange = room => {
    setId(room._id);
    setSpecificROOM(room);
    // if (selectedTasks.some(task => task.taskId === taskId)) {
    //   setSelectedTasks(selectedTasks.filter(task => task.taskId !== taskId));
    // } else {
    //   setSelectedTasks([...selectedTasks, { taskId }]);
    // }
  };
  const gottenItems = JSON.parse(localStorage.getItem('selectedItems'));

  const filteredRooms = allAssignedRoomsById?.filter(obj => !gottenItems?.includes(obj._id));
  const params = useParams();
  const savedInspectors = JSON.parse(localStorage.getItem('inspectors'));
  const locationId = localStorage.getItem('locationId');
  const addTask = async data => {
    setTaskLoading(true);
    await axios
      .post(
        `${BASE_URL}task/create`,

        data,
        { headers: { Authorization: `Bearer ${access_token}` } }
      )
      .then(response => {
        console.log(response);
        // send user back to the task home page
        if (response.data) {
            setCleaningItem([])
            setCleaners([])
            setItemsToClean([])
            setItems([])
          toast.success('Task Created Successfully', {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
            transition: Flip
          });
          setTaskLoading(false);
          if (gottenItems?.some(item => item === id)) {
            localStorage.setItem('selectedItems', JSON.stringify(selectedItems.filter(task => task !== id)));
          } else {
            if (id) {
              setSelectedItems([...selectedItems, id]);
              localStorage.setItem('selectedItems', JSON.stringify([...selectedItems, id]));
            }
          }
        }
        // setTimeout(() => {
        //   navigate(`/dashboard/work-order-facility/${id}`);
        // }, 3000);

        // console.log(response.json())
      })
      .catch(error => {
        if (error.response) {
          setTaskLoading(false);
          const { status, data } = error.response;
          toast.error(data.message, {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
            transition: Flip
          });
          if (status === 400 && data && data.message) {
            setResponseMessage(data.message);
            console.log('An error occured', data.message);
          } else if (status === 403 && data && data.message) {
            // navigate('/')
          } else {
            console.log('Axios error:', error);
          }
        } else {
          setTaskLoading(false);
          console.log('Network error:', error.message);
        }
      });
  };
  const handleSubmit = e => {
    e.preventDefault();
    const data = {
      facilityWorkOrderId: params.id,
      roomId: id,
      inspectors: savedInspectors,
      cleaners: cleaners,
      locationId: locationId,
      cleaningData: modifiedItem,
      itemsToClean: filteredItems
    };
    addTask(data);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = e => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <header className="flex lg:flex-row flex-col justify-between items-center pb-10">
        <h1 className="text-2xl font-bold text-[#3366FF]">Set Work Order</h1>
      </header>
      <div className="flex flex-col lg:flex-row gap-x-6 gap-y-4 items-start">
        <div className="lg:w-1/3 w-full">
          {!isLoading &&
            (allAssignedRoomsById.length > 0 ? (
              filteredRooms.map(room => (
                <span
                  //   onClick={() => {
                  //     localStorage.setItem('roomId', `${room?._id}`);
                  //   }}
                  //   to={`/dashboard/create-work-order`}
                  key={room?._id}
                  className="bg-[#EBF0FF] bg-opacity-90 px-3 py-3 flex justify-between items-center w-full text-[#3366FF] font-bold shadow-sm"
                >
                  <span className="flex gap-x-2 items-center">
                    <p className="capitalize ">{`${room?.roomName}`}</p>
                  </span>
                  <span>
                    <input
                      type="checkbox"
                      id={room._id}
                      checked={id === room._id}
                      // checked={selectedTasks.some(selectedTask => selectedTask.taskId === room.task_id)}
                      onChange={() => handleCheckboxChange(room)}
                      className=""

                      // onChange={event => handleChange(index, event)}
                    />
                  </span>
                </span>
              ))
            ) : (
              <p className="text-red-400 font-medium">No Assigned Rooms for this facility</p>
            ))}
          {isLoading && (
            <div className="flex items-center justify-center pt-5">
              <div className="relative">
                <div className="h-16 w-16 rounded-full border-t-8 border-b-8 border-gray-200"></div>
                <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
              </div>
            </div>
          )}
        </div>
        <div className="lg:w-2/3 w-full border-2 border-blue-500 p-4">
          <div>
            <ToastContainer />

            <div className="flex flex-col gap-y-3">
              <div>
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
              </div>
              <div>
                <FormControl className="w-full">
                  <InputLabel id="cleanersItem">Cleaning Item</InputLabel>
                  <Select
                    labelId="cleanersItem"
                    id="cleanersItem"
                    multiple
                   
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
                    {specificRoom?.detail?.detail.length > 0 ? (
                      specificRoom?.detail?.detail?.map(item => (
                        <MenuItem key={item?._id} value={item?._id} className="capitalize">
                          {`${item?.name}`}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem>No Cleaner Item available</MenuItem>
                    )}
                  </Select>
                </FormControl>
                <div className="flex justify-end">
                  <button
                    className="text-white flex justify-center  mb-4 gap-x-2 items-center px-4 py-2 bg-blue-700 w-40 lg:h-[40px] text-base border-t-2 "
                    // disabled={id && inspector && clean_hours}
                      disabled={taskLoading}
                    onClick={handleSubmit}
                  >
                    {taskLoading ? 'Loading...' : 'Save'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-5">
          <button
            className="text-white flex justify-center  mb-4 gap-x-2 items-center px-4 py-2 bg-blue-700 w-1/2 lg:h-[40px] text-base border-t-2 "
            // disabled={id && inspector && clean_hours}
            // disabled={taskLoading}
            onClick={openModal}
          >
           Next
          </button>
        </div>
      {/* <button onClick={handleSubmit}>Submit</button> */}
      <ModalComponent isOpen={isModalOpen} onClose={closeModal} setIsModalOpen={setIsModalOpen}>
        <SuccessModal closeModal={closeModal} />
      </ModalComponent>
    </>
  );
};

export default FacilityWorkOrder;
