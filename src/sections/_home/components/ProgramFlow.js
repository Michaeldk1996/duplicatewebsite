import { m } from 'framer-motion';
// @mui
import { Unstable_Grid2 as Grid, Box, Paper, Container, Typography } from '@mui/material';
import { MotionViewport, varFade } from 'src/components/animate';
import useResponsive from 'src/hooks/useResponsive';

// ----------------------------------------------------------------------

export default function ProgramFlow() {
  const isDesktop = useResponsive('up', 'md');
  return (
    <Container
      component={MotionViewport}
      sx={{
        pt: 1,
        px: 3
      }}
    >
      <Paper
        sx={{
          pb: 13,
          borderRadius: 3,
          textAlign: 'center',
          backgroundColor: 'transparent',
          paddingTop: 0,
        }}
      >
        <Box sx={{ mt: 10, mx: 'auto', minWidth: isDesktop?1200:'100%', maxWidth: isDesktop?1200: '100%' }}>
          <m.div variants={varFade().inDown}>
            <Typography variant="h5" sx={{ color: 'primary.highlight', fontWeight: 700 }}>
            EXPLORE THE ADVANTAGES OFFERED
            </Typography>
          </m.div>
          <m.div variants={varFade().inDown}>
            <Typography variant="h1" sx={{ my: isDesktop?3:1, color: 'primary.contrastText'}}>
            By our programs
            </Typography>
          </m.div>
          {isDesktop?
          <Box
          sx={{
            gap: '36px',
            display: 'flex',
            flexDirection: 'column',
            width: '100%'         
          }}
        >
          <Box variants={varFade().inUp} sx={{display: 'flex', flexDirection: 'row', columnGap: 1, alignItems: 'center', pt: 2}}>
            <Box sx={{flex: 1, height: '2px'}}/>
            <Box sx={{width: '64px', height: '64px', borderRadius: '100px', display: 'flex',  justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF', fontWeight: 700, fontSize: '23px'}}>
                <Typography variant='h4' style={{ color: '#000'}}>
                  1
                </Typography>
            </Box>
            <Box sx={{width: '340px', height: '2px', backgroundColor: '#E3E6E980'}}/>
            <Box sx={{width: '64px', height: '64px', borderRadius: '100px', display: 'flex',  justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF', fontWeight: 700, fontSize: '23px'}}>
              <Typography variant="h4" sx={{ my: 3, color: 'primary.blackText'}}>
                2
              </Typography>
            </Box>
            <Box sx={{width: '330px', height: '2px', backgroundColor: '#E3E6E980'}}/>
            <Box sx={{width: '64px', height: '64px', borderRadius: '100px', display: 'flex',  justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF', fontWeight: 700, fontSize: '23px'}}>
              <Typography variant="h4" sx={{ my: 3, color: 'primary.blackText'}}>
                3
              </Typography>
            </Box>
            <Box sx={{flex: 1, height: '2px'}}/>
          </Box>
          <Grid variants={varFade().inUp} sx={{flex: 1, display: 'flex', alignItems: 'start', flexDirection: 'row', columnGap: 5}}>
            <Box sx={{ display: 'flex', flexDirection: 'row', flex: 1, columnGap: 2}}>
              <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1}}>
                <Typography sx={{ color: 'primary.contrastText', textAlign: 'center', fontSize: '30px', fontWeight: 700}}>
                  Embrace the
                  <Box component="span" sx={{ color: 'primary.highlight' }}>
                    {` skill to overcome the challenges `}
                  </Box>
                  of Sports Betting
                </Typography>
                <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'center', mt: 2}}>
                Through our programs, you will develop the skill and expertise needed to master the game, achieving maximum profitability in Sports Betting
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', flex: 1, columnGap: 2}}>
              <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1}}>
                <Typography sx={{ color: 'primary.contrastText', textAlign: 'center', fontSize: '30px', fontWeight: 700}}>
                  <Box component="span" sx={{ color: 'primary.highlight' }}>
                    {` Game-changing tools `}
                  </Box>
                  to identify value and errors of the bookmakers
                </Typography>
                <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'center', mt: 2 }}>
                Within our programs, you will learn to employ the most game-changing betting models, allowing you to see where the real probability does not correspond to the current market situation.
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', flex: 1, columnGap: 2}}>
              <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1}}>
                <Typography sx={{ color: 'primary.contrastText', textAlign: 'center', fontSize: '30px', fontWeight: 700}}>
                 Revolutionary Betting Strategy for 
                  <Box component="span" sx={{ color: 'primary.highlight' }}>
                    {` Ultimate Profitability `}
                  </Box>
                </Typography>
                <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'center', mt: 2 }}>
                Discover our strategy that led to an impressive personal profit of €280K in 2022. It’s a mix of all the best sources, sports models, and markets that align to help you develop a new high-income skill.
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Box>
          // <Box
          //   sx={{
          //     gap: '32px',
          //     display: 'flex',
          //     width: '100%'         
          //   }}
          // >
          //   <Grid variants={varFade().inUp} sx={{flex: 1, alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
          //     <Box
          //       component="img"
          //       sx={{
          //         height: 400,
          //         width: 400,
          //         maxHeight: { xs: 500, md: 500 },
          //         maxWidth: { xs: 500, md: 500 },
          //         borderRadius: '64px'
          //       }}
          //       alt="The house from the offer."
          //       src="/assets/images/home/animation.gif"
          //     />
          //   </Grid>
          //   <Box variants={varFade().inUp} sx={{display: 'flex', flexDirection: 'column', rowGap: '20px', alignItems: 'center', pt: 0}}>
          //     <Box sx={{width: '48px', height: '48px', borderRadius: '100px', backgroundColor:'#FFF', display: 'flex',  justifyContent: 'center', alignItems: 'center'}}>
          //       <Typography variant="h4" sx={{ my: 3, color: 'primary.blackText'}}>
          //         1
          //       </Typography>
          //     </Box>
          //     <Box sx={{width: '2px', height: '210px', backgroundColor: '#E3E6E980'}}/>
          //     <Box sx={{width: '48px', height: '48px', borderRadius: '100px', backgroundColor:'#FFF', display: 'flex',  justifyContent: 'center', alignItems: 'center'}}>
          //       <Typography variant="h4" sx={{ my: 3, color: 'primary.blackText'}}>
          //         2
          //       </Typography>
          //     </Box>
          //     <Box sx={{width: '2px', height: '210px', backgroundColor: '#E3E6E980'}}/>
          //     <Box sx={{width: '48px', height: '48px', borderRadius: '100px', backgroundColor:'#FFF', display: 'flex',  justifyContent: 'center', alignItems: 'center'}}>
          //       <Typography variant="h4" sx={{ my: 3, color: 'primary.blackText'}}>
          //         3
          //       </Typography>
          //     </Box>
          //     <Box sx={{width: '2px', height: '210px', backgroundColor: '#E3E6E980'}}/>
          //   </Box>
          //   <Grid variants={varFade().inUp} sx={{flex: 1, display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
          //   <Typography variant="h3" sx={{ color: 'primary.contrastText', textAlign: 'left'}}>
          //       Embrace the
          //       <Box component="span" sx={{ color: 'primary.highlight' }}>
          //         {` mindset to overcome the challenges `}
          //       </Box>
          //       of sports betting
          //     </Typography>
          //     <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 2 }}>
          //     Through our programs, you will gain the necessary mindset and expertise to master emotions, achieving maximum profitability in Sports Betting
          //     </Typography>
          //     <Typography variant="h3" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 6}}>
          //       <Box component="span" sx={{ color: 'primary.highlight' }}>
          //         {` Game-changing tools `}
          //       </Box>
          //       for identifying value in your odds
          //     </Typography>
          //     <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 2 }}>
          //       Within our programs, you will learn to employ the most game-changing betting models, allowing you to see where the real probability does not correspond to the current market situation
          //     </Typography>
          //     <Typography variant="h3" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 4}}>
          //       Key strategy for
          //       <Box component="span" sx={{ color: 'primary.highlight' }}>
          //         {` ultimate profitability `}
          //       </Box>
          //     </Typography>
          //     <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 2 }}>
          //       Here you will gain insight into our strategy that resulted in a record-breaking personal profit of 280K in 2022. All the sources, sports models, sports, and markets match up as perfectly as possible to develop a new high-income skill
          //     </Typography>
          //   </Grid>
          // </Box>
          :
          <Box sx={{display: 'flex', flexDirection: 'column', mt: 3}}>
            <Box variants={varFade().inUp} sx={{display: 'flex', flexDirection: 'row', rowGap: '20px', pt: 0}}>
              <Box variants={varFade().inUp} sx={{display: 'flex', flexDirection: 'column', rowGap: '20px', alignItems: 'center', pt: 0}}>
                <Box sx={{width: '48px', height: '48px', borderRadius: '100px', backgroundColor:'#FFF', display: 'flex',  justifyContent: 'center', alignItems: 'center'}}>
                  <Typography variant="h4" sx={{ my: 3, color: 'primary.blackText'}}>
                    1
                  </Typography>
                </Box>
                <Box sx={{width: '2px', height: '250px', backgroundColor: '#E3E6E980'}}/>
              </Box>
              <Box variants={varFade().inUp} sx={{ml: 3}}>
                <Typography variant="h3" sx={{ color: 'primary.contrastText', textAlign: 'left'}}>
                  Embrace the
                  <Box component="span" sx={{ color: 'primary.highlight' }}>
                    {` skill to overcome the challenges `}
                  </Box>
                  of sports betting
                </Typography>
                <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 2 }}>
                Through our programs, you will gain the necessary mindset and expertise to master emotions, achieving maximum profitability in Sports Betting
                </Typography>
              </Box>
            </Box>
            <Box variants={varFade().inUp} sx={{display: 'flex', flexDirection: 'row', rowGap: '20px', pt: 3}}>
              <Box variants={varFade().inUp} sx={{display: 'flex', flexDirection: 'column', rowGap: '20px', alignItems: 'center', pt: 0}}>
                <Box sx={{width: '48px', height: '48px', borderRadius: '100px', backgroundColor:'#FFF', display: 'flex',  justifyContent: 'center', alignItems: 'center'}}>
                  <Typography variant="h4" sx={{ my: 3, color: 'primary.blackText'}}>
                    2
                  </Typography>
                </Box>
                <Box sx={{width: '2px', height: '250px', backgroundColor: '#E3E6E980'}}/>
              </Box>
              <Box variants={varFade().inUp} sx={{ml: 3}}>
                <Typography variant="h3" sx={{ color: 'primary.contrastText', textAlign: 'left'}}>
                 <Box component="span" sx={{ color: 'primary.highlight' }}>
                   {` Game-changing tools `}
                 </Box>
                 for identifying value in your odds
               </Typography>
               <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 2 }}>
                Within our programs, you will learn to employ the most game-changing betting models, allowing you to see where the real probability does not correspond to the current market situation
               </Typography>
              </Box>
            </Box>
            <Box variants={varFade().inUp} sx={{display: 'flex', flexDirection: 'row', rowGap: '20px', pt: 3}}>
              <Box variants={varFade().inUp} sx={{display: 'flex', flexDirection: 'column', rowGap: '20px', alignItems: 'center', pt: 0}}>
                <Box sx={{width: '48px', height: '48px', borderRadius: '100px', backgroundColor:'#FFF', display: 'flex',  justifyContent: 'center', alignItems: 'center'}}>
                  <Typography variant="h4" sx={{ my: 3, color: 'primary.blackText'}}>
                    3
                  </Typography>
                </Box>
                <Box sx={{width: '2px', height: '250px', backgroundColor: '#E3E6E980'}}/>
              </Box>
              <Box variants={varFade().inUp} sx={{ml: 3}}>
              <Typography variant="h3" sx={{ color: 'primary.contrastText', textAlign: 'left'}}>
              Revolutionary betting approach for
                 <Box component="span" sx={{ color: 'primary.highlight' }}>
                   {` ultimate profitability `}
                 </Box>
               </Typography>
               <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 2 }}>
                 Discover our strategy that led to an impressive personal profit of $280K in 2022. We&apos;ll share the sources, sports models, sports, and markets we aligned together to develop a new high income skill.
               </Typography>
              </Box>
            </Box>
          </Box>
          }
        </Box>
      </Paper>
    </Container>
  );
}
