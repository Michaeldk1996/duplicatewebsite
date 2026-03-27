import { Helmet } from 'react-helmet-async';
// sections
import {LandingView} from 'src/sections/_home/view';

// ----------------------------------------------------------------------

export default function LandingPage() {
  return (
    <>
      <Helmet>
        <title>BSP Consult - Evolving the approach of Sports Betting</title>
      </Helmet>

      <LandingView />
    </>
  );
}
