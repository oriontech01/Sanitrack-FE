import React from 'react';

const RoomView = () => {
  return (
    <>
      <div style={{ backgroundColor: '#ffffff', padding: 10, borderRadius: 8, marginTop: 15, paddingLeft: 25 }}>
        <div className="">
          <h1>Facility (#id)</h1>
          <p>Overview of Facility and Facility Tasks</p>
          <hr />
        </div>
        <div className="">
          <p>
            Name: <b>(#RoomName)</b>
          </p>
          <p>
            Location: <b>(#RoomLocation)</b>
          </p>
          <p>
            Total Items in room: <b>(#itemsTotal)</b>
          </p>
          <hr />
        </div>
        <div className="">
          {/* <h4 style={{color:'#fff000'}}>Current Facility Cleaning Overview</h4> */}
          <h4 style={{ color: '#3366ff' }}>Current Facility Cleaning Overview</h4>
          <p>
            Assigned Time: <b>(#Feb 14,2024 8:15am)</b>
          </p>
          <p>
            Stage:{' '}
            <b>
              <span style={{ color: '#ff0000' }}>(#Clean)</span>
            </b>
          </p>
          <p>
            Cleaner: <b>(#CleanerName)</b>
          </p>
          <p>
            Inspector: <b>(#SupervisorName)</b>
          </p>
          <hr />
        </div>
        <div>
          <h4 style={{ color: '#3366ff' }}>Facility Work Orders</h4>

          <table id="rwd-table-large">
            <thead>
              <tr>
                <th style={{ padding: 15 }}>S/N</th>
                <th style={{ padding: 15, paddingLeft: 25, paddingRight: 25 }}>Time</th>
                <th style={{ padding: 15 }}>Cleaner</th>
                <th style={{ padding: 15 }}>Inspector</th>
                <th style={{ padding: 15 }}>Stage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: 15 }}>1</td>
                <td style={{ padding: 15 }}>Feb 11,2024 8:15am</td>
                <td style={{ padding: 15 }}>Nancy Mayers</td>
                <td style={{ padding: 15 }}>Pete Andrees</td>
                <td style={{ padding: 15 }}>
                  <span style={{ padding: 5, backgroundColor: '#FF6347' }}>Clean</span>
                </td>
              </tr>
              <tr>
                <td style={{ padding: 15 }}>2</td>
                <td style={{ padding: 15 }}>Feb 12,2024 8:15am</td>
                <td style={{ padding: 15 }}>Nancy Mayers</td>
                <td style={{ padding: 15 }}>Pete Andrees</td>
                <td style={{ padding: 15 }}>
                  <span style={{ padding: 5, backgroundColor: '#fff000' }}>Pre-Up</span>
                </td>
              </tr>
              <tr>
                <td style={{ padding: 15 }}>3</td>
                <td style={{ padding: 15 }}>Feb 13,2024 8:15am</td>
                <td style={{ padding: 15 }}>Nancy Mayers</td>
                <td style={{ padding: 15 }}>Pete Andrees</td>
                <td style={{ padding: 15 }}>
                  <span style={{ padding: 5, backgroundColor: '#7CFC00' }}>Release</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default RoomView;
