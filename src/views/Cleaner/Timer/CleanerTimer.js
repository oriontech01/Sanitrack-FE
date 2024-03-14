import ActiveTimer from 'component/Active Timer/ActiveTimer'
import React, { useEffect } from 'react'

const CleanerTimer = () => {
    const role = localStorage.getItem('role');
 
    useEffect(() => {
      if (role !== 'Cleaner') {
        navigate(-1);
      }
    }, []);
  return (
    <>  <ActiveTimer /></>
  )
}

export default CleanerTimer