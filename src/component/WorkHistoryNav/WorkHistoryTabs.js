import { Tabs, Tab } from '@mui/material';
import {Link} from "react-router-dom"

const WorkHistoryTabs = ({ selectedTab, setSelectedTab }) => {
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Tabs
      value={selectedTab}
      onChange={handleTabChange}
      indicatorColor="primary"
      textColor="primary"
      centered
    >
      <Tab label="Rooms" component={Link} to='/dashboard/work-history/rooms' />
      <Tab label="Inspectors" component={Link} to='/dashboard/work-history/inspectors' />
      <Tab label="Cleaners" component={Link} to='/dashboard/work-history/cleaners' />
    </Tabs>
  );
};

export default WorkHistoryTabs;
