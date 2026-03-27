// @mui
import { Box, Paper, Container, Typography } from '@mui/material';
import { MotionViewport, varFade } from 'src/components/animate';
import useResponsive from 'src/hooks/useResponsive';

// ----------------------------------------------------------------------
export default function Schedule() {
  const isDesktop = useResponsive('up', 'md');
  
   return (
    <Container
      component={MotionViewport}
      sx={{
        pt: 7,
        px: 3,
      }}
    >
      <Paper
        sx={{
          pb: 10,
          borderRadius: 3,
          textAlign: 'center',
          backgroundColor: 'transparent',
          paddingTop: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Box sx={{ mt: 3, mx: 'auto', maxWidth: 1086 }}>
          <Box variants={varFade().inDown}>
            <Typography variant="h5" sx={{ color: 'primary.highlight', fontWeight: 700 }}>
              QUESTIONS STILL UNANSWERED?
            </Typography>
          </Box>
          <Box variants={varFade().inDown}>
            <Typography variant="h1" sx={{ my: 3, color: 'primary.contrastText'}}>
              We are ready to help you
            </Typography>
          </Box>
          <Box variants={varFade().inDown} sx={{ width: '100%', display:'flex', justifyContent: 'center'}}>
            <Typography variant="h6" sx={{ color: 'primary.contrastText', maxWidth: '724px'}}>
              Connect with our student success team for quick answers! Schedule a free discovery call below, and they&apos;ll respond within minutes to address all your inquiries.
            </Typography>
          </Box>
        </Box>
        <div style={{
          width: isDesktop? '1000px': '100%',
          overflow: 'hidden',
          marginTop: '24px',
          borderRadius: '8px'
        }}>
          <iframe
            title="calendly"
            src="https://calendly.com/d/cpc5-87r-68y/consultation-call"
            width="100%"
            height={isDesktop?'660px': "1025px"}
            frameBorder="0"
            style={{borderRadius:"8px"}}
          />
        </div>
      </Paper>
    </Container>
  );
}
