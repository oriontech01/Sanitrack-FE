import React from 'react'
import '../styles/Report.scss'
import { useTranslation } from 'react-i18next';

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