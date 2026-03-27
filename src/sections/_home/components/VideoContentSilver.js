/* eslint-disable */
import PropTypes from 'prop-types';
import Player from '@vimeo/player';
import { useEffect, useRef, useState } from 'react';
// @mui
import {
  Dialog,
  DialogContent,
} from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';
import LockIcon from '@mui/icons-material/Lock';
import { MotionViewport } from 'src/components/animate';
import { useAuthContext } from '../../../auth/useAuthContext';
import './VideoContentSilver.css';

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
};


export default function VideoContentSilver({ setCurrentPage,onChange }) {
  VideoContentSilver.propTypes = {
    setCurrentPage: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  const { user } = useAuthContext();

  const [activeIndex, setActiveIndex] = useState(0); 
  const [isPlaying, setIsPlaying] = useState(false);

  const iframeRef = useRef(null);
  const playerRef = useRef(null);

    const [openUpgrade, setOpenUpgrade] = useState(false);
      const [selectedPlan, setSelectedPlan] = useState(null);
        const membership = user?.membership;

   const hasNotExpired = () => {
    const expiry =
      user?.expire_date ||
      user?.expiry_date;

    if (!expiry || !expiry.seconds) {
      return true;
    }

    return Date.now() < expiry.seconds * 1000;
  };

  const hasAnyMembership = ['8', '9', '10'].includes(membership);
  const isSilver = membership === '8';
  const isAdvanced = membership === '9';
  const isGold = membership === '10' && hasNotExpired();

  const hasNoSubscription = user?.membership === '1' || !user?.membership;
  const isSubscribed =
    ['9','10'].includes(user?.membership) && hasNotExpired();

      const checkExpireDate = () => {
    const sec = user?.expire_date ? user.expire_date.seconds * 1000 : 0;
    if (!sec) return true;
    return Date.now() < sec;
  };

  const isExpired = !checkExpireDate();



  const effectiveMembership =
    isExpired ? '1' : String(user?.membership || '1');

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

const handleSubscription = () => {
  // NO membership → go to subscriptions page
  if (!hasAnyMembership) {
    setCurrentPage('Subscriptions');
    return;
  }

  // Existing members → open upgrade modal
  if (isSilver || isAdvanced) {
    setSelectedPlan('advanced');
    setOpenUpgrade(true);
  }
};


  const modules = [
    { name: 'WELCOME VIDEO', id: 1153829033 },
    { name: 'ELO RATINGS', id: 1034739032 },
    { name: 'SERVICE RATINGS', id: 1034739217 },
    { name: 'RETURN RATINGS', id: 1034739245 },
    { name: 'UNDER PRESSURE RATINGS', id: 1034739270 },
    { name: 'CENTRAL TENNIS BETTING MODEL', id: 1034739295 },
    { name: 'EXERCISE CLAY', id: 1034739314 },
    { name: 'EXERCISE HARD', id: 1034739336 },
    { name: 'EXERCISE GRASS', id: 1034739350 },
    // { name: 'UPDATE MODELS', id: 1042773017 },
    { name: 'SUMMARY', id: 1043640297 },
  ];

  // Initialize player once
  useEffect(() => {
    if (!iframeRef.current) return;

    try{
      playerRef.current = new Player(iframeRef.current, {
        id: modules[activeIndex].id,
        autopause: false,
      });
      playerRef.current.on('error', (error) => {
        console.error('Vimeo player error:', error);
      });

      playerRef.current.on('play', () => setIsPlaying(true));
      playerRef.current.on('pause', () => setIsPlaying(false));
    } catch (error) {
      console.error('Failed to initialize player:', error);
    }
    return () => {
      playerRef.current?.destroy();
    };
  }, []);

  // Load a new video when switching modules
  const changeVideo = async (index) => {
    if (!playerRef.current) return;

    try{
      await playerRef.current.loadVideo(modules[index].id);
      setActiveIndex(index);
      setIsPlaying(false);
    } catch (error) {
      console.error('Failed to load video:', error);
    }      
  };

  // Play/Pause for the specific module
  const togglePlayPause = async (index) => {
    if (!playerRef.current) return;
    
    try {
      if (index !== activeIndex) {
        // Load the new video and start playing
        await playerRef.current.loadVideo(modules[index].id);
        setActiveIndex(index);
        await playerRef.current.play();
        setIsPlaying(true);
        return;
      }

      const paused = await playerRef.current.getPaused();
      if (paused) {
        await playerRef.current.play();
        setIsPlaying(true);
      } else {
        await playerRef.current.pause();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error('Video playback error:', error);
      // Recovery mechanism
      try {
        await playerRef.current.loadVideo(modules[index].id);
        setActiveIndex(index);
      } catch (reloadError) {
        console.error('Failed to recover:', reloadError);
      }
    }
    };

  return (
    <MotionViewport>
      <div className="content-grid">
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

        <div className="all-content">
          <div className="video-container">
            <div className="video-outer-box">
              <div className="video-inner-box">
                {isSubscribed ? (
                  <iframe
                    ref={iframeRef}
                    src={`https://player.vimeo.com/video/${modules[activeIndex].id}?badge=0&autopause=0&player_id=0&app_id=58479`}
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    title="Course Video"
                    className="video-iframe"
                  />
                ) : (
                  <div className="locked-wrapper" style={{marginBottom:'32px'}}>
                  <div className='g-lock'>
                    <img src="/img/locked-premium.svg" alt="Locked" />
                  </div>

                  <h3 className="locked-text">
                    Advanced Content Locked
                  </h3>
                  <p className='locked-para'>One click away from full access</p>
                  <button
                    type="button"
                    className="update-btn"
                    onClick={handleSubscription}
                  >
                    {!hasAnyMembership
                      ? 'Purchase Membership'
                      : 'Upgrade Now'}
                  </button>

                </div>
                )}

                {modules.map((module, index) => (
                  <div
                    key={module.id}
                    className={`module-row ${isSubscribed ? 'clickable' : ''} ${activeIndex === index ? 'active' : ''
                      }`}
                    onClick={() => {
                      if (!isSubscribed) return;
                      togglePlayPause(index);
                    }}
                  >

                    <img
                      src="/img/silvber-content.svg"
                      alt="Play"
                      className="silver-content-icon"
                    />

                    <span className="module-title">{module.name}</span>
                    <span className="module-spacer" />

                    {!isSubscribed && <LockIcon />}

                    {isSubscribed && (
                      <button
                        type="button"
                        className="video-control-btn"
                        style={{
                          background: 'transparent',
                          border: 'none',
                          padding: 0,
                          cursor: 'pointer',
                        }}
                        onClick={(e) => {
                          e.stopPropagation(); // prevent row click
                          togglePlayPause(index);
                        }}
                      >
                        {activeIndex === index && isPlaying ? (
                          <img src="/img/silvde-pause.svg" alt="Pause" />
                        ) : (
                          <img src="/img/silver-play.svg" alt="Play" />
                        )}
                      </button>
                    )}

                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MotionViewport>
  );
}