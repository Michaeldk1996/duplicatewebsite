import { Helmet } from 'react-helmet-async';
import { Box } from '@mui/material';
// sections
import { RegisterView } from 'src/sections/auth/view';

// ----------------------------------------------------------------------

export default function RegisterPage() {
  return (
    <>
      <Helmet>
        <title>BSP Consult</title>
      </Helmet>

      <Box sx={{width: '100%', height: '100%', background: '#0d1117'}}>
        <RegisterView />
      </Box>
    </>
  );
}
