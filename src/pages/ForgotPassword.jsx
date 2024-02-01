import { useTranslation } from 'react-i18next';

const ForgotPassword = () => {
  const {t} = useTranslation()
  return (
    <div>{t('ForgotPassword')}</div>
  )
}

export default ForgotPassword