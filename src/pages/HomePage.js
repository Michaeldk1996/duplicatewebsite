import { Helmet } from 'react-helmet-async';
// sections
import {HomeView} from 'src/sections/_home/view';

// ----------------------------------------------------------------------


export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>BSP Consult - Evolving the approach of Sports Betting</title>
      </Helmet>

      <HomeView />
    </>
  );
}
