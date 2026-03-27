import PropTypes from 'prop-types';
import { memo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Link } from '@mui/material';
import useResponsive from 'src/hooks/useResponsive';
// ----------------------------------------------------------------------

function Logo({ single = false, sx }) {
  const isDesktop = useResponsive('up', 'md');
  const handleClick = () => {
    if (single) {
      window.scrollTo({top:0, behavior: 'smooth'});
    } else {
      window.location.reload();
    }
  }
  return (
    <Link
      component={RouterLink}
      to="/"
      color="inherit"
      aria-label="go to homepage"
      sx={{ lineHeight: 0 }}
      onClick={handleClick}
    >
      <Box
        sx={{
          width: isDesktop ? 64 : 48,
          lineHeight: 0,
          cursor: 'pointer',
          display: 'inline-flex',
          ...sx,
        }}
      >
        {/* {single ? singleLogo : fullLogo} */}
        <img src="/assets/images/home/logo.png" alt="logo"/>
      </Box>
    </Link>
  );
}

Logo.propTypes = {
  single: PropTypes.bool,
  sx: PropTypes.object,
};

export default memo(Logo);
