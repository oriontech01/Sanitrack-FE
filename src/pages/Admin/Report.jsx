import React from 'react'
<<<<<<< HEAD:src/pages/Report.jsx
import '../styles/Report.scss'
import { useTranslation } from 'react-i18next';
=======
import '../../styles/Report.scss'
>>>>>>> 951514aba50d165272dd75807afb8afea79e5946:src/pages/Admin/Report.jsx

const Report = () => {
  const {t} = useTranslation()
  return (
    <div className="generate-report-container">
    <div className="center-report">
      <a href="#" className="generate-btn">{t('Generate Report')}</a>
    </div>
  </div>
  )
}

export default Report