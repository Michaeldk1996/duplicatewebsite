import "./HomeView.css";
import SideNavbar from 'src/pages/exclusive/SideNavbar';
import { loadStripe } from '@stripe/stripe-js';
import { useSnackbar } from 'notistack';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import useResponsive from 'src/hooks/useResponsive';
import { useAuthContext } from '../../../auth/useAuthContext';
import { paths } from '../../../routes/paths';
import { trackEvent } from '../../../utils/trackVisitor';

import {
  Courses,
  MobileHome,
  Profile,
  Subscriptions,
  Tips,
  VideoContentSilver,
} from '../components';

const stripePromise = loadStripe(
  "pk_live_51NAUESCf4YXq1rsyBMpbCD1Yqi5kocGdjxYqcqknpppNXXnUKKCVxar7NqInLJRCJTCEVkbqQPppP7nvve8E053I00P0pVQI8d"
);


export default function HomeView() {
  const navigate = useNavigate();
  const isDesktop = useResponsive('up', 'md');
  const { user, logout } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();

  const [currentPage, setCurrentPage] = React.useState('Profile');

  const handleLogout = async () => {
    try {
      await trackEvent("Logout");
      logout();
      navigate(paths.login, { replace: true });
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout!', { variant: 'error' });
    }
  };

  const handleProfileChange = (data) => {
    if (data === '1') {
      setCurrentPage('Subscriptions');
    } else {
      handleUpgradeSubscription();
    }
  };

  const handleUpgradeSubscription = async () => {
    const stripe = await stripePromise;

    const response = await fetch(
      'https://us-central1-bspconsult-bcd6e.cloudfunctions.net/createCheckoutSession',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: 'price_1OgVtOCf4YXq1rsy99bw9IHr',
          customerEmail: user?.email,
          platform: 'web',
        }),
      }
    );

    const session = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error(result.error.message);
    }
  };

  if (!isDesktop) {
    return (
      <div className="home-mobile">
        <MobileHome />
      </div>
    );
  }

  return (
  <div className="dashboard-layout">
    {/* SIDEBAR (LEFT) */}
    <SideNavbar
      active={currentPage}
      onChange={setCurrentPage}
      onLogout={handleLogout}
    />

    {/* RIGHT SIDE */}
    <div className="dashboard-content">
      {/* HEADER */}
      <header className="page-header">
       
        <h1>
          BSP Consult - We build high-level bettors
        </h1>
      </header>

      {/* MAIN CONTENT */}
      <main className="home-content">
        {currentPage === 'Profile' && <Profile onChange={handleProfileChange} />}
        {currentPage === 'Tips' && <Tips setCurrentPage={setCurrentPage} />}
        {currentPage === 'Subscriptions' && <Subscriptions />}
        {currentPage === 'Courses' && <Courses onChange={handleProfileChange} />}
        {currentPage === 'VideoContentSilver' && (
          <VideoContentSilver setCurrentPage={setCurrentPage} />
        )}
       
      </main>
    </div>
  </div>
);

}
