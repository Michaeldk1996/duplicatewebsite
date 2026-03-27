/* eslint-disable
  react/self-closing-comp,
  jsx-a11y/click-events-have-key-events,
  jsx-a11y/no-static-element-interactions
*/
/* eslint-disable no-nested-ternary */

import PropTypes from 'prop-types';
import { loadStripe } from '@stripe/stripe-js';
import { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {
  Container,
  Typography,
  Button,
  Dialog,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  CircularProgress
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { MotionViewport } from 'src/components/animate';
import { useAuthContext } from '../../../auth/useAuthContext';
import {trackEvent} from '../../../utils/trackVisitor'

const stripePromise = loadStripe(
  'pk_live_51NAUESCf4YXq1rsyBMpbCD1Yqi5kocGdjxYqcqknpppNXXnUKKCVxar7NqInLJRCJTCEVkbqQPppP7nvve8E053I00P0pVQI8d'
);

const UPGRADE_PRICE_MAP = {
  silver_to_advanced: 'price_1Sh1flCf4YXq1rsy94ex1p16',
  silver_to_gold: 'price_1OgVtOCf4YXq1rsy99bw9IHr',
  advanced_to_gold: 'price_1Sh1gECf4YXq1rsycqlOtspg',
};
const UPGRADE_CONFIG = {
  silver: {
    advanced: {
      title: 'Advanced Program',
      price: '€200',
      priceId: UPGRADE_PRICE_MAP.silver_to_advanced,
      features: [
        'Advanced Data Insights (BSP App)',
        'BSP Tennis Betting Model',
        'Essential Video Content',
      ],
    },
    gold: {
      title: 'Gold Program',
      price: '€600',
      priceId: UPGRADE_PRICE_MAP.silver_to_gold,
      features: [
        'Advanced Data Insights (BSP App)',
        'BSP Tennis Betting Model',
        'Essential Video Content',
        'High-Stakes Betting Frameworks',
        'BSP Masterclass (20+ Hours of Video)',
        'Real Time Study Cases',
      ],
    },
  },
  advanced: {
    gold: {
      title: 'Gold Program',
      price: '€400',
      priceId: UPGRADE_PRICE_MAP.advanced_to_gold,
      features: [
        'High-Stakes Betting Frameworks',
        'BSP Masterclass (20+ Hours of Video)',
        'Real Time Study Cases',
      ],
    },
  },
};


export default function Profile({ onChange }) {
  const { user, updateBankroll, resetPassword, deleteAccount } = useAuthContext();

  const checkExpireDate = () => {
    const sec = user?.expire_date ? user.expire_date.seconds * 1000 : 0;
    if (!sec) return true;
    return Date.now() < sec;
  };

  const isExpired = !checkExpireDate();

  const isGold = user?.membership === '10' && !isExpired;
  const isAdvanced = user?.membership === '9' && !isExpired;
  const isSilver = user?.membership === '8' && !isExpired;

  const hasNoSubscription =
    isExpired || user?.membership === '1' || !user?.membership;

  const effectiveMembership =
    isExpired ? '1' : String(user?.membership || '1');


  Profile.propTypes = {
    onChange: PropTypes.func.isRequired,
  };

  const [openBankroll, setOpenBankroll] = useState(false);
  const [bankroll, setBankroll] = useState(user?.bankroll);
  const [stakingStrategy, setStakingStrategy] = useState(user?.stakingStrategy);
  const [loadingBankroll, setLoadingBankroll] = useState(false);
  const [openStrategy, setOpenStrategy] = useState(false);
  const [loadingStrategy, setLoadingStrategy] = useState(false);

  const [openCancelSubscription, setOpenCancelSubscription] = useState(false);
  const [loadingCancelSubscription, setLoadingCancelSubscription] = useState(false);
  const [cancelSuccess, setCancelSuccess] = useState(false);
  const [cancelError, setCancelError] = useState(null);



  const [openUpgrade, setOpenUpgrade] = useState(false);

  const [deletAccountRequest, setDeletAccount] = useState(false);
  const [openResetPassword, setOpenResetPassword] = useState(false);
  const [loadingResetPassword, setLoadingResetPassword] = useState(false);


  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    if (openBankroll) {
      setBankroll(
        user?.bankroll !== undefined && user?.bankroll !== null
          ? user.bankroll
          : ""
      );
    }
  }, [openBankroll, user]);

  useEffect(() => {
    if (openStrategy) {
      setStakingStrategy(user?.stakingStrategy || 'Aggressive');
    }
  }, [openStrategy, user]);


  const onChangeBankroll = async () => {
    trackEvent("ChangeBankroll");
    setLoadingBankroll(true);
    await updateBankroll(bankroll, user?.stakingStrategy, user?.uid);
    setOpenBankroll(false);
    setLoadingBankroll(false);
  };
  const onChangeStrategy = async () => {
    trackEvent("ChangeStrategy");
    setLoadingStrategy(true);
    await updateBankroll(user?.bankroll, stakingStrategy, user?.uid);
    setOpenStrategy(false);
    setLoadingStrategy(false);
  };


  const onConfirmResetPassword = async () => {
    trackEvent("ResetPassword");
    setLoadingResetPassword(true);
    await resetPassword(user?.email);
    setLoadingResetPassword(false);
    setOpenResetPassword(false);
  };

  const onConfirmDeleteAccount = async () => {
    setLoadingResetPassword(true);
    await deleteAccount(user?.email);
    setLoadingResetPassword(false);
    setDeletAccount(false);
  };
  const onConfirmCancelSubscription = async () => {
    trackEvent("CancelSubscription");
    setCancelError(null);
    setLoadingCancelSubscription(true);
    try {
      const response = await fetch(
        'https://us-central1-bspconsult-bcd6e.cloudfunctions.net/cancelStripeRenewal',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: user?.email }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || 'Unknown error');
      }

      setOpenCancelSubscription(false);
      setCancelError(null);
      setCancelSuccess(true);
    } catch (error) {
      console.error('Cancel subscription error:', error);
      setCancelError(error.message);
    } finally {
      setLoadingCancelSubscription(false);
    }
  };

  const handleUpgradeCheckout = async (priceId) => {
    try {
      const stripe = await stripePromise;

      const response = await fetch(
        'https://us-central1-bspconsult-bcd6e.cloudfunctions.net/createCheckoutSession',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            priceId,
            customerEmail: user?.email,
            platform: 'web',
            upgrade: true, // optional but useful in webhook
          }),
        }
      );

      const session = await response.json();

      if (!session?.id) {
        throw new Error('Invalid Stripe session');
      }

      await stripe.redirectToCheckout({ sessionId: session.id });
    } catch (error) {
      console.error('Upgrade checkout error:', error);
    }
  };

  const currentPlan =
    isSilver ? 'silver' :
      isAdvanced ? 'advanced' :
        null;

  const upgradeData =
    currentPlan && selectedPlan
      ? UPGRADE_CONFIG[currentPlan]?.[selectedPlan]
      : null;


  return (
    <Container component={MotionViewport} className="content-grid">

      {/* ================= DIALOGS (UNCHANGED) ================= */}

      <Dialog
        open={openBankroll}
        onClose={() => setOpenBankroll(false)}
        maxWidth={false}
        PaperProps={{
          className: 'lock-gradient-box',
          sx: {
            background: 'rgba(18, 20, 30, 1)',
            padding: 0,
          },
        }}
        BackdropProps={{
          className: 'lock-paper',
        }}
      >
        <div className="lock-content">

          {/* HEADER */}
          <div className="lock-header">
            <span
              style={{
                flex: 1,
                textAlign: 'center',
                fontSize: '20px',
                fontWeight: 600,
              }}
            >
              Change your bankroll
            </span>


            <button
              type="button"
              className="lock-close"
              onClick={() => setOpenBankroll(false)}
            >
              <CloseIcon />
            </button>
          </div>

          <div className="lock-divider" />
          <h1 className="lock-title" style={{ fontSize: '18px' }}>Bankroll</h1>

          {/* BODY */}
          <div className="membership">
            <TextField
              fullWidth
              type="number"
              value={bankroll}
              onChange={(e)=>{
                  const value = e.target.value;
                  setBankroll(value === '' ? '' : Number(value));
              }}
              sx={{
                '& .MuiInputBase-root': {
                  height: 48,
                  backgroundColor: '#FFFFFF0A',
                  borderRadius: '8px',
                },
                '& .MuiInputBase-root:hover': {
                  backgroundColor: '#FFFFFF05',
                },
                '& .MuiInputBase-input': {
                  color: '#FFF',
                  fontSize: '16px',
                  padding: '0 14px',
                  display: 'flex',
                  alignItems: 'center',
                },
                '& fieldset': {
                  border: '1px solid rgba(255,255,255,0.12)',
                },
              }}
            />



          </div>

          <div className="lock-divider" />

          {/* FOOTER */}
          <div className="lock-footer">
            <button
              type="button"
              className="lock-logout"
              onClick={() => setOpenBankroll(false)}
            >
              Cancel
            </button>

            <button
              type="button"
              className="lock-unlock"
              onClick={onChangeBankroll}
              style={{
                color: '#FFFFFF',
              }}
            >
              {loadingBankroll ? (
                <>
                  <CircularProgress size={16} sx={{ color: '#FFFFFF' }} />
                  <span> Saving ...</span>
                </>
              ) : (
                'Confirm'
              )}
            </button>
          </div>

        </div>
      </Dialog>


      <Dialog
        open={openStrategy}
        onClose={() => setOpenStrategy(false)}
        maxWidth={false}
        PaperProps={{
          className: 'lock-gradient-box',
          sx: {
            background: 'rgba(18, 20, 30, 1)',
            padding: 0,
          },
        }}
        BackdropProps={{
          className: 'lock-paper',
        }}
      >
        <div className="lock-content">

          {/* HEADER */}
          <div className="lock-header">
            <span
              style={{
                flex: 1,
                textAlign: 'center',
                fontSize: '20px',
                fontWeight: 600,
              }}
            >Change staking strategy</span>

            <button
              type="button"
              className="lock-close"
              onClick={() => setOpenStrategy(false)}
            >
              <CloseIcon />
            </button>
          </div>

          <div className="lock-divider" />

          <h1 className="lock-title" style={{ fontSize: '18px' }}>Staking Strategy</h1>

          {/* BODY */}
          <div className="membership">
            <TextField
              select
              fullWidth
              value={stakingStrategy}
              onChange={(e) => setStakingStrategy(e.target.value)}
              SelectProps={{
                MenuProps: {
                  PaperProps: {
                    sx: {
                      mt: 1,
                      backgroundColor: '#1B1D27',
                      color: '#FFF',
                      borderRadius: '8px',
                    },
                  },
                  MenuListProps: {
                    sx: {
                      padding: '8px',
                    },
                  },
                },
              }}
              sx={{
                '& .MuiInputBase-root': {
                  height: 48,
                  backgroundColor: '#FFFFFF0A',
                  borderRadius: '8px',
                },
                '& .MuiInputBase-root:hover': {
                  backgroundColor: '#FFFFFF05',
                },
                '& .MuiInputBase-input': {
                  color: '#FFF',
                  fontSize: '16px',
                  padding: '0 14px',
                  display: 'flex',
                  alignItems: 'center',
                },
                '& fieldset': {
                  border: '1px solid rgba(255,255,255,0.12)',
                },


                '& .MuiMenuItem-root': {
                  borderRadius: 0,
                  minHeight: 48,
                  fontSize: '16px',
                },
                '& .MuiMenuItem-root:hover': {
                  backgroundColor: '#FFFFFF05',
                },
                '& .MuiMenuItem-root.Mui-selected': {
                  backgroundColor: '#FFFFFF0A',
                },
                '& .MuiMenuItem-root.Mui-selected:hover': {
                  backgroundColor: '#FFFFFF05',
                },
              }}
            >
              <MenuItem value="Conservative">Conservative</MenuItem>
              <MenuItem value="Balanced">Balanced</MenuItem>
              <MenuItem value="Aggressive">Aggressive</MenuItem>
            </TextField>





          </div>

          <div className="lock-divider" />

          {/* FOOTER */}
          <div className="lock-footer">
            <button
              type="button"
              className="lock-logout"
              onClick={() => setOpenStrategy(false)}
            >
              Cancel
            </button>

            <button
              type="button"
              className="lock-unlock"
              onClick={onChangeStrategy}
              disabled={loadingStrategy}
              style={{
                color: '#FFFFFF',
              }}
            >
              {loadingStrategy ? 'Saving...' : 'Confirm'}
            </button>
          </div>

        </div>
      </Dialog>


      <Dialog
        open={openResetPassword}
        onClose={() => setOpenResetPassword(false)}
        maxWidth={false}
        PaperProps={{
          className: 'lock-gradient-box',
          sx: {
            background: 'rgba(18, 20, 30, 1)',
            padding: 0,
          },
        }}
        BackdropProps={{
          className: 'lock-paper',
        }}
      >
        <div className="lock-content">

          {/* HEADER */}
          <div className="lock-header">
            <span
              style={{
                flex: 1,
                textAlign: 'center',
                fontSize: '20px',
                fontWeight: 600,
              }}
            >
              Reset Password
            </span>

            <button
              type="button"
              className="lock-close"
              onClick={() => setOpenResetPassword(false)}
            >
              <CloseIcon />
            </button>
          </div>

          <div className="lock-divider" />

          {/* BODY */}
          <div className="membership">
            <Typography sx={{ color: '#FFF', textAlign: 'center' }}>
              Are you sure you would like to get an email at
              <br />
              <strong>{user?.email}</strong> to reset your <br /> password?
            </Typography>
          </div>

          <div className="lock-divider" />

          {/* FOOTER */}
          <div className="lock-footer">
            <button
              type="button"
              className="lock-logout"
              onClick={() => setOpenResetPassword(false)}
            >
              Cancel
            </button>

            <button
              type="button"
              loading={loadingResetPassword}
              onClick={onConfirmResetPassword}
              className="lock-unlock"
              style={{
                color: '#FFFFFF',
              }}
            >
              Confirm
            </button>
          </div>

        </div>
      </Dialog>



      <Dialog open={deletAccountRequest} onClose={() => setDeletAccount(false)}>
        <DialogTitle sx={{ color: '#FFF' }}>Delete Account</DialogTitle>
        <DialogActions>
          <Button type='button' onClick={() => setDeletAccount(false)}>Cancel</Button>
          <LoadingButton loading={loadingResetPassword} onClick={onConfirmDeleteAccount}>
            Confirm
          </LoadingButton>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openUpgrade}
        onClose={() => setOpenUpgrade(false)}
        maxWidth={false}
        disableScrollLock
        PaperProps={{
          sx: {
            background: 'transparent',
            boxShadow: 'none',
            borderRadius: 0,
            padding: 0,
            margin: 0,
            overflow: 'visible',
          },
        }}
      >
        <DialogContent
          sx={{
            padding: 0,
            margin: 0,
            background: 'transparent',
            overflow: 'visible',
          }}
        >
          {!isGold && (isSilver || isAdvanced || hasNoSubscription) && (
            <div className="upgrade-box">

              {/* HEADER */}
              <div className="upgrade-content-header">
                <div className="upgrade-content">
                  <h3>{hasNoSubscription ? 'Choose Membership' : 'Upgrade Membership'}</h3>
                  <p>Upgrade to unlock advanced features and full access.</p>
                </div>

                <button
                  type="button"
                  className="upgrade-close"
                  onClick={() => setOpenUpgrade(false)}
                >
                  ✕
                </button>
              </div>

              <div className="upgrade-divider" />

              {/* PLAN SWITCH */}
              <div className="plan-switch">

                {(hasNoSubscription || isSilver) && (
                  <>
                    <button
                      type="button"
                      className={`plan-btn advanced ${selectedPlan === 'advanced' ? 'active' : ''}`}
                      onClick={() => setSelectedPlan('advanced')}
                    >
                      Advanced
                    </button>

                    <button
                      type="button"
                      className={`plan-btn gold ${selectedPlan === 'gold' ? 'active' : ''}`}
                      onClick={() => setSelectedPlan('gold')}
                    >
                      Gold
                    </button>
                  </>
                )}

                {isAdvanced && (
                  <button type="button" className="plan-btn gold active">
                    Gold
                  </button>
                )}

              </div>

              {/* DYNAMIC CARD */}
              {upgradeData && (
                <div className={`upgrade-card upgrade-card--${selectedPlan}`}>
                  <div className="upgrade-inner">

                    <div className="upgrade-headers">
                      <h3 className="upgrade-title">{upgradeData.title}</h3>

                      {selectedPlan === 'advanced' && (
                        <span className="best-value-badge">Best Value</span>
                      )}
                    </div>


                    <div className="upgrade-price">
                      <span className="price-amount">{upgradeData.price}</span>
                      <span className="price-period">one time fee</span>
                    </div>

                    <div className="upgrade-note">
                      Lock in current pricing before next update.
                    </div>

                    <button
                      type="button"
                      className={selectedPlan === 'gold' ? 'Gold-btn' : 'adva-btn'}
                      onClick={() => {
                        setOpenUpgrade(false);
                        handleUpgradeCheckout(upgradeData.priceId);
                      }}
                    >
                      Get {upgradeData.title}
                    </button>

                  </div>

                  <div className="upgrade-includes">
                    <h4>
                      Extra benefits with{' '}
                      <span className={selectedPlan === 'gold' ? 'gold-text' : 'advanced-text'}>
                        {selectedPlan === 'gold' ? 'Gold' : 'Advanced'}
                      </span>
                    </h4>

                    <ul>
                      {upgradeData.features.map((feature) => (
                        <li key={feature} className="active">
                          <img
                            src={
                              selectedPlan === 'gold'
                                ? '/img/gold-tick.svg'
                                : '/img/check-circle.svg'
                            }
                            alt="check"
                          />
                          <span className="include-text">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Cancel Subscription Confirm Dialog */}
      <Dialog
        open={openCancelSubscription}
        onClose={()=>{setCancelError(null);setOpenCancelSubscription(false);}}
        maxWidth={false}
        PaperProps={{
          className: 'lock-gradient-box',
          sx: { background: 'rgba(18, 20, 30, 1)', padding: 0 },
        }}
        BackdropProps={{ className: 'lock-paper' }}
      >
        <div className="lock-content">
          <div className="lock-header">
            <span style={{ flex: 1, textAlign: 'center', fontSize: '20px', fontWeight: 600 }}>
              Cancel Subscription
            </span>
            <button type="button" className="lock-close" onClick={() => setOpenCancelSubscription(false)}>
              <CloseIcon />
            </button>
          </div>
          <div className="lock-divider" />
          <div className="membership">
            <Typography sx={{ color: '#FFF', textAlign: 'center' }}>
              Are you sure to cancel your subscription and end your membership?
            </Typography>
            {cancelError && (
              <Typography sx={{ color: '#ff4d4f', textAlign: 'center', mt: 1, fontSize: '14px' }}>
                {cancelError}
              </Typography>
            )}
          </div>
          <div className="lock-divider" />
          <div className="lock-footer">
            <button type="button" className="lock-logout" onClick={() => setOpenCancelSubscription(false)}>
              Cancel
            </button>
            <button
              type="button"
              className="lock-unlock"
              onClick={onConfirmCancelSubscription}
              style={{ color: '#FFFFFF' }}
            >
              {loadingCancelSubscription ? (
                <>
                  <CircularProgress size={16} sx={{ color: '#FFFFFF' }} />
                  <span> Processing...</span>
                </>
              ) : (
                'Confirm'
              )}
            </button>
          </div>
        </div>
      </Dialog>

      {/* Cancel Subscription Success Dialog */}
      <Dialog
        open={cancelSuccess}
        onClose={() => setCancelSuccess(false)}
        maxWidth={false}
        PaperProps={{
          className: 'lock-gradient-box',
          sx: { background: 'rgba(18, 20, 30, 1)', padding: 0 },
        }}
        BackdropProps={{ className: 'lock-paper' }}
      >
        <div className="lock-content">
          <div className="lock-header">
            <span style={{ flex: 1, textAlign: 'center', fontSize: '20px', fontWeight: 600 }}>
              Subscription Cancelled
            </span>
            <button type="button" className="lock-close" onClick={() => setCancelSuccess(false)}>
              <CloseIcon />
            </button>
          </div>
          <div className="lock-divider" />
          <div className="membership">
            <Typography sx={{ color: '#FFF', textAlign: 'center' }}>
              Your subscription has been successfully cancelled.
            </Typography>
          </div>
          <div className="lock-divider" />
          <div className="lock-footer">
            <button
              type="button"
              className="lock-unlock"
              onClick={() => setCancelSuccess(false)}
              style={{ color: '#FFFFFF', width: '100%' }}
            >
              OK
            </button>
          </div>
        </div>
      </Dialog>

      {/* ================= UI ================= */}

      <div className="all-content">

        <div className="all-profile-info">

          {/* PERSONAL INFO */}
          <div className="info-box">
            <h3>Personal Information</h3>

            <div className="info-row">
              <span>Username</span>
              <span className="profile-ans">{user?.username}</span>
            </div>

            <div className="info-row">
              <span>E-mail</span>
              <span className="profile-ans">{user?.email}</span>
            </div>


            <div className="info-row">
              <span></span>
              <span className="profile-ans with-icon" onClick={() => setOpenResetPassword(true)}>
                Reset Password <img src="/img/Icon.svg" alt="" />
              </span>
            </div>
          </div>


          {/* SUBSCRIPTION */}
          <div className="info-box">
            <h3>Subscription</h3>

            <div className="program-type">
              {/* Show program name ONLY if user has subscription */}
              {!isExpired && (isSilver || isAdvanced || isGold) && (
                <p className="premium">
                  {isGold && 'Gold Program'}
                  {isAdvanced && 'Advanced Program'}
                  {isSilver && 'Silver Program'}
                </p>
              )}
              {(hasNoSubscription || isSilver || isAdvanced) && !isGold && (
                <button
                  type="button"
                  className="upgrade-btn"
                  onClick={() => {
                    if (hasNoSubscription) {
                      trackEvent("ChooseMembership");
                      onChange(effectiveMembership);
                      return;
                    }


                    // SILVER → open dialog (default Advanced)
                    if (isSilver) {
                      trackEvent("SilverUpgrade");
                      setSelectedPlan('advanced');
                    }

                    // ADVANCED → open dialog (default Gold)
                    if (isAdvanced) {
                      trackEvent("AdvancedUpgrade");
                      setSelectedPlan('gold');
                    }

                    setOpenUpgrade(true);
                  }}
                >
                  {hasNoSubscription ? 'Choose Membership' : 'Upgrade Membership'}
                </button>



              )}

            </div>
          </div>


          {/* RISK MANAGEMENT */}
          <div className="info-box">
            <h3>Risk Management</h3>

            <div className="info-row" onClick={() => setOpenBankroll(true)}>
              <span>Bankroll</span>
              <span className="profile-ans with-icon">
                {user?.bankroll}
                <img src="/img/chevron-right.svg" alt="" />
              </span>
            </div>

            <div className="info-row" onClick={() => setOpenStrategy(true)}>

              <span>Staking Strategy</span>
              <span className="profile-ans with-icon">
                {user?.stakingStrategy}
                <img src="/img/chevron-right.svg" alt="" />
              </span>
            </div>
          </div>

          {/* FREE TRAINING */}
          <div className="info-box">
            <h3>Free Training</h3>

            <a className="Strategy-btn" href="https://bspconsult.myclickfunnels.com/sports-betting?new_run=true">
              <span className="btn-left">
                <img src="/img/bsplogo.png" alt="" /> Strategy Models
              </span>
              <img src="/img/Icon.svg" className="btn-arrow" alt="" />
            </a>

          </div>

          {/* CONTACT */}
          <div className="info-box">
            <h3>Contact Us</h3>

            <div className="contact-buttons">
              <a className="contact-btn" href="https://instagram.com/bspconsult" target='_blank' rel="noopener noreferrer">
                <img src="/img/insta.svg" alt="" />
                <span>Instagram</span>
              </a>

              <a className="contact-btn" href="https://snapchat.com/t/78tjGoDM" target='_blank' rel="noopener noreferrer">
                <img src="/img/snap.svg" alt="" />
                <span>Snapchat</span>
              </a>
            </div>
          </div>

          {/* ACCOUNT */}
          <div className="info-box">
            <h3>Account Setting</h3>

            <a className="Strategy-btn" href="/terms-condition">
              <span className="btn-left">
                <img src="/img/tool-02.svg" alt="" /> Terms of Service
              </span>
            </a>

            <a className="Strategy-btn" href="/privacy-policy">
              <span className="btn-left">
                <img src="/img/file-shield-02.svg" alt="" /> Privacy Policy
              </span>
            </a>

            {(isGold || isSilver || isAdvanced) && (
              <button type="button" className="Strategy-btn" onClick={()=>{setOpenCancelSubscription(true); setCancelError(null);}}>
                <span className="btn-left">
                  <img src="/img/cancel.svg" alt="" /> Cancel Subscription
                </span>
              </button>
            )}

            <button type='button' className="delete-btn" onClick={() => setDeletAccount(true)}>
              Delete my Account
            </button>
          </div>

        </div>
      </div>
    </Container>
  );
}
