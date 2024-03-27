import * as React from 'react';
import { Link } from 'react-router-dom';
import './san.css';
import ProgressBar from '../component/ProgressBar';
// import Speedometer from '../component/Speedometer';
import { data } from '../component/Constant';
import SpeedometerValue from '../component/SpeedometerValue';
import axios from 'axios';
import { Pagination, Stack, Typography } from '@mui/material';
import FreePagination from 'component/pagination/FreePagination';
import { useState } from 'react';

const CleaningTimer = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const access_token = localStorage.getItem('auth-token');
  const [loading, setLoading] = React.useState(false);
  const [allCleanerTimer, setAllCleanerTimer] = React.useState([]);
  const [responseMessage, setResponseMessage] = React.useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const [name, setName] = useState('');
  // ...

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allCleanerTimer?.reverse().slice(indexOfFirstItem, indexOfLastItem);

  const paginate = pageNumber => {
    setCurrentPage(pageNumber);
  };

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== Math.ceil(allCleanerTimer?.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  const firstPage = () => {
    setCurrentPage(1);
  };
  const lastPage = () => {
    setCurrentPage(Math.ceil(allCleanerTimer?.length / itemsPerPage));
  };
  console.log('firstpage', currentItems);
  const getCleanerTimer = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}work-facility/facility-cleaning-dashboard`, {
        headers: { Authorization: `Bearer ${access_token}` }
      });
      console.log('Task retrieved', response.data.data);
      if (response.data) {
        setAllCleanerTimer(response.data?.data);
        setLoading(false);
      }
    } catch (error) {
      if (error.response) {
        setLoading(false);
        const { status, data } = error.response;
        console.log('An error occurred', data.message || 'Error');
        setResponseMessage(data.message || 'Error');

        if (status === 403) {
          // Use navigate to redirect
          //   navigate('/'); // Make sure navigate is passed correctly if used outside of a component
        }
      } else {
        setLoading(false);
        console.log('Network error:', error.message);
      }
    }
  };

  React.useEffect(() => {
    getCleanerTimer();
  }, []);

  const cleanTime = 96;
  const convertSecondsToHMS = totalSeconds => {
    const hours = Math.floor(totalSeconds / 3600);
    const remainingSecondsAfterHours = totalSeconds % 3600;
    const minutes = Math.floor(remainingSecondsAfterHours / 60);
    const remainingSeconds = remainingSecondsAfterHours % 60;

    return <p>{`${hours}: hrs ${minutes}: mins ${remainingSeconds}: s`}</p>;
  };
  const convertMilliSecondsToHMS = milli => {
    const totalSeconds = Math.floor(milli / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const remainingSecondsAfterHours = totalSeconds % 3600;
    const minutes = Math.floor(remainingSecondsAfterHours / 60);
    const remainingSeconds = remainingSecondsAfterHours % 60;

    return <p>{`${hours}: hrs ${minutes}: mins ${remainingSeconds}: s`}</p>;
  };
  const getTimeValue = name => {
    switch (name) {
      case 'clean':
        return 200;
      case 'preop':
        return 450;
      case 'release':
        return 700;
      case 'inspect':
        return 1000;
      default:
        return 0; // Or whatever default value you prefer
    }
  };
  function convertToHoursMinutesSeconds(dateString) {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }
  function convertDateFormat(dateString) {
    try {
      const dateObj = new Date(dateString);
      const day = dateObj.getDate().toString().padStart(2, '0');
      const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
      const year = dateObj.getFullYear();
      return `${day} - ${month} - ${year}`;
    } catch (error) {
      console.error('Invalid date format:', error);
      return 'Invalid Date';
    }
  }
  return (
    <>
      {loading && (
        <div className="loader">
          <div className="justify-content-center jimu-primary-loading"></div>
        </div>
      )}
      {!loading && (
        <div className="bg-[#fff] mt-5 p-4 flex flex-col">
          <div className="">
            <h1 className="text-blue-500 text-lg font-bold">Overall System Performance</h1>
            <div className="flex justify-center items-center">
              <div className="w-72 h-72 flex">
                <ProgressBar />
              </div>
            </div>
          </div>
          <div className="">
            <div className="grid lg:grid-cols-3 gap-6 mt-4 grid-cols-1">
              {console.log(currentItems)}
              {allCleanerTimer?.length > 0 &&
                currentItems?.map((item, i) => {
                  const newItem = item?.resultItem;
                  const latest = item?.resultItem?.stages;
                  const actual = item?.actualTime;
                  console.log('secf', item);
                  latest.map(speed => {
                    console.log('wey', actual?.stages[actual?.stages.length - 1]?.name);
                  });
                  return (
                    <div className="shadow-lg" key={i}>
                      <Link style={{ textDecoration: 'none' }} to={`/dashboard/work-order-facility/${newItem?._id}`}>
                        <div className="div-47">
                          <SpeedometerValue
                            cleanTime={
                              getTimeValue(actual?.stages[actual?.stages.length - 1]?.name)
                              //   newItem?.task_stage.toLowerCase() === 'clean'
                              //     ? 25
                              //     : newItem?.task_stage.toLowerCase() === 'preop'
                              //       ? 60
                              //       : newItem?.task_stage.toLowerCase() === 'release'
                              //         ? 90
                              //         : 0
                              // }
                            }
                          />

                          <div className="div-48 capitalize text-xl">
                            {item?.resultItem?.facility_id?.facility_name ? item?.resultItem?.facility_id?.facility_name : 'N/A'}
                          </div>
                          <div className="w-full px-4">
                            <h1 className="text-LG text-blue-500 font-bold ">Planned Time</h1>
                            {latest?.map(stage => (
                              <span key={stage?.name} className="flex justify-between items-center ">
                                <p className="text-gray-400 text-sm capitalize">{`${stage?.name} `}</p>
                                <p>{stage?.start_time ? convertDateFormat(stage?.start_time) : 'N/A'}</p>
                              </span>
                            ))}
                          </div>
                          <div className="w-full px-4 mt-3">
                            <h1 className="text-LG text-blue-500 font-bold ">Actual Time</h1>
                            {actual?.stages?.map(stage => (
                              <span key={stage?.name} className="flex justify-between items-center ">
                                <p className="text-gray-400 text-sm capitalize">{`${stage?.name} `}</p>
                                <p>
                                  {stage?.actual_stage_start_time ? convertToHoursMinutesSeconds(stage?.actual_stage_start_time) : 'N/A'}
                                </p>
                              </span>
                            ))}
                          </div>
                          <div className="flex  flex-col gap-y-2 px-4 w-full mt-3">
                            <h1 className="text-lg font-bold text-blue-500 ">Supervisors</h1>
                            {newItem?.assigned_supervisors?.map(stage => (
                              <span key={stage?.name} className="border border-dotted border-gray-200 p-2">
                                <p className="text-blue-500  font-bold text-base capitalize">{`${stage?.username} `}</p>
                                <p className="text-gray-300  font-thin text-sm capitalize">{`${stage?.address_id} `}</p>
                                <div className="flex justify-between pt-2">
                                  <a href={`mailto:${stage?.email}`}>
                                    {' '}
                                    <img
                                      alt=""
                                      loading="lazy"
                                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/fe3d622b5bd936f2a023fbc2a223e744c330598e2acd6499c9c3913b5ca0a49d?"
                                      className="img-17"
                                    />
                                  </a>

                                  <img
                                    alt=""
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/f1b34ffbd3c5f828d8a17a1e4660414999adbb811d9353f62e479d5a2c254c33?"
                                    className="img-18"
                                  />
                                </div>
                              </span>
                            ))}
                          </div>
                          {/* <div className="div-49">
                            <div className="div-50">
                              <div className="div-51">
                                <div className="div-52" />
                                <div className="div-53">Clean</div>
                              </div>
                              <div className="div-54">
                                <div className="div-55" />
                                <div className="div-56">Pre-Op</div>
                              </div>
                              <div className="div-57">
                                <div className="div-58" />
                                <div className="div-59">Release</div>
                              </div>
                            </div>
                            <div className="div-60">Planned Time</div>
                            <div className="div-61">
                              <div className="div-62">
                                <div className="div-63">Clean</div>
                                <div className="div-64">Pre-Op</div>
                                <div className="div-65">Release</div>
                                <div className="div-66">Actual Time</div>
                                <div className="div-67">Clean</div>
                                <div className="div-68">Pre-Op</div>
                                <div className="div-69">Release</div>
                              </div>
                              <div className="div-70">
                                <div className="div-71">{convertSecondsToHMS(newItem ? newItem?.planned_time?.clean_time : 0) ?? '-'}</div>
                                <div className="div-72">{convertSecondsToHMS(newItem ? newItem?.planned_time?.preOp_time : 0) ?? '-'}</div>
                                <div className="div-73">
                                  {convertSecondsToHMS(newItem ? newItem?.planned_time?.release_time : 0) ?? '-'}
                                </div>
                                <div className="div-74">
                                  {convertMilliSecondsToHMS(
                                    item?.actualTime
                                      ? item?.actualTime?.clean_time.time.reduce((acc, current) => acc + Number(current), 0)
                                      : 0
                                  )}
                                </div>
                                <div className="div-75">
                                  {convertMilliSecondsToHMS(
                                    item?.actualTime
                                      ? item?.actualTime?.preOp_time.time.reduce((acc, current) => acc + Number(current), 0)
                                      : 0
                                  )}
                                </div>
                                <div className="div-76">
                                  {convertMilliSecondsToHMS(item?.actualTime ? item?.actualTime?.release_time : 0)}
                                </div>
                              </div>
                            </div>
                          </div> */}
                        </div>

                        {/* <div className="column-6">
                          {newItem?.assigned_inspector.map(inspector => (
                            <div className="div-139" key={inspector?._id}>
                              <div className="div-140">{inspector?.username}</div>
                              <div className="div-141">{inspector?.addressId}</div>
                              <div className="div-142">
                                <img
                                  alt=""
                                  loading="lazy"
                                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/fe3d622b5bd936f2a023fbc2a223e744c330598e2acd6499c9c3913b5ca0a49d?"
                                  className="img-17"
                                />
                                <img
                                  alt=""
                                  loading="lazy"
                                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/f1b34ffbd3c5f828d8a17a1e4660414999adbb811d9353f62e479d5a2c254c33?"
                                  className="img-18"
                                />
                              </div>
                            </div>
                          ))}

                          <div className="column-6">
                            {newItem?.assigned_cleaner.map(cleaner => (
                              <div className="div-139" key={cleaner?._id}>
                                <div className="div-140">{cleaner?.username ?? '-'}</div>
                                <div className="div-141">{cleaner?.addressId ?? '-'}</div>
                                <div className="div-142">
                                  <img
                                    alt=""
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/fe3d622b5bd936f2a023fbc2a223e744c330598e2acd6499c9c3913b5ca0a49d?"
                                    className="img-17"
                                  />
                                  <img
                                    alt=""
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/f1b34ffbd3c5f828d8a17a1e4660414999adbb811d9353f62e479d5a2c254c33?"
                                    className="img-18"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div> */}
                      </Link>
                    </div>
                  );
                })}

              {allCleanerTimer?.length === 0 && <Typography variant="h2">No tasks available</Typography>}
            </div>
          </div>
          {allCleanerTimer?.length > 0 && (
            <FreePagination
              itemsPerPage={itemsPerPage}
              totalItems={allCleanerTimer?.length}
              paginate={paginate}
              previousPage={previousPage}
              nextPage={nextPage}
              currentPage={currentPage}
              firstPage={firstPage}
              lastPage={lastPage}
            />
          )}
        </div>
      )}
    </>
  );
};
export default CleaningTimer;
