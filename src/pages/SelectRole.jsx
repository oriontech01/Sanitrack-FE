import React from 'react'
import { useTranslation } from 'react-i18next';

const SelectRole = () => {
  const {t} = useTranslation()
  return (
    <div>{t('SelectRole')}</div>
  )
}

export default SelectRole