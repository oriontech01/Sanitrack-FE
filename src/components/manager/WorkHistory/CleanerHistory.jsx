// eslint-disable-next-line react/prop-types
import './index.scss';
const CleanerDetails = ({ name }) => {
  return (
    <div className="cleaner-history">
      <span className='cleaner-name'>{name}</span> <span className='view-history-button'>View History</span>
    </div>
  );
};

const CleanerHistory = () => {
  const data = [
    {
      name: "cleaner 1",
    },
    {
      name: "cleaner 2",
    },
    {
      name: "cleaner 3",
    },
  ];
  return data.map((cleaner) => {
    return <CleanerDetails key={cleaner.name} name={cleaner.name} />;
  });
};

export default CleanerHistory;