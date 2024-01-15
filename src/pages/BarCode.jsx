import React, { useEffect } from 'react';
import '../styles/BarCode.scss'; // Make sure this path is correct for your project structure
import BarCodeScanner from './BarCodeScanner';

const BarCode = () => {
  useEffect(() => {
    // Check if the browser supports the getUserMedia API
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
        .then((stream) => {
          // Get the video element
          const video = document.getElementById('camera');
          video.srcObject = stream;
        })
        .catch((error) => {
          console.error('Error accessing the camera:', error);
        });
    } else {
      console.error('getUserMedia is not supported in this browser');
    }
  }, []);
  return (
    <div className='bg-color'>
      <div className="whole-cont">
        <div className="camera-box">
            <video id="camera" autoPlay playsInline></video>
            <div className="camera_text"> 
              
              <BarCodeScanner/>
              <p>scan qr code to view work order</p>
            </div>
        </div>
     </div>
    </div>
  );
};

export default BarCode;
