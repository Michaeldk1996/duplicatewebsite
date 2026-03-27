import { Helmet } from 'react-helmet-async';
import { Box } from '@mui/material';
// sections
import { PackagesView } from 'src/sections/_home/view';
import useResponsive from 'src/hooks/useResponsive';

// Import your CSS file
// import './PackagesPage.css';

// ----------------------------------------------------------------------

export default function PackagesPage() {
  const isDesktop = useResponsive('up', 'md');
  return (
    <>
      <Helmet>
        <title>BSP Consult - Evolving the approach of Sports Betting</title>
      </Helmet>

      <Box sx={{width: '100%', height: isDesktop?'100%':'max-content', background: '#0d1117'}}>
        <PackagesView />
      </Box>
    </>
  );
}
