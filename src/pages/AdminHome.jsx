import React, { useEffect } from "react";
import '../styles/AdminDashBoard.scss';  // Import your CSS file if not already done
// import pie from '../assets/imgs/pie.png'
// import graph from "../assets/imgs/Graph (1).png"
import Card from "../components/Cards/Card";
import useTask from "../Hooks/useTask";
import useRoom from "../Hooks/useRoom";
import { Link } from "react-router-dom";
const AdminHome = () => {
    const {activeCleaners,activeInspectors, everyTask, getAllCleaners, getAllInspectors, getAllTasks} = useTask()
    const {roomsCount, getRoom} = useRoom()

    useEffect(() => { 
        const getAllActiveCleaners = async () => {await getAllCleaners()}
        const getAllActiveInspectors = async () => {await getAllInspectors()}
        const getEveryTask = async () => {await getAllTasks()}
        const getRoomCount = async () => {await getRoom()}
        getAllActiveCleaners()
        getAllActiveInspectors()
        getEveryTask()
        getRoomCount()
    }, [])
    return (
        <>
            {/* <div className="bg-color dashboard-container">
                <div className="tab_and_display">
                    <div className="tab-display">
                        <div className="center-me">
                            <div className="first-box">
                                <p>Assets</p>
                                <div className="assets-table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Asset Name</th>
                                                <th>Sub-class</th>
                                                <th>Cleaning Frequency</th>
                                                <th>Cleaning Status</th>
                                                <th>Next Due</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Kitchen</td>
                                                <td>Sink</td>
                                                <td className="daily">Daily</td>
                                                <td className="completed">Completed</td>
                                                <td>Tomorrow</td>
                                            </tr>
                                            <tr>
                                                <td>Bedroom</td>
                                                <td>Floor</td>
                                                <td className="daily">Daily</td>
                                                <td className="Pending">Pending</td>
                                                <td>Today</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="divided-data">
                            <div className="correctness">
                                <div className="ct-text">Cleaning Correctness</div>
                                <img src={pie} alt="pie-chart" className="pie-img" />
                                <div className="progress-bar">
                                    <div className="bar-1">
                                        <div></div>
                                        <p>Cleaned</p>
                                    </div>
                                    <div className="bar-2">
                                        <div></div>
                                        <p>Pending</p>
                                    </div>
                                </div>
                            </div>
                            <div className="chart-text">
                                <div className="first-t-block"></div>
                                <div className="the-chart">
                                    <img src={graph} alt="graph" className="chart-text-img" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  */}
            <div className="dashboard-container">
                <div className="dashboard-top-details">
                    {/* Build the card */}
                    <div className="card-container">
                        <Link to='/home/user' className="active-cleaners">
                            <Card title="Active Cleaners:" count={activeCleaners}/>
                        </Link>
                    </div>
                    <div className="card-container">
                        <Card title="Active Inspectors:" count={activeInspectors}/>
                    </div>

                    <div className="card-container">
                        <Card title="All Tasks:" count={everyTask}/>
                    </div>

                    <div className="card-container">
                        <Card title="All Rooms:" count={roomsCount}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminHome;
