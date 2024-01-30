import { NavLink, Outlet } from 'react-router-dom';
import '../../styles/WorkHistory.scss'

const WorkHistory = () => {
  return (
    <div className='history-container'>
        <nav>
          <NavLink to={"/home/work-history/rooms"}>Rooms</NavLink>
          <NavLink to={"/home/work-history/inspectors"}>Inspectors</NavLink>
          <NavLink to={"/home/work-history/cleaners"}>Cleaner</NavLink>
        </nav>
        <div className='work-history-list'>
           <Outlet />
        </div>
    </div>
  )
}

export default WorkHistory