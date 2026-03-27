import { useRoutes } from 'react-router-dom';
import Exclusive from 'src/pages/exclusive/Exclusive';
import PaymentSuccess from 'src/pages/exclusive/paymentSuccess';
import ProfileSettings from 'src/pages/exclusive/ProfileSettings';
import TermsCondition from 'src/pages/TermsCondition';
import AuthGuard from '../auth/AuthGuard';
import GuestGuard from '../auth/GuestGuard';
// layouts
import MainLayout from '../layouts/main';
//
import {
  LandingPage,
  RegisterPage,
  LoginPage,
  TermsPage,
  PolicyPage,
  HomePage,
  PackagesPage,
  LockPage,
  SuccessPage,
  AdminPage
} from './elements';



// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: 'register',
      children: [
        {
          element: (
            <GuestGuard>
              <RegisterPage />
            </GuestGuard>
          ),
          index: true,
        },
      ],
    },
    {
      path: 'login',
      children: [
        {
          element: (
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          ),
          index: true,
        },
      ],
    },
    // Main layout
    {
      element: <MainLayout />,
      children: [{ element: <LandingPage />, index: true }],
    },
    {
      path: 'terms-and-conditions',
      element: <MainLayout />,
      children: [{ element: <TermsPage />, index: true }],
    },
    {
      path: 'privacy-policy',
      element: <MainLayout />,
      children: [{ element: <PolicyPage />, index: true }],
    },
    {
      path: 'terms-condition',
      children: [{ element: <TermsCondition/>, index: true }],
    },
    {
      path: 'terms-conditions',
      children: [{ element: <TermsCondition/>, index: true }],
    },
    {
      path: 'home',
      children: [
        {
          element: (
            <AuthGuard>
              <HomePage />
            </AuthGuard>
          ),
          index: true,
        },
      ],
    },
    {
      path: 'check-out',
      children: [
        {
          element: (
            <GuestGuard>
              <PackagesPage />
            </GuestGuard>
          ),
          index: true,
        },
      ],
    },
    {
      path: 'lock',
      children: [
        {
          element: (
            <AuthGuard>
              <LockPage />
            </AuthGuard>
          ),
          index: true,
        },
      ],
    },
    {
      path: 'exclusive',
      children: [
        {
          element: (
          <AuthGuard>
              <Exclusive />
          </AuthGuard>
          ),
          index: true,
        },
      ],
    },
    {
      path: 'payment-success',
      children: [
        {
          element: <PaymentSuccess />,
          index: true,
        },
      ],
    }
    ,
    {
      path: 'profile-settings',
      children: [
        {
          element: <ProfileSettings />,
          index: true,
        },
      ],
    },
    {
      path: 'success',
      children: [
        {
          element: (
            <GuestGuard>
              <SuccessPage />
            </GuestGuard>
          ),
          index: true,
        },
      ],
    },
    {
      path: 'admin',
      children: [
        {
          element: (
            <AuthGuard>
              <AdminPage />
            </AuthGuard>
          ),
          index: true,
        },
      ],
    },
  ]);
}

