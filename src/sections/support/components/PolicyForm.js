// @mui
import { Box, Paper, Container, Typography } from '@mui/material';
// components
import { MotionViewport } from 'src/components/animate';
import useResponsive from 'src/hooks/useResponsive';

// ----------------------------------------------------------------------

export default function PolicyForm() {
  const isDesktop = useResponsive('up', 'md');
  return (
    <Container
      component={MotionViewport}
      sx={{
        pt: { xs: 1, md: 5 },
        px: { xs: 3, md: 3 }
      }}
    >
      <Paper
        sx={{
          borderRadius: 3,
          textAlign: 'center',
          backgroundColor: 'transparent',
        }}
      >
        <Box sx={{ mx: 'auto', maxWidth: '1200px' }}>
          <Typography variant="h1" sx={{ pb: 3, color: 'primary.contrastText', textAlign: 'left'}}>
            Privacy Policy
          </Typography>

          <Typography variant='h6' sx={{ pt: isDesktop?10:2, color: 'primary.contrastText', textAlign: 'left'}}>
            The Company respects the privacy of its website visitors, in particular their rights regarding the automatic processing of personal data. We have therefore formulated and implemented a policy on complete transparency with our customers regarding the processing of personal data, its purpose(s) and the possibilities to exercise your legal rights in the best possible way.
          </Typography>
          <Typography variant='h6' sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 3}}>
            Until you accept the use of cookies and other tracking devices, we will not place any non-anonymised analytical cookies and / or tracking cookies on your computer, mobile phone or tablet.
          </Typography>
          <Typography variant='h6' sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 3}}>
            With the continued visit of this website you accept these terms of use and you accept the use of cookies and other tracking systems, unless we have provided for another method of accepting cookies on our website. 
          </Typography>
          <Typography variant='h6' sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 3}}>
            The current available version of this privacy policy is the only version that applies while visiting our website until a new version replaces the current version.
          </Typography>
          <Typography variant='h6' sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 5}}>
            Article 1 – Definitions
          </Typography>
          <Typography variant='h6' sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 3}}>
            Website (hereinafter: “Website”) www.bspconsult.online.<br/>
            Party responsible for processing personal data (hereinafter: “the controller”): The Company
          </Typography>
          <Typography variant='h6' sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 3}}>
            Article 2 – Access to the website
          </Typography>
          <Typography variant='h6' sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 3}}>
            Access to and use of the website are strictly personal. You will refrain from using the data and information of this website for your own commercial, political or advertising purposes, as well as for any commercial offers, in particular unsolicited electronic offers. 
          </Typography>
          <Typography variant='h6' sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 3}}>
            Article 3 – Website content 
          </Typography>
          <Typography variant='h6' sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 3}}>
            All brands, images, texts, comments, illustrations (animated) images, video images, sounds and all the technical applications that can be used to operate this website and more generally all the components used on this website, are protected by the laws on intellectual property. Any reproduction, repetition, use or modification, by any means whatsoever, of all or just part of it, including technical applications, without the prior written permission of the controller, is strictly prohibited. The fact that the controller may not take immediate action against any infringement, cannot be considered as a tacit consent, nor of a waiver of any right to prosecute the infringing party.
          </Typography>
          <Typography variant='h6' sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 3}}>
            Article 4 – Management of the website
          </Typography>
          < Typography variant='h6' sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 3}}>
            For the purpose of proper management of the site, the controller may at any time:
          </Typography>
          <Typography variant='h6' sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 3}}>
            suspend, interrupt, reduce or decline the access to the website for a particular category of visitors<br/>
            delete all information that may disrupt the functioning of the website or conflicts with national or international laws or is contrary to internet etiquette<br/>
            make the website temporarily unavailable in order to perform updates
          </Typography>
          <Typography variant='h6' sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 3}}>
            Article 5 – Responsabilities
          </Typography>
          <Typography variant='h6' sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 3}}>
            The controller is not liable for any failure, disturbances, difficulties or interruptions in the functioning of the website, causing the (temporary) inaccessibility of the website or of any of its functionalities. You, yourself, are responsible for the way you seek connection to our website. You need to take all appropriate steps to protect your equipment and data against hazards such as virus attacks on the Internet. Furthermore, you are responsible for which websites you visit and what information you seek.<br/>
            The controller is not liable for any legal proceedings taken against you:<br/>
            because of the use of the website or services accessible via the Internet<br/>
            for violating the terms of this privacy policy<br/>
            The controller is not liable for any damages that incur to you or third parties or your equipment, as a result of your connection to or use of the website and you will refrain from any subsequent (legal) action against the controller.<br/>
            If the controller is involved in a dispute because of your (ab)use of this website, he is entitled to (re)claim all subsequent damages from you.<br/>
          </Typography>
          <Typography variant='h6' sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 3}}>
            Article 6 – Collection of data
          </Typography>
          <Typography variant='h6' sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 3}}>
            Your personal data will be collected by The Company<br/>
            Personal data means any information relating to an identified or identifiable natural person (‘data subject’).<br/>
            An identifiable natural person is one who can be identified, directly or indirectly, in particular by reference to an identifier such as a name, an identification number, location data, an online identifier or to one or more factors specific to the physical, physiological, genetic, mental, economic, cultural or social identity of that natural person.<br/>
            The personal data that are collected on the website are used mainly by the collector in order to maintain a (commercial) relationship with you and if applicable in order to process your orders. They are recorded in an (electronic) register.<br/>
          </Typography>
          <Typography variant='h6' sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 3}}>
            Article 7 – Your rights regarding information
          </Typography>
          <Typography variant='h6' sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 3}}>
            Pursuant to GDPR rules each data subject has the right to information on and access to, and rectification, erasure and restriction of processing of his personal data, as well as the right to object to the processing and the right to data portability.<br/>
            You can exercise these rights by contacting us at management@bspconsult.online.<br/>
            Each request must be accompanied by a copy of a valid ID, on which you put your signature and state the address where we can contact you.<br/>
            Within one month of the submitted request, you will receive an answer from us.<br/>
            Depending on the complexity and the number of the requests this period may be extended to two months.<br/>
          </Typography>
          <Typography variant='h6' sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 3}}>
            Article 8 – Legal obligations
          </Typography>
          <Typography variant='h6' sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 3}}>
            In case of infringement of any law or regulation, of which a visitor is suspected and for which the authorities require the personal data collected by the collector, they will be provided to them after an explicit and reasoned request of those authorities, after which these personal data do not fall anymore under the protection of the provisions of this Privacy policy.<br/>
            If any information is necessary in order to obtain access to certain features of the website, the controller will indicate the mandatory nature of this information when requesting these data.<br/>
          </Typography>
          <Typography variant='h6' sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 3}}>
            Article 9 – Collected data and commercial offers
          </Typography>
          <Typography variant='h6' sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 3}}>
            You may receive commercial offers from the collector. If you do not wish to receive them (anymore), please send us an email to the following address: management@bspconsult.online.<br/>
            Your personal data will not be used by our partners for commercial purposes.  <br/>
            If you encounter any personal data from other data subjects while visiting our website, you are to refrain from collection, any unauthorized use or any other act that constitutes an infringement of the privacy of the data subject(s) in question. The collector is not responsible in these circumstances.<br/>
          </Typography>
          <Typography variant='h6' sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 3}}>
            Article 10 – Data retention
          </Typography>
          <Typography variant='h6' sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 3}}>
            The collected data are used and retained for the duration determined by law.
          </Typography>
          <Typography variant='h6' sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 3}}>
            Article 11 – Cookies
          </Typography>
          <Typography variant='h6' sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 3}}>
            A cookie is a small text file placed on the hard drive of your electronic device upon visiting our website. A cookie contains data so you can be recognized as a visitor when you are visiting our website. It enables us to adjust to your needs and it facilitates you to log in on our website. When you visit our website, we inform you about the use of cookies. By continuing to use our website you accept its use, unless we ask permission by other means. Your consent is valid for a period of thirteen months.<br/>
            We use the following types of cookies on our website:<br/>
            – Functional cookies: like session and login cookies to collect session and login information.<br/>
          </Typography>
          <Typography variant='h6' sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 3}}>
            – Anonymised Analytic cookies: to obtain information regarding the visits to our website, like numbers of visitors, popular pages and topics. In this way we can adjust our communication and information to the needs of our visitors. We cannot see who visits our sites or from which personal device the visit has taken place.
          </Typography>
          <Typography variant='h6' sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 3}}>
            – Non-anonymised Analytic cookies: to obtain information regarding the visits to our website, like the number of visitors, popular pages and topics. In this way we can adjust our communication and information to the needs of our visitors.
          </Typography>
          <Typography variant='h6' sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 3}}>
            – Tracking Cookies: like advertising cookies that are intended to show relevant advertisements. By using these cookies we may deduce your personal interests. Thus (other) organisations may show you targeted advertisements when you visit their website. Tracking cookies make profiling possible and treat categories of people differently when targeting advertisements. Tracking cookies usually process personal data. 
          </Typography>
          <Typography variant='h6' sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 3}}>
            Specifically, we use the following cookies on our website:<br/>
            Anonymised Google Analytics (analytical cookie)<br/>
          </Typography>
          <Typography variant='h6' sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 3}}>
            Facebook (tracking cookie)
          </Typography>
          <Typography variant='h6' sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 3}}>
            Google Adwords (tracking cookie)
          </Typography>
          <Typography variant='h6' sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 3}}>
            When you visit our website, cookies from the controller and / or third parties may be installed on your equipment.
          </Typography>
          <Typography variant='h6' sx={{ color: 'primary.contrastText', textAlign: 'left'}}>
            Article 12 – Imagery and products offered
          </Typography>
          <Typography variant='h6' sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 3}}>
            You cannot derive any rights from the imagery that accompanies any offered product on our website.
          </Typography>
          <Typography variant='h6' sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 3}}>
            Article 13 – Applicable Law
          </Typography>
          <Typography variant='h6' sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 3}}>
            These conditions are governed by the UK law. The court in the district where the collector has its place of business has the sole jurisdiction if any dispute regarding these conditions may arise, save when a legal exception applies.
          </Typography>
          <Typography variant='h6' sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 3}}>
            Article 14 – Contact
          </Typography>
          <Typography variant='h6' sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 3}}>
            For questions, product information or information about the website itself, please contact: Costumer Service, management@bspconsult.online .
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
