import { useNavigate } from 'react-router-dom';
// @mui
import { Box, Paper, Typography, Button } from '@mui/material';
import RemoveModeratorIcon from '@mui/icons-material/RemoveModerator';
import useResponsive from 'src/hooks/useResponsive';
import { useSnackbar } from 'notistack';
import { useAuthContext } from '../../../auth/useAuthContext';
import { paths } from '../../../routes/paths';

// ----------------------------------------------------------------------

export default function Lock() {
  const isDesktop = useResponsive('up', 'md');
  const { logout } = useAuthContext();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogout = async () => {
    try {
      logout();
      navigate(paths.login, { replace: true });
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout!', { variant: 'error' });
    }
  };

  return (
    <Paper
      sx={{
        borderRadius: 3,
        textAlign: 'center',
        backgroundColor: 'transparent',
        paddingTop: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: isDesktop ? 'row' : 'column',
          width: '100%',
          mt: isDesktop ? 0 : 2,
          columnGap: isDesktop ? 1 : 0,
          rowGap: isDesktop ? 0 : 1,
          justifyContent: 'center',
          px: 2,
        }}
      >
        <Box
          sx={{
            backgroundImage: 'linear-gradient(326deg, #076af4, #0d1117 49%, #086af5)',
            minWidth: isDesktop ? '540px' : 'fit-content',
            borderRadius: '24px',
            padding: '2px',
            transition: 'all .2s',
            position: 'relative',
            transform: 'none',
            boxShadow: '0 0 70px rgba(9, 134, 251, .19)',
          }}
        >
          <Box
            sx={{
              backgroundColor: '#0d1117',
              width: '100%',
              height: '100%',
              border: '1px solid rgba(239, 240, 246, .08)',
              borderRadius: '24px',
              transition: 'all .2s',
              position: 'relative',
              boxShadow: '0 2px 7px rgba(20, 20, 43, .06)',
              px: 3,
              py: 2,
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box
              sx={{
                width: '77px',
                height: '77px',
                border: '2px solid #0866eb',
                display: 'flex',
                alignItems: 'center',
                borderRadius: 2,
                justifyContent: 'center',
              }}
            >
              <RemoveModeratorIcon />
            </Box>
            <Typography
              sx={{ color: 'rgb(203, 213, 225)', fontWeight: 400, fontSize: '36px', mt: 2 }}
            >
              Purchase Membership
            </Typography>
            <Typography
              sx={{ color: 'rgba(203, 213, 225, 0.5)', fontWeight: 400, fontSize: '18px', mt: 1 }}
            >
              You need to be a Premium member to have access to this content!
            </Typography>
            <Box
              sx={{
                background: 'linear-gradient(#047efc, #12488f)',
                position: 'relative',
                overflow: 'hidden',
                width: '100%',
                height: '48px',
                borderRadius: '8px',
                mt: 6,
                ':hover': {
                  opacity: 0.8,
                },
              }}
            >
              <Button
                variant="filled"
                color="inherit"
                sx={{
                  position: 'relative',
                  zIndex: 2, // Ensure the button text is above the overlay
                  color: '#FFF',
                  width: '100%',
                  height: '48px',
                  fontSize: 16,
                  fontWeight: 400,
                }}
              >
                <a href="/check-out" style={{ textDecoration: 'none', color: '#FFF' }}>
                  Purchase Membership
                </a>
              </Button>
            </Box>
            <Typography
              sx={{
                color: 'rgba(203, 213, 225, 0.5)',
                fontWeight: 400,
                fontSize: '16px',
                mt: 2,
                cursor: 'pointer',
              }}
              onClick={handleLogout}
            >
              Log Out
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}
