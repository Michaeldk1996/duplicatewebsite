import { Helmet } from 'react-helmet-async';
import { Box } from '@mui/material';
// sections
import { LoginView } from 'src/sections/auth/view';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title>BSP Consult</title>
      </Helmet>

      <Box sx={{width: '100%', height: '100%', background: '#0d1117'}}>
        <LoginView />
      </Box>
    </>
  );
}
