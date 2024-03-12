import React, { useState, useEffect } from 'react';

const NetworkDetector = (ComposedComponent) => {
  const EnhancedComponent = (props) => {
    const [isDisconnected, setIsDisconnected] = useState(false);

    const handleConnectionChange = () => {
      const condition = navigator.onLine ? 'online' : 'offline';
      if (condition === 'online') {
        const webPing = setInterval(() => {
          fetch('//google.com', { mode: 'no-cors' })
            .then(() => {
              setIsDisconnected(false);
              clearInterval(webPing);
            })
            .catch(() => setIsDisconnected(true));
        }, 2000);
        return () => clearInterval(webPing);
      }

      setIsDisconnected(true);
    };

    useEffect(() => {
      handleConnectionChange();
      window.addEventListener('online', handleConnectionChange);
      window.addEventListener('offline', handleConnectionChange);
      
      return () => {
        window.removeEventListener('online', handleConnectionChange);
        window.removeEventListener('offline', handleConnectionChange);
      };
    }, []);

    return (
      <div>
        {isDisconnected && (
          <div className="internet-error">
            <p>Internet connection lost</p>
          </div>
        )}
        <ComposedComponent {...props} />
      </div>
    );
  };

  return EnhancedComponent;
};

export default NetworkDetector;
