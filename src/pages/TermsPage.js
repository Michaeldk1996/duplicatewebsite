import { Helmet } from 'react-helmet-async';
// sections
import {TermsView} from 'src/sections/support/view';

// ----------------------------------------------------------------------

export default function TermsPage() {
  return (
    <>
      <Helmet>
        <title>BSP Consult - Evolving the approach of Sports Betting</title>
      </Helmet>

      <TermsView />
    </>
  );
}
