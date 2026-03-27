// @mui
import {
  Container,
  Typography,
  Box
} from '@mui/material';
// hooks
import useResponsive from 'src/hooks/useResponsive';

// components
import Logo from 'src/components/logo';

import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export default function Footer() {
  const isDesktop = useResponsive('up', 'md');

  const simpleFooter = (
    <Container sx={{ py: 8, textAlign: 'center' }}>
      <Logo single />

      {isDesktop?
      <Box sx={{ display: 'flex', flexDirection: 'row', columnGap: 4, mt: 6, justifyContent: 'center'}}>
        <Typography variant="h7" component="div" sx={{ color: 'primary.contrastText' }}>
          <a href={paths.terms} style={{textDecoration: 'none', color: '#fff'}}>Terms & Conditions</a>
        </Typography>
        <Typography variant="h7" component="div" sx={{ color: 'primary.contrastText' }}>
          <a href={paths.policy} style={{textDecoration: 'none', color: '#fff'}}>Privacy Policy</a>
        </Typography>
        <Typography variant="h7" component="div" sx={{ color: 'primary.contrastText' }}>
          <a href="https://www.instagram.com/bspconsult?igsh=NW9kd252bjk2a3ls&utm_source=qr" style={{textDecoration: 'none', color: '#fff'}}>Contact us</a>
        </Typography>
      </Box>
      :
      <Box sx={{ display: 'flex', flexDirection: 'column', mt: 6, justifyContent: 'center'}}>
        <Box sx={{ display: 'flex', flexDirection: 'row', columnGap: 4, justifyContent: 'center'}}>
          <Typography variant="h7" component="div" sx={{ color: 'primary.contrastText' }}>
            <a href={paths.terms} style={{textDecoration: 'none', color: '#fff'}}>Terms & Conditions</a>
          </Typography>
          <Typography variant="h7" component="div" sx={{ color: 'primary.contrastText' }}>
            <a href={paths.policy} style={{textDecoration: 'none', color: '#fff'}}>Privacy Policy</a>
          </Typography>
        </Box>
        <Typography variant="h7" component="div" sx={{ color: 'primary.contrastText', mt: 2 }}>
          <a href="https://www.instagram.com/bspconsult?igsh=NW9kd252bjk2a3ls&utm_source=qr" style={{textDecoration: 'none', color: '#fff'}}>Contact us</a>
        </Typography>
    </Box>
      }
    </Container>
  );

  return <footer>{simpleFooter}</footer>;
}
