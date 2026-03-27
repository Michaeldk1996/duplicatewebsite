import { Suspense, lazy } from 'react';
// components
import LoadingScreen from '../components/loading-screen';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

// ----------------------------------------------------------------------
export const LandingPage = Loadable(lazy(() => import('../pages/LandingPage')));
export const HomePage = Loadable(lazy(() => import('../pages/HomePage')));
export const RegisterPage = Loadable(lazy(() => import('../pages/RegisterPage')));
export const LoginPage = Loadable(lazy(() => import('../pages/LoginPage')));
export const TermsPage = Loadable(lazy(() => import('../pages/TermsPage')));
export const PolicyPage = Loadable(lazy(() => import('../pages/PolicyPage')));
export const PackagesPage = Loadable(lazy(() => import('../pages/PackagesPage')));
export const LockPage = Loadable(lazy(() => import('../pages/LockPage')));
export const SuccessPage = Loadable(lazy(() => import('../pages/SuccessPage')));
export const AdminPage = Loadable(lazy(() => import('../pages/admin/AdminPage')));