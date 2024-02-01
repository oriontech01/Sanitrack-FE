import React from 'react';
import '../styles/WorkOrderSelection.scss'; // Adjust the relative path as necessary
import { useTranslation } from 'react-i18next';


const WorkOrderSelection = () => {
  const {t} = useTranslation()

  return (
    <div className="bg-color">
      <div className="workorder-btn-container">
        <a href="../barcode_scanner.html" className="scan-barcode">
          <p>{t('Scan barcode to')} <br />{t('view work order')}</p>
        </a>
        <a href="room_list.html" className="select-from-list">
          <p>{t('Select from list')}</p>
        </a>
      </div>
    </div>
  );
};

export default WorkOrderSelection;
