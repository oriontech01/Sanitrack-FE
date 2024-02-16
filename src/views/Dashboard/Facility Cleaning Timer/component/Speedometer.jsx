import React from 'react';
import ReactSpeedometer from 'react-d3-speedometer';

const Speedometer = ({ cleanTime, preOpTime, releaseTime }) => {
  const totalTime = cleanTime + preOpTime + releaseTime;

  return (
    <div style={{ width: 'auto', height: 180 }}>
      <ReactSpeedometer
        width={300}
        needleHeightRatio={0.7}
        value={totalTime}
        customSegmentStops={[0, 25, 75, 100]}
        segmentColors={['#ff0505', '#ffff05', '#138808']}
        customSegmentLabels={[
          {
            text: 'Clean',
            position: 'INSIDE',
            color: '#000'
          },
          {
            text: 'Pre-Op',
            position: 'INSIDE',
            color: '#000'
          },
          {
            text: 'Release',
            position: 'INSIDE',
            color: '#000'
          }
        ]}
        ringWidth={47}
        needleTransitionDuration={3333}
        needleTransition="easeElastic"
        needleColor={'#000080'}
        textColor={'#000'}
        minValue={0}
        maxValue={100} // Assuming the maximum value for the speedometer is 100
      />
    </div>
  );
};

export default Speedometer;
