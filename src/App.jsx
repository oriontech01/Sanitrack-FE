import './App.scss'
import Login from './pages/Login'
import {Routes, Route} from 'react-router-dom'
import WorkOrderSelection from './pages/WorkOrderSelection'
import BarCode from './pages/BarCode';
import WorkOrderLocation from './pages/WorkOrderLocation';
import Room from './pages/Room';
function App() {
  return (
    <div>
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/home" element={<WorkOrderSelection/>}/>
      <Route path="/home/barcode-scan" element={<BarCode/>}/> 
      <Route path="/home/work-order-location" element={<WorkOrderLocation/>}/>
      <Route path="/home/room" element={<Room/>} />
    </Routes>
    </div>
  )
}

export default App
