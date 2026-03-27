import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { useSnackbar } from 'notistack';

import useResponsive from 'src/hooks/useResponsive';
import { useAuthContext } from 'src/auth/useAuthContext';
import { paths } from 'src/routes/paths';

import './Exclusive.css';

export default function Exclusive() {
  const isDesktop = useResponsive('up', 'md');
  const { logout } = useAuthContext();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogout = async () => {
    try {
      logout();
      navigate(paths.login, { replace: true });
    } catch (error) {
      enqueueSnackbar('Unable to logout!', { variant: 'error' });
    }
  };

  return (
    <div className="lock-paper">
      <div className={`lock-wrapper ${isDesktop ? 'desktop' : 'mobile'}`}>
        <div className="lock-gradient-box">
          <div className="lock-content">

            {/* HEADER */}
            <div className="lock-header">
              <span>Exclusive Content</span>
            
              <button
                type="button"
                className="lock-close"
                onClick={() => navigate(-1)}
              >
                <CloseIcon />
              </button>


            </div>

            <div className="lock-divider" />

            {/* ICON */}
            <div className='membership'>
              <div className="lock-icon-box">
                <img
                  src="/img/exclusive.svg"
                  alt="Premium Lock"
                  className="lock-icon-image"
                />
              </div>


              {/* TEXT */}
              <h1 className="lock-title">Premium Membership</h1>
              <p className="lock-subtitle">
                This content is reserved for Premium members. Upgrade your membership to unlock full access.
              </p>
            </div>

            <div className="lock-divider" />

            {/* FOOTER BUTTONS */}
            <div className="lock-footer">
              <button
                type="button"
                className="lock-logout"
                onClick={handleLogout}
              >
                Logout
              </button>

              <button type="button" className="lock-unlock">
                <a href="/check-out">Unlock</a>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
