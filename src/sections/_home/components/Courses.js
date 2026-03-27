/* eslint-disable */
import PropTypes from 'prop-types';
import Player from '@vimeo/player';
import { useEffect, useRef, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
// @mui
import {
  Button,
  Dialog,
  DialogContent,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { useAuthContext } from '../../../auth/useAuthContext';
import './Courses.css'
// ----------------------------------------------------------------------

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


export default function Courses({ onChange }) {
  Courses.propTypes = {
    onChange: PropTypes.func.isRequired,
  };

  const { user } = useAuthContext();
  const [activeVideoUrl, setActiveVideoUrl] = useState(null);
  const [openAccordionIndex, setOpenAccordionIndex] = useState(0);

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

  const isSubscribed = isGold;

  const [courseUrl, setCourseUrl] = useState(
    'https://player.vimeo.com/video/912613882?badge=0&autopause=0&player_id=0&app_id=58479'
  );

  const iframeStyle = {
    border: 'none',
    width: '100%',
    height: '550px',
    marginTop: '32px',
  };

  const changeCourseUrl = (url) => {
    if (isSubscribed) {
      setCourseUrl(url);
    }
  };
  const iframeRefGold = useRef(null);
  const playerRefGold = useRef(null);

  const [activeGoldVideoId, setActiveGoldVideoId] = useState(null);
  const [isGoldPlaying, setIsGoldPlaying] = useState(false);
  const [goldPlayerReady, setGoldPlayerReady] = useState(false);


  const modules = [
    {
      title: 'Module 1 : Introduction',
      videos: [
        { name: 'WELCOME VIDEO', id: 1042772935 },
        { name: 'MY STORY', id: 734981672 },
        { name: 'THE REASON BEHIND THE SPORTS BETTING COURSE', id: 733157013 },
        { name: 'OVERVIEW COURSE', id: 733158094 },
        { name: 'EXPECTATIONS AND IDENTITY', id: 733171940 },
      ],
    },
    {
      title: 'Module 2 : Understanding of the sports betting market',
      videos: [
        { name: 'WHAT IS SPORTS BETTING?', id: 733173309 },
        { name: 'DIFFERENT PLAYERS ON THE SPORTS BETTING MARKET', id: 733231554 },
        { name: 'SPORTS BETTING IN NUMBERS', id: 733269224 },
      ],
    },
    {
      title: 'Module 3 : Today’s problem',
      videos: [
        { name: 'IDENTIFYING TODAY’S PROBLEM', id: 735391346 },
        { name: 'THE SCIENCE BEHIND SPORTSBETTING', id: 733579981 },
        { name: 'THE HOOKS OF THE BOOKMAKERS', id: 733581087 },
      ],
    },
    {
      title: 'Module 4 : Sports betting basics',
      videos: [
        { name: 'CALCULATING THE ODDS AND IMPLIED PROBABILITY', id: 734983428 },
        { name: 'WHY DO ODDS MOVE?', id: 733881443 },
        { name: 'WHAT IS VALUE?', id: 733630174 },
        { name: 'DIFFERENT TYPES OF BETTING', id: 733614871 },
      ],
    },
    {
      title: 'Module 5 : The foundation of success',
      videos: [
        { name: 'INTRODUCTION TO MINDSET', id: 733649070 },
        { name: 'LOSSES & GREED', id: 733887491 },
        { name: 'LOSS AVERSION', id: 733897110 },
        { name: 'KEY COMPONENTS OF A WINNER’S MINDSET', id: 733897829 },
        { name: 'DEVELOPING A BETTING PLAN', id: 733899981 },
      ],
    },
    {
      title: 'Module 6 : Sports betting models',
      videos: [
        { name: 'INTRODUCTION TO A SPORTS BETTING MODEL', id: 733913863 },
        { name: 'ELO MODEL', id: 733919214 },
        { name: 'POINT BASED MODEL', id: 733920507 },
        { name: 'TENNIS BETTING MODEL', id: 733921783 },
        { name: 'FOOTBALL BETTING MODEL', id: 735459112 },
      ],
    },
    {
      title: 'Module 7 : Tennis',
      videos: [
        { name: 'THE BASICS OF TENNIS', id: 733950187 },
        { name: 'TOUR CALENDAR', id: 733927566 },
        { name: 'IMPORTANT TENNIS FACTORS', id: 733988709 },
        { name: 'PRE-MATCH ANALYSIS TENNIS', id: 733972778 },
        { name: 'HOW TO READ TENNIS STATISTICS', id: 734004813 },
        { name: 'BEST TENNIS LINES BOOKMAKERS', id: 734039510 },
      ],
    },
    {
      title: 'Module 8 : Football',
      videos: [
        { name: 'PRINCIPLES OF EFFECTIVE MATCH ANALYSIS', id: 735802325 },
        { name: 'PRE-MATCH ANALYSIS FOOTBALL', id: 735856125 },
        { name: 'BEST FOOTBALL LINES BOOKMAKERS', id: 735474046 },
      ],
    },
    {
      title: 'Module 9 : Study cases',
      videos: [
        { name: 'STUDY CASE GRAND SLAM', id: 734356237 },
        { name: 'STUDY CASE ATP 250 NEWPORT', id: 734385041 },
        { name: 'STUDY CASE ATP 250 BASTAD', id: 734656700 },
        { name: 'STUDY CASE ATP 250 BASTAD', id: 734412757 },
        { name: 'STUDY CASE ATP 500 HAMBURG', id: 734641211 },
        { name: 'STUDY CASE ATP 500 HAMBURG', id: 734748841 },
        { name: 'STUDY CASE ATP 500', id: 734755316 },
        { name: 'STUDY CASE ATP 250 GSTAAD', id: 733903778 },
        { name: 'EXPLANATION POINT BETTING', id: 734767076 },
        { name: 'STUDY CASE POINTS BETTING GRAND SLAM', id: 734466060 },
        { name: 'STUDY CASE POINTS BETTING', id: 734984035 },
      ],
    },
    {
      title: 'Module 10 : Elite Club',
      videos: [
        { name: 'OVERVIEW OF THE ELITE CLUB', id: 737124387 },
      ],
    },
    {
      title: 'Module 11: Updated Sports Betting Model Tutorial',
      videos: [
        { name: 'WELCOME VIDEO', id: 1153829033 },
        { name: 'ELO RATINGS', id: 1034787418 },
        { name: 'SERVICE RATINGS', id: 1034787468 },
        { name: 'RETURN RATINGS', id: 1034787486 },
        { name: 'UNDER PRESSURE RATINGS', id: 1034787522 },
        { name: 'CENTRAL TENNIS BETTING MODEL', id: 1034787550 },
        { name: 'COURT CONDITIONS MODEL COMPONENTS', id: 958887773 },
        { name: 'COURT CONDITIONS MODEL USE', id: 958888135 },
        { name: 'EXERCISE CLAY', id: 1034787575 },
        { name: 'EXERCISE HARD', id: 1034787599 },
        { name: 'EXERCISE GRASS', id: 1034787615 },
        // { name: 'SUMMARY COURSE', id: 1034787615 },
        // { name: 'UPDATE MODELS', id: 1042773017 },
      ],
    },
    {
      title: 'Module 12 : Extra Content',
      videos: [
        { name: 'INDIAN WELLS & MIAMI OPEN', id: 927058082 },
        { name: 'COURT CONDITIONS & MY BOOKMAKERS', id: 930632756 },
        { name: 'Why Crypto Bookmakers?', id: 1057120140 },
      ],
    },
  ];

  useEffect(() => {
    if (!iframeRefGold.current) return;
    if (playerRefGold.current) return;

    const player = new Player(iframeRefGold.current);
    playerRefGold.current = player;

    player.on('play', () => setIsGoldPlaying(true));
    player.on('pause', () => setIsGoldPlaying(false));

    player.ready().then(() => {
      setGoldPlayerReady(true);

      const firstVideo = modules?.[0]?.videos?.[0];
      if (firstVideo) {
        setActiveGoldVideoId(firstVideo.id);
        player.loadVideo(firstVideo.id);
      }
    });

    return () => {
      player.destroy();
      playerRefGold.current = null;
      setGoldPlayerReady(false);
      setIsGoldPlaying(false);
    };
  }, []);

  const toggleGoldPlayPause = async (videoId) => {
    if (!playerRefGold.current || !goldPlayerReady) return;

    if (videoId !== activeGoldVideoId) {
      setActiveGoldVideoId(videoId);
      await playerRefGold.current.loadVideo(videoId);
      await playerRefGold.current.play();
      return;
    }

    const paused = await playerRefGold.current.getPaused();
    paused
      ? await playerRefGold.current.play()
      : await playerRefGold.current.pause();
  };




  const handleSubscription = () => {
    // NO membership → just go to subscriptions page
    if (!hasAnyMembership) {
      onChange('1');
      return;
    }

    // Existing members → open upgrade modal
    if (isSilver || isAdvanced) {
      setSelectedPlan('gold');
      setOpenUpgrade(true);
    }
  };

  const handleAccordionToggle = (index, event) => {
    event.preventDefault(); // Prevent default details toggle behavior
    event.stopPropagation(); // Stop event bubbling

    // If clicking the same accordion, close it; otherwise open the clicked one
    setOpenAccordionIndex(openAccordionIndex === index ? null : index);
  };


  const currentPlan =
    isSilver ? 'silver' :
      isAdvanced ? 'advanced' :
        null;
  const upgradeData =
    currentPlan && selectedPlan
      ? UPGRADE_CONFIG[currentPlan]?.[selectedPlan]
      : null;

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

  return (


    <div className='content-grid'>
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
                  <button
                    type="button"
                    className={`plan-btn gold ${selectedPlan === 'gold' ? 'active' : ''}`}
                    onClick={() => setSelectedPlan('gold')}
                  >
                    Gold
                  </button>
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

      <div className='all-content'>
        <div className="courses-wrapper">
          <div className="courses-border">
            <div className="courses-inner">

              {isSubscribed ? (
                <iframe
                  ref={iframeRefGold}
                  src="https://player.vimeo.com/video/1034739032"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  className="course-iframe"
                  title="Gold Zone Video"
                />
              ) : (
                <div className="locked-wrapper">
                  <div className='g-lock'>
                    <img src="/img/locked-premium.svg" alt="Locked" />
                  </div>

                  <h3 className="locked-text">
                    Gold Content Locked
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



              <h2 className="course-heading">
                Course Curriculum
              </h2>

              {modules.map((module, moduleIndex) => (
                <details
                  key={moduleIndex}
                  className="accordion"
                  open={openAccordionIndex === moduleIndex}
                >

                  <summary
                    className="accordion-summary"
                    onClick={(e) => handleAccordionToggle(moduleIndex, e)}
                  >
                    {module.title}

                    <span className="expand-icons">
                      <img src="/img/arrow-up.svg" className="icon-down" />
                      <img src="/img/arrow-down.svg" className="icon-up" />
                    </span>
                  </summary>


                  <div className="accordion-details">
                    {module.videos.map((video, videoIndex) => (
                      <div
                        key={videoIndex}
                        className={`video-row ${isSubscribed ? 'clickable' : ''}`}
                        onClick={() => {
                          if (!isSubscribed) return;
                          toggleGoldPlayPause(video.id);
                        }}

                      >
                        <img
                          src="/img/silvber-content.svg"
                          alt="Play"
                          className="video-left-icon"
                        />

                        <span className="video-title">{video.name}</span>

                        <span className="spacer" />

                        {isSubscribed ? (
                          activeGoldVideoId === video.id && isGoldPlaying ? (
                            <img src="/img/silvde-pause.svg" className="video-action-icon" />
                          ) : (
                            <img src="/img/silver-play.svg" className="video-action-icon" />
                          )
                        ) : (
                          <LockIcon />
                        )}

                      </div>
                    ))}
                  </div>
                </details>
              ))}

            </div>
          </div>
        </div>
      </div>
    </div>
  );

}
