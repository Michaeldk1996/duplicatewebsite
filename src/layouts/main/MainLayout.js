import { Outlet, useLocation } from 'react-router-dom';
// @mui
import { Box } from '@mui/material';
// config
import { HEADER } from 'src/config-global';
//
import Header from './header/Header';
import Footer from './footer/Footer';

// ----------------------------------------------------------------------

const pathsOnDark = ['/career/landing', '/travel/landing'];

const spacingLayout = [...pathsOnDark, '/', '/e-learning/landing', '/marketing/landing'];

// ----------------------------------------------------------------------

export default function MainLayout() {
  const { pathname } = useLocation();

  const actionPage = (arr) => arr.some((path) => pathname === path);

  return (
    // <Box sx={{ display: 'flex', flexDirection: 'column', background: 'linear-gradient(180deg, #0194FB 0%, #007FDC 14%, #006EC3 28%, #032A8E 42%, #14025B 56%, #11024B 70%, #300038 100%)'}}>
    <Box sx={{ display: 'flex', flexDirection: 'column', backgroundColor: '#0d1117' }}>
      {/* <Header headerOnDark={actionPage(pathsOnDark)} /> */}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        {!actionPage(spacingLayout) && <Spacing />}
        <Outlet />
      </Box>

      {/* <Footer /> */}
    </Box>
  );
}

// ----------------------------------------------------------------------

function Spacing() {
  return (
    <Box
      sx={{
        height: { xs: HEADER.H_MOBILE, md: HEADER.H_MAIN_DESKTOP },
      }}
    />
  );
}
