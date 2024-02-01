import React from 'react'
import { NavLink, Outlet } from 'react-router-dom';
import '../styles/WorkHistory.scss'
import { useTranslation } from 'react-i18next';



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