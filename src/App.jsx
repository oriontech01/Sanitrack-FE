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
function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  console.log('value of logged in', isLoggedIn)
  return (
    <>
      <Routes>
        <Route path="/" element={<Login onLogin={() => setLoggedIn(true)} />} />
      </Routes>
      {isLoggedIn && (
          <SideNav>
            <Routes>
              <Route path="/admin-home" element={<AdminHome />} />
              <Route path="/home/user" element={<Staff />} />
              <Route path="/home/add-user" element={<AddUser />} />
              <Route path="/home/room" element={<Room />} />
              <Route path="/home/add-room" element={<AddRoom />} />
              <Route path="/home/view-details/:roomId" element={<RoomDetails />} />
              <Route path="/home/tasks" element={<Tasks />} />
              <Route path="/home/add-task" element={<AddTask />} />
            </Routes>
          </SideNav>
        )}
      
    </>
      
  )
}
export default App
