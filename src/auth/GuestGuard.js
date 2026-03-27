import PropTypes from 'prop-types';
// import { Navigate } from 'react-router-dom';
// routes
// import { paths } from '../routes/paths';
// components
import LoadingScreen from '../components/loading-screen';
//
import { useAuthContext } from './useAuthContext';

// ----------------------------------------------------------------------

GuestGuard.propTypes = {
  children: PropTypes.node,
};

export default function GuestGuard({ children }) {
  const { isInitialized } = useAuthContext();

  // if (isAuthenticated) {
  //   return <Navigate to={paths.home} />;
  // }

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  return <> {children} </>;
}
