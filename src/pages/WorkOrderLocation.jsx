import React from 'react';
import '../styles/WorkOrderLocation.scss';
import { useTranslation } from 'react-i18next';


const WorkOrderLocation = () => {
  const {t} = useTranslation()

  return (
    <div className="bg-color container 
    .work-order-location-container">
      <div className="rooms-container">
        <div className="room-row1">
          <a href="#" className="room-a rooms_all">{t('ROOM A')}</a>
          <a href="#" className="room-b rooms_all">{t('ROOM B')}</a>
        </div>
        <div className="room-row2">
          <a href="#" className="room-c rooms_all">{t('ROOM C')}</a>
          <a href="#" className="room-d rooms_all">{t('ROOM D')}</a>
        </div>
      </div>
    </div>
  );
};

export default WorkOrderLocation;
