import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { useSnackbar } from 'notistack';

import useResponsive from 'src/hooks/useResponsive';
import { useAuthContext } from 'src/auth/useAuthContext';
import { paths } from 'src/routes/paths';


export default function Success() {
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
        <div className="lock-paper">
            <div className={`lock-wrapper ${isDesktop ? 'desktop' : 'mobile'}`}>
                <div className="lock-gradient-box">
                    <div className="lock-content">

                        {/* HEADER */}
                        <div className="lock-header">
                            <span>Payment Successful</span>
                        
                            <button
                                type="button"
                                className="lock-close"
                                onClick={() => navigate(paths.home)}
                            >
                                <CloseIcon />
                            </button>

                        </div>

                        <div className="lock-divider" />

                        {/* CONTENT */}
                        <div className="membership">
                            <div className="lock-icon-box">
                                <img
                                    src="/img/payment.svg"
                                    alt="Success"
                                    className="lock-icon-image"
                                />
                            </div>

                            <h1 className="lock-title">Premium Access Activated</h1>
                            <p className="lock-subtitle">
                                You now have access to the platform. A confirmation email with all the relevant details has been sent to you.
                            </p>
                        </div>

                        <div className="lock-divider" />

                        {/* FOOTER */}
                        <div className="lock-footer">
                            <button
                                type="button"
                                className="lock-logout"
                                onClick={handleLogout}
                            >
                                Log Out
                            </button>

                            <button
                                type="button"
                                style={{color: '#FFF', cursor: 'pointer'}}
                                className="lock-unlock"
                                onClick={() => navigate(paths.home)}
                            >
                                Get Started
                            </button>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
