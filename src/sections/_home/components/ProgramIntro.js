import { m } from 'framer-motion';
// @mui
import { Box, Paper, Container, Typography } from '@mui/material';
import { MotionViewport, varFade } from 'src/components/animate';
import useResponsive from 'src/hooks/useResponsive';

// ----------------------------------------------------------------------

export default function ProgramIntro() {
  const isDesktop = useResponsive('up', 'md');
  const iframeStyle = {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    height: isDesktop?'550px':'240px',
    borderRadius: '12px',
    border: 'none',
    // Additional styles
  };
  const iframeContainerStyle = {
    position: 'relative',
    // overflow: 'hidden',
    paddingTop: '56.25%',
    borderRadius: '8px',
    width: '100%'
  }
  return (
    <Container
      component={MotionViewport}
    >
      <Paper
        sx={{
          borderRadius: 3,
          textAlign: 'center',
          backgroundColor: 'transparent',
        }}
      >
        <Box sx={{ mx: 'auto', maxWidth: 1200, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <m.div variants={varFade().inDown}>
            <Typography variant="h5" sx={{ color: 'primary.highlight', fontWeight: 700 }}>
              BSP INTRODUCES A UNIQUE WAY IN SPORTS BETTING
            </Typography>
          </m.div>
          <m.div variants={varFade().inDown}>
            <Typography variant="h1" sx={{ my: 3, color: 'primary.contrastText'}}>
            The programs you get
            </Typography>
          </m.div>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: isDesktop?'row':'column',  
            textAlign: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            borderRadius: 3,
            px: isDesktop?3:1,
            boxShadow: '0 2px 7px rgba(20, 20, 43, .06)',
            columnGap: isDesktop?5:0,
            rowGap: isDesktop? 0:2}}>
            {/* <Typography variant="h5" sx={{ my: 1, color: 'primary.contrastText', maxWidth: '700px'}}>
              BSP is composed of three different programs covering every aspect of understanding on how to engage in tennis betting in a healthy, transformative and profitable way.
            </Typography> */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                padding: isDesktop?2:0,
                width: isDesktop?'1000px':'100%'
              }}>
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
              {/* <div style={iframeContainerStyle}> */}
                {/* <iframe src="https://fast.wistia.net/embed/iframe/dbay54162a" scrolling="no" allowfullscreen="" title="BSP Consult" style={iframeStyle}/> */}
              {/* </div> */}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <Typography variant="h5" sx={{ my: 1, color: 'primary.contrastText', maxWidth: '700px'}}>
                BSP is composed of two different programs covering every aspect of understanding on how to engage in tennis betting in a healthy, transformative and profitable way.
              </Typography>
              <Typography variant="h5" sx={{ my: 1, color: 'primary.contrastText', maxWidth: '700px'}}>
                It&apos;s a well-proven strategy that illustrates how you can achieve financial freedom, location freedom and time-freedom by investing minimal time and taking advantage of the 97% of people that lose in sports betting.
              </Typography>
              <Typography variant="h5" sx={{ my: 1, color: 'primary.contrastText', maxWidth: '700px'}}>
                This program has everything covered for you. No other program in the market has ever created more disciplined value bettors than BSP
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
