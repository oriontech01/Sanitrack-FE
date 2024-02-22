import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ProgressBar = () => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <CircularProgressbar
        value={90}
        text={'90%'}
        strokeWidth={20}
        styles={buildStyles({
          textColor: '#162ee144',
          pathColor: '#3366FF',
          trailColor: '#5EDD3E',
          fontSize: '5px'
        })}
      />
    </div>
  );
};

export default ProgressBar;
