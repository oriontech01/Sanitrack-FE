import React, { useEffect } from "react";
import "../styles/AdminDashBoard.scss"; // Import your CSS file if not already done
import Card from "../components/Cards/Card";
import useTask from "../Hooks/useTask";
import useRoom from "../Hooks/useRoom";
import { Link } from "react-router-dom";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";

const AdminHome = () => {
  const {
    activeCleaners,
    activeInspectors,
    everyTask,
    getAllCleaners,
    getAllInspectors,
    getAllTasks,
  } = useTask();
  const { roomsCount, getRoom } = useRoom();

  useEffect(() => {
    const getAllActiveCleaners = async () => {
      await getAllCleaners();
    };
    const getAllActiveInspectors = async () => {
      await getAllInspectors();
    };
    const getEveryTask = async () => {
      await getAllTasks();
    };
    const getRoomCount = async () => {
      await getRoom();
    };
    getAllActiveCleaners();
    getAllActiveInspectors();
    getEveryTask();
    getRoomCount();
  }, []);
  return (
    <>
      <div className="dashboard-container">
        <div className="dashboard-top-details">
          {/* Build the card */}
          <div className="card-container">
            <Link to="/home/user" className="active-cleaners">
              <Card title="Active Cleaners:" count={activeCleaners} />
            </Link>
          </div>
          <div className="card-container">
            <Card title="Active Inspectors:" count={activeInspectors} />
          </div>

          <div className="card-container">
            <Card title="All Tasks:" count={everyTask} />
          </div>

          <div className="card-container">
            <Card title="All Rooms:" count={roomsCount} />
          </div>
        </div>

        <div className="charts">
          <div className="bar-chart">
            <BarChart
              series={[{ data: [35, 44] }, { data: [51, 6] }]}
              height={150}
              xAxis={[{ data: ["Q1", "Q2"], scaleType: "band" }]}
              margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
              title="Staff Metrics"
            />
          </div>

          <div className="pie-chart">
            <PieChart
              series={[{
                  data: [
                    { id: 0, value: 10, label: "series A" },
                    { id: 1, value: 15, label: "series B" },
                    { id: 2, value: 20, label: "series C" },
                  ],
                },
              ]}
              width={400}
              height={200}
              title="Cleaning metrics"
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminHome;