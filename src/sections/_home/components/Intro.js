import { m } from 'framer-motion';
import PropTypes from 'prop-types';
import { useCallback, useLayoutEffect, useRef } from 'react';
// @mui
import { Box, Button, Container, Paper, Typography } from '@mui/material';
// components
import { MotionViewport, varFade } from 'src/components/animate';
import WistiaPlayer from 'src/components/wistia/WistiaPlayer';
import useResponsive from 'src/hooks/useResponsive';

// ----------------------------------------------------------------------

export default function Intro({ onStart }) {
  Intro.propTypes = {
    onStart: PropTypes.func.isRequired,
  };
  const isDesktop = useResponsive('up', 'md');
  const videoRef = useRef(null);

  const handleStart = () => {
    onStart();
  };

  const saveIframeState = useCallback(() => {
    if (videoRef.current) {
      const currentTime = videoRef.current.time();
      sessionStorage.setItem('videoCurrentTime', currentTime);
    }
  }, []);

  const restoreIframeState = useCallback(() => {
    const savedTime = sessionStorage.getItem('videoCurrentTime');
    if (videoRef.current && savedTime) {
      videoRef.current.time(parseFloat(savedTime));
      videoRef.current.play();
    }
  }, []);

  useLayoutEffect(() => {
    sessionStorage.removeItem('videoCurrentTime');
    window._wq = window._wq || [];
    const handleResizeOrOrientationChange = () => {
      saveIframeState();
      restoreIframeState();
    };

    const initializeWistia = () => {
      window._wq.push({
        id: 's9dfisq9e7',
        onReady: (video) => {
          videoRef.current = video;
          restoreIframeState();
        },
      });
    };

    const loadWistiaScript = () => {
      if (!document.getElementById('wistia-script')) {
        const script = document.createElement('script');
        script.id = 'wistia-script';
        script.src = 'https://fast.wistia.com/assets/external/E-v1.js';
        script.async = true;
        script.onload = () => {
          initializeWistia();
        };
        script.onerror = () => console.error('Failed to load Wistia script');
        document.body.appendChild(script);
      } else {
        initializeWistia();
      }
    };

    loadWistiaScript();

    window.addEventListener('resize', handleResizeOrOrientationChange);
    window.addEventListener('orientationchange', handleResizeOrOrientationChange);

    return () => {
      window.removeEventListener('resize', handleResizeOrOrientationChange);
      window.removeEventListener('orientationchange', handleResizeOrOrientationChange);
    };
  }, [saveIframeState, restoreIframeState]);

  return (
    <Container
      component={MotionViewport}
      sx={{
        pt: { xs: 8, md: 5 },
        px: { xs: 1, md: 3 },
      }}
    >
      <Paper
        sx={{
          borderRadius: 3,
          textAlign: 'center',
          backgroundColor: 'transparent',
        }}
      >
        <Box sx={{ mx: 'auto', maxWidth: 972 }}>
          <m.div variants={varFade().inDown}>
            <Typography variant="h2" sx={{ pb: 3, color: 'primary.contrastText', px: 2 }}>
              Develop a new
              <Box component="span" sx={{ color: 'primary.highlight' }}>
                {` high-income skill `}
              </Box>
              and join the new generation of smart, disciplined value bettors
            </Typography>
          </m.div>

          <m.div variants={varFade().inDown}>
            <Typography variant="h5" sx={{ color: 'primary.contrastText', px: 2, mb: 3 }}>
              Watch this 7-minute free training to help you understand probabilities and why
              it&apos;s essential to use models. This will help you spot value in the market and
              finally build the wealth you deserve.
            </Typography>
          </m.div>
          {/* <div style={iframeContainerStyle}> */}
          {/* <iframe ref={iframeRef} src="https://fast.wistia.net/embed/iframe/s9dfisq9e7" scrolling="no" allowFullScreen="" title="BSP Consult" style={iframeStyle}/> */}
          {/* <WistiaPlayer
            videoId="s9dfisq9e7"
            wrapper="wistia-player-container-1"
          /> */}
          <Box sx={{ px: 2 }}>
            <WistiaPlayer videoId="s9dfisq9e7" wrapper="wistia-player-container-1" />
          </Box>

          {/* </div> */}
          {/* <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 3}}>
            <Box
              component="img"
              sx={{
                // height: isDesktop?400:'100%',
                borderRadius: '24px',
                width: isDesktop?'540px':'fit-content',
                boxShadow: '0 0 70px rgb(9 134 251 / 25%)',
                border: '2px solid rgb(9 134 251 / 42%)',
              }}
              alt="The house from the offer."
              src="/assets/images/home/animation.gif"
            />
          </Box> */}
        </Box>
        <Box sx={{ px: 2 }}>
          <Button
            variant="filled"
            color="inherit"
            target="_blank"
            rel="noopener"
            sx={{
              background: 'linear-gradient(#047efc, #12488f)',
              position: 'relative',
              overflow: 'hidden',
              color: '#FFF',
              width: isDesktop ? '198px' : '100%',
              height: '48px',
              fontSize: 16,
              fontWeight: 700,
              marginTop: 4,
              ':hover': {
                opacity: 0.8,
              },
            }}
            onClick={handleStart}
          >
            Start Now
            <Box component="img" alt="arrow" src="/assets/images/home/arrow_outward_white.png" />
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
