import { Helmet } from 'react-helmet-async';
// sections
import {PolicyView} from 'src/sections/support/view';

// ----------------------------------------------------------------------

export default function PolicyPage() {
  return (
    <>
      <Helmet>
        <title>BSP Consult - Evolving the approach of Sports Betting</title>
      </Helmet>

      <PolicyView />
    </>
  );
}
