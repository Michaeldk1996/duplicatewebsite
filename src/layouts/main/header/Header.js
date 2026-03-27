import PropTypes from 'prop-types';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Stack, Button, Toolbar, Container } from '@mui/material';
// hooks
import useResponsive from 'src/hooks/useResponsive';

// routes
import { paths } from 'src/routes/paths';

// components
import Logo from 'src/components/logo';

// ----------------------------------------------------------------------

export default function Header({ headerOnDark }) {
  const theme = useTheme();

  const isDesktop = useResponsive('up', 'md');

  return (
      <Toolbar
        disableGutters
        sx={{
          transition: theme.transitions.create(['height', 'background-color'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(headerOnDark && {
            color: 'common.white',
          }),
        }}
      >
        <Container sx={{ height: 1, display: 'flex', alignItems: 'center', mt: isDesktop?3:4, pl: isDesktop?3:4, pr: 3 }}>
          <Box sx={{ lineHeight: 0, position: 'relative' }}>
            <Logo />
          </Box>

          <Stack
            spacing={2}
            flexGrow={1}
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
          >
            <Button
              variant="outlined"
              color="inherit"
              href={paths.login}
              sx={{
                backgroundColor: 'transparent',
                color: '#FFF',
                border: '1px solid #FFF',
                width: '91px',
                height: '44px'
              }}
            >
              Login
            </Button>
          </Stack>
        </Container>
      </Toolbar>
  );
}

Header.propTypes = {
  headerOnDark: PropTypes.bool,
};
