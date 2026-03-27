// scroll bar
import 'simplebar-react/dist/simplebar.min.css';

// lightbox
/* eslint-disable import/no-unresolved */
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

// slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';

// ----------------------------------------------------------------------

import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { SnackbarProvider } from 'notistack';
// @mui
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// routes
import Router from 'src/routes';
// theme
import ThemeProvider from 'src/theme';
// components
import ScrollToTop from 'src/components/scroll-to-top';
import { ThemeSettings, SettingsProvider } from 'src/components/settings';
import MotionLazyContainer from 'src/components/animate/MotionLazyContainer';
import { AuthProvider } from './auth/FirebaseContext';

// import { trackAnalyticsVisitor } from './utils/trackVisitor_analytics';
import { trackVisitor } from './utils/trackVisitor';

// ----------------------------------------------------------------------

export default function App() {
  useEffect(() => {
    const alreadyTracked = sessionStorage.getItem('tracked');
    if (!alreadyTracked) {
      trackVisitor();
      // trackAnalyticsVisitor();
      sessionStorage.setItem('tracked', 'true');
    }
  }, []);

  return (
    <AuthProvider>
      <HelmetProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <SettingsProvider>
            <BrowserRouter>
              <ScrollToTop />
              <ThemeProvider>
                <ThemeSettings>
                  <MotionLazyContainer>
                    <SnackbarProvider>
                      <Router />
                    </SnackbarProvider>
                  </MotionLazyContainer>
                </ThemeSettings>
              </ThemeProvider>
            </BrowserRouter>
          </SettingsProvider>
        </LocalizationProvider>
      </HelmetProvider>
    </AuthProvider>
  );
}
