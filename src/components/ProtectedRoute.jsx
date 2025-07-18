import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children, requireVerification = true }) => {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  if (requireVerification && !currentUser.is_email_verified) {
    return <Navigate to="/verify-email" replace />;
  }
  
  return children;
};

export default ProtectedRoute;