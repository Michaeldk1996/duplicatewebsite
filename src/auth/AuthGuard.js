import PropTypes from 'prop-types';
import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// components
import LoadingScreen from '../components/loading-screen';
//
import Login from '../pages/LoginPage';
import { useAuthContext } from './useAuthContext';

// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default function AuthGuard({ children }) {
  const { isAuthenticated, isInitialized } = useAuthContext();

  const { pathname } = useLocation();

  const [requestedLocation, setRequestedLocation] = useState(null);

  // const navigate = useNavigate();

  // // useEffect(() => {
  // //   if (user) {
  // //     const currentDate = new Date();
  // //     const sec = user.expire_date?user.expire_date.seconds*1000:0;
  // //     const expireDate = new Date(sec);

  // //     if (isAuthenticated && ((user?.membership !== '8' && user?.membership !== '10') )) {
  // //       navigate(paths.lock, { replace: true });// || (expireDate < currentDate)
  // //     }
  // //   }
  // // }, [isAuthenticated, navigate, user, user?.membership, user?.expire_date]);

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Login />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <> {children} </>;
}
