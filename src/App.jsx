import './App.scss'
import Login from './pages/Login'
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import Room from './pages/Room';
import AdminHome from './pages/AdminHome';
import Tasks from './pages/Tasks';
import SideNav from './components/SideNav/SideNav';
import Staff from './pages/Staff';
import AddUser from './pages/AddUser';
import AddRoom from './pages/AddRoom';
import RoomDetails from './pages/RoomDetails';
import AddTask from './pages/AddTask';
import Report from './pages/Report';
import useAuth from './Hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import ProtectedRoute from './pages/ProtectedRoute';
import TaskDetails from './pages/TaskDetails';
function App() {
  const [isLoggedIn, setLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const {logout} = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    setLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false');
    alert("You have been logged out!")
    navigate('/')
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Login onLogin={() => setLoggedIn(true)} />} />
      </Routes>
      {isLoggedIn && (
          <SideNav handleLogout={handleLogout}>
            <Routes>
              <Route path="/admin-home" element={<AdminHome />} />
              
              <Route path="/home/user" element={<Staff />} />
              <Route path="/home/add-user" element={<AddUser />} />

              <Route path="/home/room" element={<Room />} />
              <Route path="/home/add-room" element={<AddRoom />} />
              <Route path="/home/view-details/:roomId" element={<RoomDetails />} />

              <Route path="/home/tasks" element={<Tasks />} />
              <Route path="/home/add-task" element={<AddTask />} />

              <Route path="/home/report" element={<Report/>} />
              <Route path='/home/edit-task/:taskId' element = {<TaskDetails/>}/>

            </Routes>
          </SideNav>  
      )}
    </>
  );
}

export default App;

