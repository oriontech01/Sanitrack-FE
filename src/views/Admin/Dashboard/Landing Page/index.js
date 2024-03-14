import CleanerDashboard from 'views/Cleaner/Dashboard/CleanerDashboard';
import AdminDashboard from './AdminDashboard';
import InspectorDashboard from 'views/Inspector/Dashboard/InspectorDashboard';

const SanitrackLandingPage = () => {
  const currentRole = localStorage.getItem('role');
  return <>{currentRole === 'Admin' ? <AdminDashboard /> : currentRole === 'Inspector' ? <InspectorDashboard /> : <CleanerDashboard />}</>;
};

export default SanitrackLandingPage;
