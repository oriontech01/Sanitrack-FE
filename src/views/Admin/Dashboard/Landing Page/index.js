import CleanerDashboard from './CleanerDashboard';
import AdminDashboard from './AdminDashboard';
import InspectorDashboard from './InspectorDashboard';

const SanitrackLandingPage = () => {
  const currentRole = localStorage.getItem('role');
  return <>{currentRole === 'Admin' ? <AdminDashboard /> : currentRole === 'Inspector' ? <InspectorDashboard /> : <CleanerDashboard />}</>;
};

export default SanitrackLandingPage;
