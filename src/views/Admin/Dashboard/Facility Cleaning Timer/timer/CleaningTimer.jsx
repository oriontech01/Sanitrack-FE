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
    if (currentPage !== Math.ceil(allCleanerTimer.length / itemsPerPage)) {
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
      const response = await axios.get(`${BASE_URL}room-timer/planned`, {
        headers: { Authorization: `Bearer ${access_token}` }
      });
      console.log('Task retrieved', response.data);
      if (response.data) {
        setAllCleanerTimer(response.data.data.result);
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
              {currentItems?.map((item, i) => {
                const newItem = item?.allTask[0];
                console.log('secf', item);
                return (
                  <div className="shadow-lg" key={i}>
                    <Link style={{ textDecoration: 'none' }} to={`/dashboard/work-order-facility/${newItem?.assigned_room?._id}`}>
                      <div className="div-47">
                        <SpeedometerValue
                          cleanTime={
                            newItem?.task_stage.toLowerCase() === 'clean'
                              ? 25
                              : newItem?.task_stage.toLowerCase() === 'preop'
                                ? 60
                                : newItem?.task_stage.toLowerCase() === 'release'
                                  ? 90
                                  : 0
                          }
                        />

                        <div className="div-48 capitalize">{newItem?.assigned_room?.roomName}</div>
                        <div className="div-49">
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
                              <div className="div-71">{ convertSecondsToHMS(newItem ?newItem?.planned_time?.clean_time: 0) ?? '-' }</div>
                              <div className="div-72">{ convertSecondsToHMS(newItem ?newItem?.planned_time?.preOp_time:0) ?? '-'}</div>
                              <div className="div-73">{convertSecondsToHMS(newItem ?newItem?.planned_time?.release_time :0) ?? '-'}</div>
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
                        </div>
                      </div>

                      <div className="column-6">
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
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
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
        </div>
      )}
    </>
  );
};
export default CleaningTimer;
