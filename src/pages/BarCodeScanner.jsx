import React, { useEffect } from 'react';
import Quagga from 'quagga'; // Assume Quagga is installed via npm

const BarCodeScanner = () => {
  useEffect(() => {
    // Define the scanner configuration
    const scannerConfig = {
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: document.querySelector("#interactive"),
        constraints: {
          width: 640,
          height: 480,
          facingMode: "environment", // Use the back camera
        },
      },
      decoder: {
        readers: ["code_128_reader", "ean_reader", "upc_reader"],
      },
    };

    // Initialize the scanner
    Quagga.init(scannerConfig, function (err) {
      if (err) {
        console.error(err);
        return;
      }
      // Start the scanner
      Quagga.start();
    });

    // Register callback for successful barcode scan
    Quagga.onDetected((result) => {
      var code = result.codeResult.code;
      openPageBasedOnBarcode(code);
    });

    return () => Quagga.stop(); // Cleanup on unmount
  }, []);

  // Function to handle the barcode scanning result
  const openPageBasedOnBarcode = (barcode) => {
    alert("Scanned Barcode: " + barcode);
    // Add logic to handle the barcode scanning result
    // e.g., navigate to a new page or update state
  };

  return (
    <div id="scanner-container">
      <div id="interactive" className="viewport"></div>
    </div>
  );
};

export default BarCodeScanner;
