import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';
// @mui
import { Box, Paper, Container, Typography } from '@mui/material';
import { MotionViewport } from 'src/components/animate';
import useResponsive from 'src/hooks/useResponsive';
import { useAuthContext } from '../../../auth/useAuthContext';
import { paths } from '../../../routes/paths';

// ----------------------------------------------------------------------
 const stripePromise = loadStripe("pk_live_51NAUESCf4YXq1rsyBMpbCD1Yqi5kocGdjxYqcqknpppNXXnUKKCVxar7NqInLJRCJTCEVkbqQPppP7nvve8E053I00P0pVQI8d");

export default function Enrolling() {
  const isDesktop = useResponsive('up', 'md');
  const { user, isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  const handleSilverSubscription = async (event) => {
    if (isAuthenticated) {
      // Get Stripe.js instance
      const stripe = await stripePromise;

      // Call your Firebase function
      const response = await fetch('https://us-central1-bspconsult-bcd6e.cloudfunctions.net/createCheckoutSession', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId: 'price_1OgVTPCf4YXq1rsyGHWrpUI3', customerEmail: user?.email, platform: 'web' })
      });

      const session = await response.json();

      // When the customer clicks on the button, redirect them to Checkout.
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer.
        console.error(result.error.message);
      }
    } else {
      navigate(paths.login, { replace: true });
    }
  };

  const handleGoldSubscription = async (event) => {
    if (isAuthenticated) {
      // Get Stripe.js instance
      const stripe = await stripePromise;

      // Call your Firebase function
      const response = await fetch('https://us-central1-bspconsult-bcd6e.cloudfunctions.net/createCheckoutSession', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId: 'price_1NqWtkCf4YXq1rsyDvmsIWtF', customerEmail: user?.email, platform: 'web' })
      });

      const session = await response.json();

      // When the customer clicks on the button, redirect them to Checkout.
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer.
        console.error(result.error.message);
      }
    } else {
      navigate(paths.login, { replace: true });
    }
  };
  return (
    <Container
      component={MotionViewport}
      sx={{
        pt: 7,
        px: 3
      }}
    >
      <Box sx={{ mt: 3, mx: 'auto', maxWidth: 1103, textAlign: 'center' }}>
        <Typography variant="h5" sx={{ color: 'primary.highlight', fontWeight: 700 }}>
          HERE&apos;S WHAT YOU GET
        </Typography>
        <Typography variant="h1" sx={{ my: 3, color: 'primary.contrastText' }}>
          {isDesktop ?
            "Enroll now for immediate access to" : "Get immediate acces to"}
        </Typography>
        <Box
          sx={{
            backgroundImage: 'linear-gradient(326deg, #076af4, #0d1117 49%, #086af5)',
            borderRadius: '24px',
            padding: '2px',
            transition: 'all .2s',
            position: 'relative',
            transform: 'none',
            boxShadow: '0 0 70px rgba(9, 134, 251, .19)'
          }}
        >
          <Paper
            sx={{
              textAlign: 'center',
              backgroundColor: '#0d1117',
              border: '1px solid rgba(239, 240, 246, .08)',
              transition: 'all .2s',
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: isDesktop ? 'row' : 'column',
              borderRadius: 3,
              padding: 3,
              boxShadow: '0 2px 7px rgba(20, 20, 43, .06)',
            }}
          >
            <Box
              component="img"
              alt="Copy & Paste Concept"
              src="/assets/images/home/copy_paste_concept.png"
              sx={{
                width: isDesktop ? '344px' : '100%',
                height: isDesktop ? '379px' : '100%'
              }}
            />
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              columnGap: '20px',
              maxWidth: '658px',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Typography variant="h2" sx={{ color: 'primary.contrastText', mt: isDesktop ? 0 : 3 }}>
                Copy & Paste Concept
              </Typography>

              <Typography variant="h4" sx={{ color: 'primary.contrastText', fontWeight: 200, textAlign: isDesktop ? 'left' : 'center', px: isDesktop ? '30px' : 0, pt: isDesktop ? 4 : 2 }}>
                Gain access to our app, where we regularly share multiple bets each week along with comprehensive analyses. Our bankroll calculator tool automatically determines the optimal stake based on your chosen bankroll, enabling you to build a steady, consistent income with just one click per day.
              </Typography>
              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                pt: 2
              }}>
                <Box
                  component="img"
                  alt="checkmark"
                  src="/assets/images/home/check.png"
                />
                <Box
                  component="img"
                  alt="silver"
                  src="/assets/images/home/silver_enable.png"
                  sx={{
                    pl: 1
                  }}
                  onClick={handleSilverSubscription}
                />
                <Box
                  component="img"
                  alt="checkmark"
                  src="/assets/images/home/check.png"
                  sx={{
                    pl: 3
                  }}
                />
                <Box
                  component="img"
                  alt="gold"
                  src="/assets/images/home/gold_enable.png"
                  sx={{
                    pl: 1
                  }}
                  onClick={handleGoldSubscription}
                />
                {/* <Box
                  component="img"
                  alt="checkmark"
                  src="/assets/images/home/check.png"
                  sx={{
                    pl: 3
                  }}
                />
                <Box
                  component="img"
                  alt="gold"
                  src="/assets/images/home/platinum_enable.png"
                  sx={{
                    pl: 1
                  }}
                /> */}
              </Box>
            </Box>
          </Paper>
        </Box>
        <Box
          sx={{
            backgroundImage: 'linear-gradient(326deg, #076af4, #0d1117 49%, #086af5)',
            borderRadius: '24px',
            padding: '2px',
            transition: 'all .2s',
            position: 'relative',
            transform: 'none',
            boxShadow: '0 0 70px rgba(9, 134, 251, .19)',
            mt: isDesktop ? 7 : 3,
          }}
        >
          <Paper
            sx={{
              textAlign: 'center',
              backgroundColor: '#0d1117',
              border: '1px solid rgba(239, 240, 246, .08)',
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: isDesktop ? 'row' : 'column',
              borderRadius: 3,
              padding: 3,
              boxShadow: '0 2px 7px rgba(20, 20, 43, .06)',
            }}
          >
            <Box
              component="img"
              alt="Telegram Live Channel"
              src="/assets/images/home/telegram_live_channel.png"
              sx={{
                width: isDesktop ? '344px' : '100%',
                height: isDesktop ? '379px' : '100%'
              }}
            />
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              columnGap: '20px',
              maxWidth: '658px',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Typography variant="h2" sx={{ color: 'primary.contrastText', mt: isDesktop ? 0 : 3 }}>
                Telegram Live Channel
              </Typography>

              <Typography variant="h4" sx={{ color: 'primary.contrastText', fontWeight: 200, textAlign: isDesktop ? 'left' : 'center', px: isDesktop ? '30px' : 0, pt: isDesktop ? 4 : 2 }}>
                Inside the Telegram live channel, you will have access to multiple weekly live calls on high-opportunity days, allowing you to profit from our live betting strategy.
              </Typography>
              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                pt: 2
              }}>
                <Box
                  component="img"
                  alt="checkmark"
                  src="/assets/images/home/check.png"
                />
                <Box
                  component="img"
                  alt="silver"
                  src="/assets/images/home/silver_enable.png"
                  sx={{
                    pl: 1
                  }}
                  onClick={handleSilverSubscription}
                />
                <Box
                  component="img"
                  alt="checkmark"
                  src="/assets/images/home/check.png"
                  sx={{
                    pl: 3
                  }}
                />
                <Box
                  component="img"
                  alt="gold"
                  src="/assets/images/home/gold_enable.png"
                  sx={{
                    pl: 1
                  }}
                  onClick={handleGoldSubscription}
                />
                {/* <Box
                  component="img"
                  alt="checkmark"
                  src="/assets/images/home/check.png"
                  sx={{
                    pl: 3
                  }}
                />
                <Box
                  component="img"
                  alt="gold"
                  src="/assets/images/home/platinum_enable.png"
                  sx={{
                    pl: 1
                  }}
                /> */}
              </Box>
            </Box>
          </Paper>
        </Box>
        <Box
          sx={{
            backgroundImage: 'linear-gradient(326deg, #076af4, #0d1117 49%, #086af5)',
            borderRadius: '24px',
            padding: '2px',
            transition: 'all .2s',
            position: 'relative',
            transform: 'none',
            boxShadow: '0 0 70px rgba(9, 134, 251, .19)',
            mt: isDesktop ? 7 : 3,
          }}
        >
          <Paper
            sx={{
              textAlign: 'center',
              backgroundColor: '#0d1117',
              border: '1px solid rgba(239, 240, 246, .08)',
              transition: 'all .2s',
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: isDesktop ? 'row' : 'column',
              borderRadius: 3,
              padding: 3,
              boxShadow: '0 2px 7px rgba(20, 20, 43, .06)',
            }}
          >
            <Box
              component="img"
              alt="BSP Tennis Betting Model"
              src="/assets/images/home/sports_betting_models.png"
              sx={{
                width: isDesktop ? '344px' : '100%',
                height: isDesktop ? '379px' : '100%'
              }}
            />
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              columnGap: '20px',
              maxWidth: '658px',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Typography variant="h2" sx={{ color: 'primary.contrastText', mt: isDesktop ? 0 : 3 }}>
                BSP Tennis Betting Model
              </Typography>

              <Typography variant="h4" sx={{ color: 'primary.contrastText', fontWeight: 200, textAlign: isDesktop ? 'left' : 'center', px: isDesktop ? '30px' : 0, pt: isDesktop ? 4 : 2 }}>
                With this model, you will be able to identify mispriced opportunities and errors made by bookmakers. Our brains often mislead us based on what we see and feel, but this model consolidates all the critical data you need to make accurate predictions and avoid mistakes. It also includes a complete video course on how to use the model effectively. Remember, perception can lie, but data doesn&apos;t.
              </Typography>
              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                pt: 2
              }}>
                <Box
                  component="img"
                  alt="checkmark"
                  src="/assets/images/home/check.png"
                />
                <Box
                  component="img"
                  alt="silver"
                  src="/assets/images/home/silver_enable.png"
                  sx={{
                    pl: 1
                  }}
                />
                <Box
                  component="img"
                  alt="checkmark"
                  src="/assets/images/home/check.png"
                  sx={{
                    pl: 3
                  }}
                />
                <Box
                  component="img"
                  alt="gold"
                  src="/assets/images/home/gold_enable.png"
                  sx={{
                    pl: 1
                  }}
                  onClick={handleGoldSubscription}
                />
                {/* <Box
                  component="img"
                  alt="checkmark"
                  src="/assets/images/home/check.png"
                  sx={{
                    pl: 3
                  }}
                />
                <Box
                  component="img"
                  alt="gold"
                  src="/assets/images/home/platinum_enable.png"
                  sx={{
                    pl: 1
                  }}
                /> */}
              </Box>
            </Box>
          </Paper>
        </Box>
        <Box
          sx={{
            backgroundImage: 'linear-gradient(326deg, #076af4, #0d1117 49%, #086af5)',
            borderRadius: '24px',
            padding: '2px',
            transition: 'all .2s',
            position: 'relative',
            transform: 'none',
            boxShadow: '0 0 70px rgba(9, 134, 251, .19)',
            mt: isDesktop ? 7 : 3,
          }}
        >
          <Paper
            sx={{
              textAlign: 'center',
              backgroundColor: '#0d1117',
              border: '1px solid rgba(239, 240, 246, .08)',
              transition: 'all .2s',
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: isDesktop ? 'row' : 'column',
              borderRadius: 3,
              padding: 3,
              boxShadow: '0 2px 7px rgba(20, 20, 43, .06)',
            }}
          >
            <Box
              component="img"
              alt="Masterclass Channel"
              src="/assets/images/home/masterclass_channel.png"
              sx={{
                width: isDesktop ? '344px' : '100%',
                height: isDesktop ? '379px' : '100%'
              }}
            />
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              columnGap: '20px',
              maxWidth: '658px',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Typography variant="h2" sx={{ color: 'primary.contrastText', mt: isDesktop ? 0 : 3 }}>
                Masterclass Channel
              </Typography>

              <Typography variant="h4" sx={{ color: 'primary.contrastText', fontWeight: 200, textAlign: isDesktop ? 'left' : 'center', px: isDesktop ? '30px' : 0, pt: isDesktop ? 4 : 3 }}>
                In the masterclass channel, we provide our Gold members with weekly previews of tournament court conditions, detailed player insights, and potential value opportunities throughout the week. Our goal through this channel is to give ambitious bettors all the essential information needed to succeed in this industry. Personal high-stakes bets are only shared exclusively here.
              </Typography>
              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                pt: 2
              }}>
                <Box
                  component="img"
                  alt="checkmark"
                  src="/assets/images/home/check_disable.png"
                />
                <Box
                  component="img"
                  alt="silver"
                  src="/assets/images/home/silver_disable.png"
                  sx={{
                    pl: 1
                  }}
                />
                <Box
                  component="img"
                  alt="checkmark"
                  src="/assets/images/home/check.png"
                  sx={{
                    pl: 3
                  }}
                />
                <Box
                  component="img"
                  alt="gold"
                  src="/assets/images/home/gold_enable.png"
                  sx={{
                    pl: 1
                  }}
                  onClick={handleGoldSubscription}
                />
                {/* <Box
                  component="img"
                  alt="checkmark"
                  src="/assets/images/home/check.png"
                  sx={{
                    pl: 3
                  }}
                />
                <Box
                  component="img"
                  alt="gold"
                  src="/assets/images/home/platinum_enable.png"
                  sx={{
                    pl: 1
                  }}
                /> */}
              </Box>
            </Box>
          </Paper>
        </Box>
        <Box
          sx={{
            backgroundImage: 'linear-gradient(326deg, #076af4, #0d1117 49%, #086af5)',
            borderRadius: '24px',
            padding: '2px',
            transition: 'all .2s',
            position: 'relative',
            transform: 'none',
            boxShadow: '0 0 70px rgba(9, 134, 251, .19)',
            mt: isDesktop ? 7 : 3,
          }}
        >
          <Paper
            sx={{
              textAlign: 'center',
              backgroundColor: '#0d1117',
              border: '1px solid rgba(239, 240, 246, .08)',
              transition: 'all .2s',
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: isDesktop ? 'row' : 'column',
              borderRadius: 3,
              padding: 3,
              alignItems: 'center',
              boxShadow: '0 2px 7px rgba(20, 20, 43, .06)',
            }}
          >
            <Box
              component="img"
              alt="Masterclass Video Content"
              src="/assets/images/home/masterclass_video_content.png"
              sx={{
                width: isDesktop ? '344px' : '100%',
                height: isDesktop ? '379px' : '100%'
              }}

            />
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              columnGap: '20px',
              maxWidth: '658px',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Typography variant="h2" sx={{ color: 'primary.contrastText', mt: isDesktop ? 0 : 4 }}>
                Masterclass Video Content
              </Typography>

              <Typography variant="h4" sx={{ color: 'primary.contrastText', fontWeight: 200, textAlign: isDesktop ? 'left' : 'center', px: isDesktop ? '30px' : 0, pt: isDesktop ? 4 : 3 }}>
                This video course includes over 20 hours of expertise, where we reveal all the secrets of our strategy, sharing our sources, knowledge, and tools. At the end, we’ve included a proof of concept for our strategy, demonstrating its use in real time as we scaled our account to a €14,000 profit in just two weeks. Every step, including both wins and losses, is documented to help you understand how to start from scratch and effectively scale your betting account using our strategy and tools.
              </Typography>
              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                pt: 2
              }}>
                <Box
                  component="img"
                  alt="checkmark"
                  src="/assets/images/home/check_disable.png"
                />
                <Box
                  component="img"
                  alt="silver"
                  src="/assets/images/home/silver_disable.png"
                  sx={{
                    pl: 1
                  }}
                />
                <Box
                  component="img"
                  alt="checkmark"
                  src="/assets/images/home/check.png"
                  sx={{
                    pl: 3
                  }}
                />
                <Box
                  component="img"
                  alt="gold"
                  src="/assets/images/home/gold_enable.png"
                  sx={{
                    pl: 1
                  }}
                  onClick={handleGoldSubscription}
                />
                {/* <Box
                  component="img"
                  alt="checkmark"
                  src="/assets/images/home/check.png"
                  sx={{
                    pl: 3
                  }}
                />
                <Box
                  component="img"
                  alt="gold"
                  src="/assets/images/home/platinum_enable.png"
                  sx={{
                    pl: 1
                  }}
                /> */}
              </Box>
            </Box>
          </Paper>
        </Box>
        <Box
          sx={{
            backgroundImage: 'linear-gradient(326deg, #076af4, #0d1117 49%, #086af5)',
            borderRadius: '24px',
            padding: '2px',
            transition: 'all .2s',
            position: 'relative',
            transform: 'none',
            boxShadow: '0 0 70px rgba(9, 134, 251, .19)',
            mt: isDesktop ? 7 : 3,
          }}
        >
          <Paper
            sx={{
              textAlign: 'center',
              backgroundColor: '#0d1117',
              border: '1px solid rgba(239, 240, 246, .08)',
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: isDesktop ? 'row' : 'column',
              borderRadius: 3,
              padding: 3,
              boxShadow: '0 2px 7px rgba(20, 20, 43, .06)',
            }}
          >
            <Box
              component="img"
              alt="Masterclass zone"
              src="/assets/images/home/photopreview.png"
              sx={{
                width: isDesktop ? '344px' : '100%',
                height: isDesktop ? '379px' : '100%'
              }}
            />
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              columnGap: '20px',
              maxWidth: '658px',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Typography variant="h2" sx={{ color: 'primary.contrastText', mt: isDesktop ? 0 : 3 }}>
                Masterclass zone
              </Typography>

              <Typography variant="h4" sx={{ color: 'primary.contrastText', fontWeight: 200, textAlign: isDesktop ? 'left' : 'center', px: isDesktop ? '30px' : 0, pt: isDesktop ? 4 : 2 }}>
                The most important games of the day will be previewed in this section, providing you with detailed, in-depth information that you won&apos;t find anywhere else ; insights that can help you avoid mistakes and spot opportunities before others. Remember, the more niche your focus, the better your sources, and the faster you can access key information that bookmakers don&apos;t have.
              </Typography>
              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                pt: 2
              }}>
                <Box
                  component="img"
                  alt="checkmark"
                  src="/assets/images/home/check_disable.png"
                />
                <Box
                  component="img"
                  alt="silver"
                  src="/assets/images/home/silver_disable.png"
                  sx={{
                    pl: 1
                  }}
                  onClick={handleSilverSubscription}
                />
                <Box
                  component="img"
                  alt="checkmark"
                  src="/assets/images/home/check.png"
                  sx={{
                    pl: 3
                  }}
                />
                <Box
                  component="img"
                  alt="gold"
                  src="/assets/images/home/gold_enable.png"
                  sx={{
                    pl: 1
                  }}
                  onClick={handleGoldSubscription}
                />
                {/* <Box
                  component="img"
                  alt="checkmark"
                  src="/assets/images/home/check.png"
                  sx={{
                    pl: 3
                  }}
                />
                <Box
                  component="img"
                  alt="gold"
                  src="/assets/images/home/platinum_enable.png"
                  sx={{
                    pl: 1
                  }}
                /> */}
              </Box>
            </Box>
          </Paper>
        </Box>
        {/* <Box
          sx={{
            backgroundImage: 'linear-gradient(326deg, #076af4, #0d1117 49%, #086af5)',
            borderRadius: '24px',
            padding: '2px',
            transition: 'all .2s',
            position: 'relative',
            transform: 'none',
            boxShadow: '0 0 70px rgba(9, 134, 251, .19)',
            mt: isDesktop?7:3,
          }}
        >
          <Paper
            sx={{
              textAlign: 'center',
              backgroundColor: '#0d1117',
              border: '1px solid rgba(239, 240, 246, .08)',
              transition: 'all .2s',
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: isDesktop?'row':'column',
              borderRadius: 3,
              padding: 3,
              boxShadow: '0 2px 7px rgba(20, 20, 43, .06)',
            }}
          >
            <Box
              component="img"
              alt="Masterclass Channel"
              src="/assets/images/home/exclusive_coaching_program.png"
              sx={{
                width: isDesktop?'344px':'100%',
                height: isDesktop?'379px':'100%'
              }}
            />
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              columnGap: '20px',
              maxWidth: '658px',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              {isDesktop?
              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Typography variant="h2" sx={{ color: 'primary.contrastText' }}>
                  Exclusive coaching program
                </Typography>
                <Box
                  component="img"
                  alt="Exclusive coaching program"
                  src="/assets/images/home/bluestar.png"
                  sx={{
                    width: '21px',
                    height: '20px',
                    mx:1
                  }}
                  />
              </Box>
              : <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                mt: 3,
                position: 'relative'
              }}>
                <Typography variant="h2" sx={{ color: 'primary.contrastText' }}>
                  Exclusive
                </Typography>
                <Typography variant="h2" sx={{ color: 'primary.contrastText' }}>
                  coaching program
                </Typography>
                <Box
                  component="img"
                  alt="Exclusive coaching program"
                  src="/assets/images/home/bluestar.png"
                  sx={{
                    width: '21px',
                    height: '20px',
                    position: 'absolute',
                    top: 8,
                    right: 16,
                  }}
                  />
              </Box>
              }
              <Typography variant="h4" sx={{ color: 'primary.contrastText', fontWeight: 200, textAlign: isDesktop?'left':'center', px: isDesktop?'30px':0, pt: isDesktop?4:3}}>
                This program is brand new, offering 1-on-1 weekly coaching sessions where we will serve as your accountability partner. We will provide support and evaluate your bookmaker&apos;s account on a weekly basis, assist you in scaling it, and ensure that you maintain emotional discipline. By joining us, you&apos;ll become part of our network, allowing us to collectively invest our sports betting profits in various investment projects
              </Typography>
              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                pt: 2
              }}>
                <Box
                  component="img"
                  alt="checkmark"
                  src="/assets/images/home/check_disable.png"
                />
                <Box
                  component="img"
                  alt="silver"
                  src="/assets/images/home/silver_disable.png"
                  sx={{
                    pl: 1
                  }}
                />
                <Box
                  component="img"
                  alt="checkmark"
                  src="/assets/images/home/check_disable.png"
                  sx={{
                    pl: 3
                  }}
                />
                <Box
                  component="img"
                  alt="gold"
                  src="/assets/images/home/gold_enable.png"
                  sx={{
                    pl: 1,
                    opacity: 0.5
                  }}
                  onClick={handleGoldSubscription}
                />
                <Box
                  component="img"
                  alt="checkmark"
                  src="/assets/images/home/check.png"
                  sx={{
                    pl: 3
                  }}
                />
                <Box
                  component="img"
                  alt="gold"
                  src="/assets/images/home/platinum_enable.png"
                  sx={{
                    pl: 1
                  }}
                />
              </Box>
            </Box>
          </Paper>
        </Box> */}
      </Box>
    </Container>
  );
}
