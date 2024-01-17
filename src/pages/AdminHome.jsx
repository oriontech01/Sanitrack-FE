import React from "react";
import '../styles/AdminDashBoard.scss';  // Import your CSS file if not already done
import pie from '../assets/imgs/pie.png'
import graph from "../assets/imgs/Graph (1).png"

const AdminHome = () => {
    return (
        <>
            <div className="bg-color dashboard-container">
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
            </div> 
        </>
    );
}

export default AdminHome;
