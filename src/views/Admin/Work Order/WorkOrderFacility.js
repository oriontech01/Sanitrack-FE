/* eslint-disable react/no-deprecated */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import useRoom from 'Hooks/useRoom';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import QRCode from 'react-qr-code';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Paper,
  TablePagination
} from '@mui/material';
const WorkOrderFacility = () => {
  const { singleRoomTask, getSingleRoomTaskById, responseMessage, isLoading } = useRoom();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    getSingleRoomTaskById(params.workId);
  }, []);
  console.log('second', singleRoomTask);
  const LocationName = localStorage.getItem('locationName');
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
      <header className="flex  lg:flex-row flex-col justify-between items-center mb-10">
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

          <h1 className="text-3xl font-bold text-[#3366FF]">Facility Details</h1>
        </span>
      </header>
      {responseMessage && !isLoading && (
        <div className="flex justify-center items-center h-screen">
          <p className="text-lg text-red-500 font-bold">{responseMessage}</p>
        </div>
      )}
      {isLoading && (
        <div className="loader">
          <div className="justify-content-center jimu-primary-loading"></div>
        </div>
      )}
      {!isLoading && singleRoomTask && (
        <>
          <div className="flex  lg:flex-row flex-col justify-between items-start gap-y-2">
            <div className="flex flex-col gap-y-4">
              <span className="flex flex-col gap-y-2">
                <p className="text-lg text-black">Facility Name</p>
                <p className="text-lg text-blue-500">{singleRoomTask?.allItemsInRoom?.roomName}</p>
              </span>
              <span className="flex flex-col gap-y-2">
                <p className="text-lg text-black">Facility Location</p>
                <p className="text-lg text-blue-500">{`${singleRoomTask?.taskDetails?.assigned_location?.city}- ${singleRoomTask?.taskDetails?.assigned_location?.country}`}</p>
              </span>
              <span className="flex flex-col gap-y-2">
                <p className="text-lg text-black">Number of Items in Facility </p>
                <p className="text-lg text-blue-500">{singleRoomTask?.allItemsInRoom?.detail?.detail?.length}</p>
              </span>
            </div>
            <div className="flex lg:flex-row flex-col items-center gap-x-4">
              <div>
                <button
                  className="text-white flex justify-center  mb-4 gap-x-2 items-center px-4 py-2 bg-blue-700 w-auto lg:h-[40px] text-base border-t-2 "
                  // disabled={id && inspector && clean_hours}
                >
                  Print QR Code
                </button>
              </div>
              <div>
                <h1 className="text-lg font-bold text-[#3366FF] pb-2">Property QR Code</h1>
                <div className="w-auto">
                  <div className="border-8 border-black p-4 rounded-t-lg flex justify-center items-center">
                    <QRCode value={params.workId} height={10} className="w-16 h-16  md:h-32 md:w-32" />
                  </div>
                  <span className="flex justify-center items-center py-4 bg-black text-[#fff] uppercase font-bold text-xl rounded-b-lg">
                    scan me
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex  lg:flex-row flex-col gap-x-10 gap-y-4 items-center mt-10">
            <div className="lg:w-1/2 w-full rounded-lg bg-blue-200 p-5">
              <h1 className="text-lg font-bold text-[#3366FF] ">Planned Time</h1>
              <div className="flex flex-col gap-y-4 pt-3">
                <div className="flex justify-between items-center">
                  <p className="text-lg text-blue-500">Clean </p>
                  <p className="text-lg text-blue-500">
                    {convertSecondsToHMS(singleRoomTask?.taskDetails?.planned_time?.clean_time) ?? '-'}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-lg text-blue-500">Preop </p>
                  <p className="text-lg text-blue-500">
                    {convertSecondsToHMS(singleRoomTask?.taskDetails?.planned_time?.preOp_time) ?? '-'}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-lg text-blue-500">Release </p>
                  <p className="text-lg text-blue-500">
                    {convertSecondsToHMS(singleRoomTask?.taskDetails?.planned_time?.release_time) ?? '-'}
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 w-full rounded-lg bg-red-200 p-5">
              <h1 className="text-lg font-bold text-red-500">Actual Time</h1>
              <div className="flex flex-col gap-y-4 pt-3">
                <div className="flex justify-between items-center">
                  <p className="text-lg text-red-500">Clean </p>
                  <p className="text-lg text-red-500">
                    {convertMilliSecondsToHMS(
                      singleRoomTask?.actualTime
                        ? singleRoomTask?.actualTime?.clean_time.time.reduce((acc, current) => acc + Number(current), 0)
                        : 0
                    )}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-lg text-red-500">Preop </p>
                  <p className="text-lg text-red-500">
                    {convertMilliSecondsToHMS(
                      singleRoomTask?.actualTime
                        ? singleRoomTask?.actualTime?.preOp_time.time.reduce((acc, current) => acc + Number(current), 0)
                        : 0
                    )}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-lg text-red-500">Release </p>
                  <p className="text-lg text-red-500">
                    {convertMilliSecondsToHMS(singleRoomTask?.actualTime ? singleRoomTask?.actualTime?.release_time : 0)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Paper style={{ marginTop: 20 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Room name</TableCell>
                  <TableCell>Assigned Inspectors</TableCell>
                  <TableCell>Assigned Cleaners</TableCell>
                  <TableCell>Stage</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell> {singleRoomTask?.allItemsInRoom?.roomName}</TableCell>

                  {/* Consolidated Inspector Names */}
                  <TableCell>{singleRoomTask?.taskDetails?.assigned_inspector.map(inspector => inspector?.username).join(', ')}</TableCell>

                  {/* Consolidated Cleaner Names */}
                  <TableCell className="flex flex-col border-none">
                    {singleRoomTask?.taskDetails?.assigned_cleaner.map(cleaner => cleaner?.username).join(', ')}
                  </TableCell>

                  <TableCell className="capitalize">{singleRoomTask?.taskDetails?.task_stage}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </>
      )}
    </>
  );
};

export default WorkOrderFacility;
