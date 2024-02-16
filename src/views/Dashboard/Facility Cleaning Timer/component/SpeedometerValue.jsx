import React, { useMemo } from 'react';
import ReactSpeedometer from 'react-d3-speedometer';

const SpeedometerValue = ({ cleanTime }) => {
  return (
    <div style={{ width: 'auto', height: 180 }}>
      <ReactSpeedometer
        width={300}
        needleHeightRatio={0.7}
        value={cleanTime} // Pass cleanTime directly as the value
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
        maxValue={100}
      />
    </div>
  );
};

export default SpeedometerValue;
