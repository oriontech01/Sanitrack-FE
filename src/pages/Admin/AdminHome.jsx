import { useEffect } from "react";
import "../../styles/AdminDashBoard.scss"; // Import your CSS file if not already done
import Card from "../../components/Cards/Card";
import useTask from "../../Hooks/useTask";
import useRoom from "../../Hooks/useRoom";
import { Link } from "react-router-dom";
import useWorkHistory from "../../Hooks/useWorkHistory";
import Charts from "./Charts";
import Spinner from "../../components/Spinner/Spinner";


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
  const { getCleanerSummary, cleanerSummary, isLoading } = useWorkHistory();

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
    const getCleanerWorkHistorySummary = async () => {
      await getCleanerSummary();
    };
    getCleanerWorkHistorySummary();
    getAllActiveCleaners();
    getAllActiveInspectors();
    getEveryTask();
    getRoomCount();
  }, []);

  if (isLoading) {
    return <Spinner/>
  }

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
          <Charts data={cleanerSummary}/>
        </div>
      </div>
    </>
  );
};
export default AdminHome;