import React from 'react';
import '../styles/WorkOrderSelection.scss'; // Adjust the relative path as necessary

const WorkOrderSelection = () => {
  return (
    <div className="bg-color">
      <div className="workorder-btn-container">
        <a href="../barcode_scanner.html" className="scan-barcode">
          <p>Scan barcode to <br />view work order</p>
        </a>
        <a href="room_list.html" className="select-from-list">
          <p>Select from list</p>
        </a>
      </div>
    </div>
  );
};

export default WorkOrderSelection;
