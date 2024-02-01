import { NavLink, Outlet } from 'react-router-dom';
<<<<<<< HEAD:src/pages/WorkHistory.jsx
import '../styles/WorkHistory.scss'
import { useTranslation } from 'react-i18next';


=======
import '../../styles/WorkHistory.scss'
>>>>>>> 951514aba50d165272dd75807afb8afea79e5946:src/pages/Admin/WorkHistory.jsx

const WorkHistory = () => {
  const {t} = useTranslation()

  return (
    <div className='history-container'>
        <nav>
          <NavLink to={"/home/work-history/rooms"}>{t('Rooms')}</NavLink>
          <NavLink to={"/home/work-history/inspectors"}>{t('Inspectors')}</NavLink>
          <NavLink to={"/home/work-history/cleaners"}>{t("Cleaner")}</NavLink>
        </nav>
        <div className='work-history-list'>
           <Outlet />
        </div>
    </div>
  )
}

export default WorkHistory