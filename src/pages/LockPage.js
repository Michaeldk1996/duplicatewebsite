import { Helmet } from 'react-helmet-async';
import { Box } from '@mui/material';
// sections
import {LockView} from 'src/sections/_home/view';
import useResponsive from 'src/hooks/useResponsive';
// ----------------------------------------------------------------------

export default function LockPage() {
  const isDesktop = useResponsive('up', 'md');
  return (
    <>
    <Helmet>
        <title>BSP Consult - Evolving the approach of Sports Betting</title>
      </Helmet>

      <Box sx={{width: '100%', height: '100%', background: '#0d1117'}}>
        <LockView />
      </Box>
    </>
  );
}
