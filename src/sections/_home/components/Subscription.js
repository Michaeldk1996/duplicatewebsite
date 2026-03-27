import { useNavigate } from 'react-router-dom';
// @mui
import { Box, Button, Container, Paper, Typography } from '@mui/material';
import { MotionViewport, varFade } from 'src/components/animate';
import useResponsive from 'src/hooks/useResponsive';
import { paths } from '../../../routes/paths';

// ----------------------------------------------------------------------

export default function Subscription() {
  const isDesktop = useResponsive('up', 'md');
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/', { replace: false });
  };

  const handleSilverSubscription = async (event) => {
    navigate(paths.register, { replace: true });
  };

  const handleGoldSubscription = async (event) => {
    navigate(paths.register, { replace: true });
  };

  return (
    <Container
      component={MotionViewport}
      sx={{
        pt: 11,
        px: 3,
      }}
    >
      <Paper
        sx={{
          borderRadius: 3,
          textAlign: 'center',
          backgroundColor: 'transparent',
          paddingTop: 0,
        }}
      >
        <Box sx={{ mt: isDesktop ? 2 : 0, mx: 'auto', maxWidth: 1086 }}>
          <Box sx={{ mt: 4, mx: 'auto', maxWidth: 1086 }}>
            <Box variants={varFade().inDown}>
              <Typography variant="h5" sx={{ color: 'primary.highlight', fontWeight: 700 }}>
                GET IMMEDIATE ACCESS TO OUR PROGRAMS
              </Typography>
            </Box>
            <Box variants={varFade().inDown}>
              <Typography variant="h1" sx={{ my: 3, color: 'primary.contrastText' }}>
                Engage with the new era of sports bettors
              </Typography>
            </Box>
            <Box
              variants={varFade().inDown}
              sx={{ width: '100%', display: 'flex', justifyContent: 'center', mb: 8 }}
            >
              <Typography variant="h6" sx={{ color: 'primary.contrastText', maxWidth: '724px' }}>
                Start today to secure immediate access to all programs and coaching available in our
                portfolio
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: isDesktop ? 'row' : 'column',
              width: '100%',
              mt: isDesktop ? 0 : 2,
              columnGap: isDesktop ? 6 : 0,
              rowGap: isDesktop ? 0 : 1,
              justifyContent: 'center',
            }}
          >
            <Box
              variants={varFade().inUp}
              sx={{
                flex: 1,
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '423px',
                height: '100%',
                pb: 5,
              }}
            >
              <Box
                sx={{
                  backgroundImage: 'linear-gradient(#0867ef, #0d1117)',
                  borderTopLeftRadius: '20px',
                  borderTopRightRadius: '20px',
                  pt: '2px',
                  pl: '2px',
                  pr: '2px',
                }}
              >
                <Box
                  sx={{
                    backgroundColor: '#0d1117',
                    borderRadius: '20px 20px 0 0',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    position: 'relative',
                    width: '200px',
                    height: '90px',
                  }}
                >
                  <Typography
                    sx={{
                      color: '#627083',
                      fontSize: '28px',
                      lineHeight: 1,
                      textDecoration: 'line-through',
                    }}
                  >
                    €850
                  </Typography>
                  <Box
                    sx={{
                      backgroundImage:
                        'linear-gradient(rgba(177, 177, 177, .55), #fff 0%, rgba(235, 235, 235, .88) 58%, rgba(0, 0, 0, 0))',
                      backgroundClip: 'text',
                      fontSize: '50px',
                      color: 'rgb(249, 250, 251)',
                      lineHeight: 1,
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    €397
                  </Box>
                </Box>
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
                    py: 3,
                    textAlign: 'start',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                    }}
                  >
                    <Box
                      component="img"
                      alt="Logo"
                      src="/assets/images/home/silver_large.png"
                      sx={{
                        width: '75px',
                        height: '75px',
                      }}
                    />
                    <Box
                      sx={{
                        backgroundImage: 'linear-gradient(#0867ef, #0867ef)',
                        borderRadius: '40px',
                        padding: '2px',
                        position: 'absolute',
                        top: '14px',
                        right: '14px',
                      }}
                    >
                      <Box
                        sx={{
                          padding: '5px 16px 8px',
                          fontSize: '11px',
                          lineHeight: '16px',
                          color: '#fff',
                          textAlign: 'center',
                          letterSpacing: '2px',
                          backgroundColor: '#0d1117',
                          border: '1px #484d54',
                          borderRadius: '40px',
                          fontWeight: 700,
                        }}
                      >
                        €33/month
                      </Box>
                    </Box>
                  </Box>
                  <Typography
                    variant="h3"
                    sx={{ color: 'primary.contrastText', mt: 3, textAlign: 'start' }}
                  >
                    Silver Program
                  </Typography>
                  <Typography variant="h7" sx={{ color: '#9a9a9a', mt: 3, textAlign: 'start' }}>
                    Get yearly access to the Silver Program and effortlessly copy and paste our
                    well-analyzed winning bets.
                  </Typography>
                  <Box
                    variants={varFade().inDown}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      pt: 3,
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      alt="check"
                      src="/assets/images/home/checkbox.svg"
                      sx={{
                        width: '22px',
                        height: '22px',
                      }}
                    />
                    <Typography sx={{ px: 1, color: 'primary.contrastText', fontSize: '15px' }}>
                      Copy & Paste Concept
                    </Typography>
                  </Box>
                  <Box
                    variants={varFade().inDown}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      mt: 1,
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      alt="check"
                      src="/assets/images/home/checkbox.svg"
                      sx={{
                        width: '22px',
                        height: '22px',
                      }}
                    />
                    <Typography sx={{ px: 1, color: 'primary.contrastText', fontSize: '15px' }}>
                      Telegram Live Channel
                    </Typography>
                  </Box>
                  <Box
                    variants={varFade().inDown}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      mt: 1,
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      alt="check"
                      src="/assets/images/home/checkbox.svg"
                      sx={{
                        width: '22px',
                        height: '22px',
                      }}
                    />
                    <Typography sx={{ px: 1, color: 'primary.contrastText', fontSize: '15px' }}>
                      BSP Tennis Betting Model
                    </Typography>
                  </Box>
                  <Box
                    variants={varFade().inDown}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      mt: 1,
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      alt="check"
                      src="/assets/images/home/checkbox.svg"
                      sx={{
                        width: '22px',
                        height: '22px',
                      }}
                    />
                    <Typography sx={{ px: 1, color: 'primary.contrastText', fontSize: '15px' }}>
                      Silver Video Content
                    </Typography>
                  </Box>
                  <Box
                    variants={varFade().inDown}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      mt: 1,
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      alt="check"
                      src="/assets/images/home/checkbox.svg"
                      sx={{
                        width: '22px',
                        height: '22px',
                        opacity: 0.5,
                      }}
                    />
                    <Typography
                      sx={{
                        px: 1,
                        color: 'primary.contrastText',
                        fontSize: '15px',
                        textDecoration: 'line-through',
                      }}
                    >
                      Masterclass Channel
                    </Typography>
                  </Box>
                  <Box
                    variants={varFade().inDown}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      mt: 1,
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      alt="check"
                      src="/assets/images/home/checkbox.svg"
                      sx={{
                        width: '22px',
                        height: '22px',
                        opacity: 0.5,
                      }}
                    />
                    <Typography
                      sx={{
                        px: 1,
                        color: 'primary.contrastText',
                        fontSize: '15px',
                        textDecoration: 'line-through',
                      }}
                    >
                      Masterclass Video Content
                    </Typography>
                  </Box>
                  <Box
                    variants={varFade().inDown}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      mt: 1,
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      alt="check"
                      src="/assets/images/home/checkbox.svg"
                      sx={{
                        width: '22px',
                        height: '22px',
                        opacity: 0.5,
                      }}
                    />
                    <Typography
                      sx={{
                        px: 1,
                        color: 'primary.contrastText',
                        fontSize: '15px',
                        textDecoration: 'line-through',
                      }}
                    >
                      Masterclass Zone
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      background: 'linear-gradient(#047efc, #12488f)',
                      position: 'relative',
                      overflow: 'hidden',
                      width: '100%',
                      height: '48px',
                      borderRadius: '8px',
                      mt: 4,
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
                        zIndex: 2,
                        color: '#FFF',
                        width: '100%',
                        height: '48px',
                        fontSize: 16,
                        fontWeight: 700,
                      }}
                      onClick={handleSilverSubscription}
                    >
                      Start Now
                      <Box
                        component="img"
                        alt="arrow"
                        src="/assets/images/home/arrow_outward_white.png"
                      />
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              variants={varFade().inUp}
              sx={{
                flex: 1,
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '423px',
                height: '100%',
                pb: 5,
              }}
            >
              <Box
                sx={{
                  backgroundImage: 'linear-gradient(#0867ef, #0d1117)',
                  borderTopLeftRadius: '20px',
                  borderTopRightRadius: '20px',
                  pt: '2px',
                  pl: '2px',
                  pr: '2px',
                }}
              >
                <Box
                  sx={{
                    backgroundColor: '#0d1117',
                    borderRadius: '20px 20px 0 0',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    position: 'relative',
                    width: '200px',
                    height: '90px',
                  }}
                >
                  <Typography
                    sx={{
                      color: '#627083',
                      fontSize: '28px',
                      lineHeight: 1,
                      textDecoration: 'line-through',
                    }}
                  >
                    €2500
                  </Typography>
                  <Box
                    sx={{
                      backgroundImage:
                        'linear-gradient(rgba(177, 177, 177, .55), #fff 0%, rgba(235, 235, 235, .88) 58%, rgba(0, 0, 0, 0))',
                      backgroundClip: 'text',
                      fontSize: '50px',
                      color: 'rgb(249, 250, 251)',
                      lineHeight: 1,
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    €997
                  </Box>
                </Box>
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
                    py: 3,
                    textAlign: 'start',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                    }}
                  >
                    <Box
                      component="img"
                      alt="Logo"
                      src="/assets/images/home/gold_large.png"
                      sx={{
                        width: '75px',
                        height: '75px',
                      }}
                    />
                    <Box
                      sx={{
                        backgroundImage: 'linear-gradient(#0867ef, #0867ef)',
                        borderRadius: '40px',
                        padding: '2px',
                        position: 'absolute',
                        top: '14px',
                        right: '14px',
                      }}
                    >
                      <Box
                        sx={{
                          padding: '5px 16px 8px',
                          fontSize: '11px',
                          lineHeight: '16px',
                          color: '#fff',
                          textAlign: 'center',
                          letterSpacing: '2px',
                          backgroundColor: '#0d1117',
                          border: '1px #484d54',
                          borderRadius: '40px',
                          fontWeight: 700,
                        }}
                      >
                        Most Valuable
                      </Box>
                    </Box>
                  </Box>
                  <Typography
                    variant="h3"
                    sx={{ color: 'primary.contrastText', mt: 3, textAlign: 'start' }}
                  >
                    Gold Program
                  </Typography>
                  <Typography variant="h7" sx={{ color: '#9a9a9a', mt: 3, textAlign: 'start' }}>
                    Pay only €997 once to get instant access to all Masterclass features. From the
                    second year, it&apos;s only €397 annually to maintain access.
                  </Typography>
                  <Box
                    variants={varFade().inDown}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      pt: 3,
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      alt="check"
                      src="/assets/images/home/checkbox.svg"
                      sx={{
                        width: '22px',
                        height: '22px',
                      }}
                    />
                    <Typography sx={{ px: 1, color: 'primary.contrastText', fontSize: '15px' }}>
                      Copy & Paste Concept
                    </Typography>
                  </Box>
                  <Box
                    variants={varFade().inDown}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      mt: 1,
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      alt="check"
                      src="/assets/images/home/checkbox.svg"
                      sx={{
                        width: '22px',
                        height: '22px',
                      }}
                    />
                    <Typography sx={{ px: 1, color: 'primary.contrastText', fontSize: '15px' }}>
                      Telegram Live Channel
                    </Typography>
                  </Box>
                  <Box
                    variants={varFade().inDown}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      mt: 1,
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      alt="check"
                      src="/assets/images/home/checkbox.svg"
                      sx={{
                        width: '22px',
                        height: '22px',
                      }}
                    />
                    <Typography sx={{ px: 1, color: 'primary.contrastText', fontSize: '15px' }}>
                      BSP Tennis Betting Model
                    </Typography>
                  </Box>
                  <Box
                    variants={varFade().inDown}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      mt: 1,
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      alt="check"
                      src="/assets/images/home/checkbox.svg"
                      sx={{
                        width: '22px',
                        height: '22px',
                      }}
                    />
                    <Typography sx={{ px: 1, color: 'primary.contrastText', fontSize: '15px' }}>
                      Silver Video Content
                    </Typography>
                  </Box>
                  <Box
                    variants={varFade().inDown}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      mt: 1,
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      alt="check"
                      src="/assets/images/home/checkbox.svg"
                      sx={{
                        width: '22px',
                        height: '22px',
                      }}
                    />
                    <Typography sx={{ px: 1, color: 'primary.contrastText', fontSize: '15px' }}>
                      Masterclass Channel
                    </Typography>
                  </Box>
                  <Box
                    variants={varFade().inDown}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      mt: 1,
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      alt="check"
                      src="/assets/images/home/checkbox.svg"
                      sx={{
                        width: '22px',
                        height: '22px',
                      }}
                    />
                    <Typography sx={{ px: 1, color: 'primary.contrastText', fontSize: '15px' }}>
                      Masterclass Video Content
                    </Typography>
                  </Box>
                  <Box
                    variants={varFade().inDown}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      mt: 1,
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      alt="check"
                      src="/assets/images/home/checkbox.svg"
                      sx={{
                        width: '22px',
                        height: '22px',
                      }}
                    />
                    <Typography sx={{ px: 1, color: 'primary.contrastText', fontSize: '15px' }}>
                      Masterclass Zone
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      background: 'linear-gradient(#047efc, #12488f)',
                      position: 'relative',
                      overflow: 'hidden',
                      width: '100%',
                      height: '48px',
                      borderRadius: '8px',
                      mt: 4,
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
                        fontWeight: 700,
                      }}
                      onClick={handleGoldSubscription}
                    >
                      Start Now
                      <Box
                        component="img"
                        alt="arrow"
                        src="/assets/images/home/arrow_outward_white.png"
                      />
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
