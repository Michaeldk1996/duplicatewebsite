// @mui
import { Box, Paper, Container, Typography } from '@mui/material';
// components
import { MotionViewport } from 'src/components/animate';
import useResponsive from 'src/hooks/useResponsive';
// ----------------------------------------------------------------------

export default function TermsForm() {
  const isDesktop = useResponsive('up', 'md');
  return (
    <Container
      component={MotionViewport}
      sx={{
        pt: { xs: 1, md: 5 },
        px: { xs: 3, md: 3 },
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
          <Typography variant="h1" sx={{ pb: 3, color: 'primary.contrastText', textAlign: 'left' }}>
            Terms And Conditions
          </Typography>

          <Typography
            variant="h6"
            sx={{
              pt: isDesktop ? 10 : 2,
              color: 'primary.contrastText',
              textAlign: 'left',
              fontWeight: 600,
            }}
          >
            ARTICLE 1 – DEFINITIONS AND SCOPE OFAPPLICATION OF THE GENERAL TERMS AND CONDITIONS
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            1.1. In these General Terms and Conditions the undergoing terms are defined as follows:
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'primary.contrastText',
              textAlign: 'left',
              ml: 3,
              mt: 1,
              textDecoration: 'underline',
            }}
          >
            Content
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', ml: 3 }}>
            Any type of content or material that is uploaded to or posted on the Platform by The
            Company, including images, videos, text elements, audio elements, GIFs/memes and any
            other type of content or material in whatever way or form.
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'primary.contrastText',
              textAlign: 'left',
              ml: 3,
              mt: 1,
              textDecoration: 'underline',
            }}
          >
            Customer
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', ml: 3 }}>
            Any natural person purchasing a subscription for purposes that are outside their
            business, craft or profession.
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'primary.contrastText',
              textAlign: 'left',
              ml: 3,
              mt: 1,
              textDecoration: 'underline',
            }}
          >
            Data Subject
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', ml: 3 }}>
            Any natural person whose personal data is collected, held or processed by The Company
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'primary.contrastText',
              textAlign: 'left',
              ml: 3,
              mt: 1,
              textDecoration: 'underline',
            }}
          >
            The Company
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', ml: 3 }}>
            The Company is a private LLP company located in Kinburn Street 32, London SE16 6DW
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'primary.contrastText',
              textAlign: 'left',
              ml: 3,
              mt: 1,
              textDecoration: 'underline',
            }}
          >
            General Conditions
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', ml: 3 }}>
            These General Terms and Conditions
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'primary.contrastText',
              textAlign: 'left',
              ml: 3,
              mt: 1,
              textDecoration: 'underline',
            }}
          >
            Intellectual Property Rights
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', ml: 3 }}>
            All of the following legal rights, title, or interest in or arising under the laws of
            UK, any state, any other country or international treaty regime, whether or not filed,
            perfected, registered or recorded and whether now or hereafter existing, filed, issued
            or acquired, including all renewals thereof: (i) patents, patent applications and patent
            rights, including any such rights granted upon any reissue, re-examination, division,
            extension, provisional, continuation or continuation-in-part applications, and
            equivalent or similar rights anywhere in the world in inventions and discoveries; (ii)
            rights associated with works of authorship and literary property rights, including, but
            not limited to, copyrights, copyright applications and copyright registrations, and
            moral rights; (iii) rights relating to know-how or trade secrets, including but not
            limited to ideas, concepts, methods, techniques, inventions and other works, whether or
            not developed or reduced to practice, rights in industrial property, customer, vendor
            and prospect lists, and all associated information or databases, and other confidential
            or proprietary information; (iv) industrial designs, industrial models, utility models,
            certificates of invention and other indicia of invention ownership; (v) trademarks,
            service marks, logos, trade dress, Internet addresses (URLs), trade names and service
            names, whether or not registered, and the goodwill associated therewith; and (vi) any
            rights related to data bases (v) any rights on software (vii) any rights analogous to
            those set forth in the preceding language and any other proprietary rights relating to
            intangible property anywhere in the world.
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'primary.contrastText',
              textAlign: 'left',
              ml: 3,
              mt: 1,
              textDecoration: 'underline',
            }}
          >
            Platform
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', ml: 3 }}>
            BSP Consult, which is a secure online area, consultable via www.bspconsult.online, to which
            the Customer obtains access after purchasing a Subscription, on which personal insights
            are shared by The Company with regard to the sports betting industry, and more
            specifically with regard to its own analyses of the Tennis sport.
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'primary.contrastText',
              textAlign: 'left',
              ml: 3,
              mt: 1,
              textDecoration: 'underline',
            }}
          >
            Subscription
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', ml: 3 }}>
            The access to the Platform gained by Customers by purchasing a subscription, whereby
            they have the choice between two packages. The duration of access to the Platform
            depends on the chosen package, as set out in article 4.1.
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 3 }}>
            1.2. These General Conditions apply to proposals, offers and/or invoices issued by The
            Company, as well as to all agreements concluded between The Company and the Customer in
            the context of the Platform. Any deviations from these General Conditions are only
            opposable to The Company subject to the explicit, prior and written acceptance by The
            Company.
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            1.3. If a Customer purchases a Subscription to the Platform of The Company, this means
            that they fully and unreservedly agree to these General Conditions.
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: 'primary.contrastText', textAlign: 'left', fontWeight: 600, mt: 1 }}
          >
            ARTICLE 2 – NATURE OF THE SERVICES
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            2.1 The Platform consists of two parts.
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left' }}>
            The first part, called “premium zone”, gives Customers access to all the Content
            regarding analyses around sport events that The Company itself makes.
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left' }}>
            The second part, called “masterclass zone”, gives Customers access to all the Content
            regarding the sports betting industry. The Company own insights are shared via, amongst
            others, videos and via an instant messaging technology on which different type of sports
            betting related content is shared that The Company itself takes.
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            2.2 The Company does not provide advice on financial planning within the meaning of the
            Act of 25 April 2014 on the status and supervision of credit institutions and stock
            exchange companies and therefore does not fall within the scope of this latter Act.
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: 'primary.contrastText', textAlign: 'left', fontWeight: 600, mt: 1 }}
          >
            ARTICLE 3 – FORMATION AND ELEMENTS OF THE CONTRACT
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            3.1. All proposals and/or offers made by The Company are binding. Subscriptions are
            valid for one year from the date of purchase and will automatically renew annually
            unless canceled in accordance with the cancellation policy, which can be found under
            ‘ARTICLE 9 – CANCELLATION POLICY & SUBSCRIPTION RENEWAL’.
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            3.2. In order to purchase a Subscription and thus make use of the Platform, the Customer
            must be 18 years or older. The Customer declares to be 18 years or older by registering
            to the services of The Company.
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left' }}>
            The Company cannot be held liable if the Customer turns out not to be of legal age.
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left' }}>
            If the laws of the country, state or province where Users reside require a higher
            minimum of age, they acknowledge and agree that they must be of that minimum age in
            order to set up and account and make use of the Platform.
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left' }}>
            The Company may ask for additional age or identity verification at all times.
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            3.3. To purchase a Subscription and thus place an order, the Customer must follow the
            ordering process as set out on the website of the Platform under
            [https://bspconsult.online/dashboard/]. the Customer must fill in his/her customer details
            and choose a payment method, whereby the Customer can use a promotional code if
            available. In the next step, an overview of the desired order is displayed in detail. It
            is the Customer’s responsibility to verify the order and, if necessary, to correct any
            input errors before placing the final order.
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left' }}>
            The Company hereby reserves the right to ask for any additional information if
            necessary.
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left' }}>
            By fulfilling the ordering process, the Customer places a binding order for the
            Subscription and undertakes to pay for it. After the Customer has placed the order, The
            Company will immediately confirm the order to the Customer by e-mail.
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            3.4. The Customer subscribing to the Platform via the website of The Company agrees that
            the service will be provided immediately after purchase, and that the subscription to
            the Platform will commence as soon as the purchase process (as described in section
            3.3.) is completed. Pursuant to{' '}
            <b>
              Article 16(m) of the EU Consumer Rights Directive (2011/83/EU) and UK Consumer
              Contract Regulations (2013)
            </b>
            , the right of withdrawal for consumers, which typically allows cancellation within 14
            days of purchase, does not apply in the case of digital content or services provided
            immediately after purchase, as these services begin to be provided once the subscription
            is confirmed. Therefore, the Customer acknowledges that they waive their right to cancel
            the subscription once the service has commenced.
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: 'primary.contrastText', textAlign: 'left', fontWeight: 600, mt: 1 }}
          >
            ARTICLE 4 – PRICE AND PAYMENT
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            4.1. The price of a Subscription depends on the package the Customer chooses. The
            Company offers the following packages:
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            SILVER PACKAGE: This subscription grants the Subscriber access to the premium zone for a
            period of twelve (12) months, starting from the completion of the subscription order
            process. The subscription will automatically renew each year from the date of purchase.
            It is expressly understood that this subscription is tied to the ATP Tennis Calendar
            season, as published annually on the ATP website.
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            Consequently, it is acknowledged that no predictions will be provided during the month
            of December each year due to the absence of scheduled events. December is considered
            part of the subscription term, and the lack of predictions during this month shall not
            serve as grounds for extending or renewing the subscription, unless clearly communicated
            by the Company on its platform that such an extension will occur.
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            GOLD PACKAGE: This Subscription provides access to the masterclass zone for an
            undetermined period and twelve (12) months acces from the date of completion of the
            ordering process of the Subscription. It is expressly understood that this subscription
            is intrinsically linked to the ATP Tennis Calendar season, as published annually.
            Consequently, it is acknowledged that during the month of December each year, no
            predictions can be provided, given the absence of scheduled events during this period.
            The month of December is an integral part of this subscription, and the lack of
            predictions during this month shall not constitute grounds for extending or renewing the
            subscription beyond its original term.
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            Unlike the Silver subscription, the Gold subscription does not automatically renew, as
            it is a one-time fee granting unlimited access to the Masterclass (the videos produced
            and published during the customer&apos;s subscription period) and the Masterclass
            channel.
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            After twelve (12) months, subscribers will no longer have access to the &apos;Premium
            Zone&apos; on the app and website. If they wish to regain access, they may do so by
            upgrading to the Silver subscription, which automatically renews.
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            If the customer decides not to extend their subscription, they will no longer have
            access to the platform. However, they retain the right to request the Masterclass
            content videos (produced and published during their subscription period) to be sent to
            them upon request.
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            SPORTS BETTING MODELS PACKAGE: This package provides access to two distinct sports
            betting models, which consist of data and proprietary intellectual property.
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            4.2. The price for each subscription package is as stated on the website of the platform
            at the time of purchase. The listed prices are the total amount due for payment.
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            4.3. The Company reserves the right to change the subscription prices at any time.
            Unless otherwise specified by the Company, any price change will not affect ongoing
            subscriptions at the time of the change.
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            4.4. Payment for the subscription must be made at the time of placing the order on the
            platform’s website.
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            4.5. As outlined in the cancellation policy, the sports betting models contain
            proprietary intellectual property. Once sold, the Company cannot reclaim these models.
            Due to the nature of the product, which allows customers to use and potentially resell
            the models, they are non-refundable, as specified in Article 9.
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: 'primary.contrastText', textAlign: 'left', fontWeight: 600, mt: 1 }}
          >
            ARTICLE 5 – OBLIGATIONS OF THE COMPANY
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            5.1. Once the Customer has purchased a subscription and The Company has received
            payment, The Company will create an account for the Customer, granting access to the
            platform.
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            5.2. The Company will upload new content to the platform regularly, depending on the
            market and available opportunities. While The Company prioritizes quality over quantity,
            there may be times when there are insufficient opportunities or relevant information to
            share. In such cases, the Company may not provide content for certain days.
            Additionally, The Company provides DIY tools, which are considered part of the service,
            and are available for Customer use.
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            5.3. Any delay in uploading content, due to unforeseen circumstances, shall not entitle
            the Customer to compensation or the termination of the agreement.
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: 'primary.contrastText', textAlign: 'left', fontWeight: 600, mt: 1 }}
          >
            ARTICLE 6 – USE OF THE PLATFORM
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            6.1. The Customer shall use the Platform in good faith and in accordance with these
            General Conditions.
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left' }}>
            In order to access and use the Platform, Customers may be required to have certain
            compatible hardware and software (which may be subject to a fee due to a third party),
            which is their sole responsibility. Periodic updates may also be required. Customer’s
            use of the Platform may be affected by the functioning of all these elements which are
            not under the control of The Company.
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            6.2. The Customer will refrain from:
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left' }}>
            • attempting to manipulate the Platform of The Company by inserting computer viruses or
            any other computer code.
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left' }}>
            • Using any robot, spider, screen or database scraper, site research or retrieval
            application, or other automated device, process or means to access, retrieve any portion
            of Content or information on the Platform;
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left' }}>
            Using the Platform for any other purpose that cannot reasonably be held to be acceptable
            in light of the services and intention of The Company
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            6.3. The account that the Customer uses to gain access to the Platform belongs solely to
            the Customer. It is prohibited for the Customer to give his/her password to another
            person or to use the username and password of another person.
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            6.4. Any breach of the General Conditions will result in the immediate termination of
            the subscription, without the Customer being entitled to claim any compensation. The
            Company reserves the right to seek compensation for any direct or indirect damages
            suffered as a result of the breach of the General Conditions. Additionally, the Customer
            will be subject to a fine of €10,000 if it is determined that access to the platform was
            shared with others for economic gain.
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: 'primary.contrastText', textAlign: 'left', fontWeight: 600, mt: 1 }}
          >
            ARTICLE 7 – COMPLAINTS
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            7.1. Complaints concerning the Platform, the Content or the services delivered by The
            Company should be made as soon as possible and should be addressed to
            management@bspconsult.online. The Company shall inform the Customer as soon as possible,
            and at the latest within fourteen (14) days after receipt of the complaint by postal
            mail.
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: 'primary.contrastText', textAlign: 'left', fontWeight: 600, mt: 1 }}
          >
            ARTICLE 8 – FORCE MAJEUR
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            8.1. The Company shall not be liable and not be bound to fulfil any obligation towards
            its Customer in case of force majeure.
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            8.2. Force majeure is understood to mean: any unforeseeable event beyond the reasonable
            control of the parties or any foreseeable event the consequences of which cannot
            reasonably be avoided, which wholly or partly prevents, delays, or substantially
            complicates the execution of the agreement. This includes, but is not limited to: fire,
            flood, war, embargo, riots, the actions of any governmental authorities, administrative
            measures, hacking, contractual failures by third parties, errors or delays attributable
            to third parties, sudden illness and network/internet/telecom failures.
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            8.3. In the event of force majeure, the obligations of The Company shall be suspended.
            In such a case, The Company will make all reasonable efforts to limit the consequences
            of the force majeure situation.
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            8.4. In the event that the Platform is not accessible for a period exceeding one (1)
            week due to demonstrable force majeure, the Customer is entitled to an extension of
            their subscription for the period during which the Platform was not accessible.
            Demonstrable force majeure never leads to a refund of paid Subscriptions.
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            8.5. If the force majeure lasts longer than one (1) month, the Customer shall be
            entitled to unsubscribe without court intervention and without The Company being liable
            to refund or pay any compensation to the Customer.
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: 'primary.contrastText', textAlign: 'left', fontWeight: 600, mt: 1 }}
          >
            ARTICLE 9 – CANCELATION POLICY & SUBSCRIPTION RENEWAL
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            9.1. Refund Policy for Initial Subscription
            <br />
            When purchasing a subscription for the first time, please note that it is non-refundable
            once our sports betting models are provided. These models contain proprietary
            intellectual property, and once delivered, they can be used or resold. To protect the
            integrity of our intellectual property, refunds will not be issued after the content has
            been shared. The delivery of these models is facilitated through Google Drive, where the
            models are provided as Google Spreadsheets and shared with the email address of the
            subscriber. Sharing activity can be verified through Google Drive&apos;s
            &quot;Share&quot; feature, which records the recipient&apos;s email address under the
            &quot;People with access&quot; section. This serves as proof that the models have been
            delivered to the purchaser, thereby rendering the subscription non-refundable.
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            9.2. Automatic Renewal
            <br />
            Subscriptions purchased through our platform are valid for one year and will
            automatically renew annually on the anniversary of the original purchase date, unless
            canceled prior to the renewal date.
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            9.3. Non-Refundable Policy for Renewals
            <br />
            All subscriptions are non-refundable once renewed. By subscribing, you gain access to
            our proprietary sports betting models, intellectual property, and premium content. This
            access is provided immediately upon renewal, and therefore, no refunds will be issued
            after the renewal date.
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            9.4. Cancellation Before Renewal
            <br />
            Customers may cancel their subscriptions at any time before the renewal date to avoid
            charges for the next subscription period. To cancel, follow the cancellation
            instructions provided in your account settings or contact our support team.
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            9.5. Intellectual Property and Unauthorized Use
            <br />
            a. All content, including but not limited to sports betting models and related data
            provided through our platform, is the exclusive intellectual property of the Company.
            Unauthorized distribution, resale, or reproduction of this content is strictly
            prohibited. <br />
            b. If a customer is found to have sold, distributed, or otherwise misused our
            proprietary content, including our house-made sports betting models or betting tips,
            they will be subject to a fine of €10,000. <br />
            c. If the unauthorized activity persists beyond the initial penalty, an additional fine
            of €500 per day will apply starting from the second week of the violation until the
            activity ceases.
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            9.6. Enforcement of Terms
            <br />
            The Compnay reserves the right to pursue legal action to enforce these terms, including
            the collection of fines and damages resulting from unauthorized use or distribution of
            its intellectual property.
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: 'primary.contrastText', textAlign: 'left', fontWeight: 600, mt: 1 }}
          >
            ARTICLE 10 – TERMINATION
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            10.1. The Customer has the right to terminate his Subscription in case of gross
            negligence on the part of The Company, on the understanding that the Customer must
            notify The Company of the termination and the reason(s) therefore within fourteen (14)
            days after the discovery of the gross negligence, which needs to be addressed by post to
            the following adress: Kinburn Street 12, London SE16.
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            10.2. Subscriptions can be terminated at any time, without compensation and without
            prior notice, by the Customer by deleting his/her/x account.
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            10.3. The Company is entitled to terminate the Subscription of the Customer at all
            times, with immediate effect, without judicial authorization, without prior notice of
            default and without payment of any compensation, in the following cases: (i) if the
            Customer, in spite of written notice of default whereby a term of at least seven (7)
            calendar days is observed, remains in default with the (timely and proper) fulfilment of
            one or more obligations arising from the General Conditions; or (ii) if The Company has
            good reason to doubt that the Customer will fulfil his obligations towards The Company.
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            In case of dissolution The Company also reserves the right to claim compensation for the
            costs, interest and damage it has suffered and all its receivables from the Customer
            will be immediately due and payable.
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            If The Company decides to terminate a Subscription, it will notify the Customer by email
            outlining the reasons for this decision. If the Customer feels that the termination was
            not justified, he/she/x has the opportunity to file a request for review of the
            decision.
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            Requests should be directed at the following email address:
            <br /> management@bspconsult.online
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            The Company will not bear any responsibility for any loss suffered as a result of a
            suspension, termination and/or investigation of a request.
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            10.4. The Subscription will be terminated by operation of law:
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left' }}>
            • in case of death of the Customer;
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left' }}>
            • if The Company no longer offers the platform and/or takes it offline for whatever
            reason.
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: 'primary.contrastText', textAlign: 'left', fontWeight: 600, mt: 1 }}
          >
            ARTICLE 11 – INTELLECTUAL PROPERTY
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            11.1. The Company and/or its licensors are the owner(s) or beneficiar(y)(ies) of the
            Intellectual Property Rights in or relating to the Platform and/or services of The
            Company, including all kinds of documentation and services provided in the context of
            branding, media planning and online marketing.
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            11.2. The sports betting models provided by The Company are delivered in the form of
            Google Spreadsheets. These models are created based on the expertise of The Company and
            are data-driven, unique, and contain proprietary strategies and formulas that are not
            available elsewhere in the market. As such, these models are protected by intellectual
            property rights.
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            11.3. The Company claims protection over these sports betting models, as they are
            original works that incorporate the Company’s expertise, data-driven methods, and
            proprietary strategies. The unique structure, strategies, and formulas within the models
            are considered intellectual property under applicable laws, including copyright and
            trade secret protections. The Company’s claim to intellectual property protection is
            valid because these models represent non-obvious and innovative approaches to sports
            betting, which are not readily available or replicated in the marketplace.
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            11.4. The Customer shall fully and unconditionally respect all Intellectual Property
            Rights associated with the services of The Company.
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            11.5. The Customer declares that the Content may not be copied, reproduced,
            redistributed, recorded, transmitted, performed, framed, linked or shown to the public,
            broadcast or made available to the public, or used for any other purpose.
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            11.6. Without prejudice to Customers’ rights relating to the protection of computer
            programs, Customers may not:
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left' }}>
            • modify, translate or adapt any of the components of the Platform (including any
            software associated with it) in any way;
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left' }}>
            • decompile or disassemble any of the components of the Platform (including any software
            associated with it) in any way;
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left' }}>
            • copy any of the components of the Platform (including any software associated with it)
            in any way, except to make a back-up copy;
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left' }}>
            • transfer, dispose of, grant as a sublicense, lease, lend or distribute any of the
            components of the Platform (including any software associated with it) or documentation,
            in any way or in any form to third parties;
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left' }}>
            • merge the Platform or any component thereof into any other programs or create
            derivative works based on (any component of) the Platform;
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left' }}>
            • use the Platform in whole or in part or any confidential information relating thereto
            to create software that is functionally equivalent to the Platform or any part thereof;
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left' }}>
            • use the Platform in a way that may lead to the encouragement, procurement or carrying
            out of any unlawful or criminal activity or which may cause any harm or injury to any
            person; and/or
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left' }}>
            • remove, obscure or alter proprietary rights notices (including trademarks and
            copyrights notices) which may be affixed to or contained within the Platform.
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            11.7. Nothing contained in the Platform shall be construed as granting any license or
            right to make commercial use of any trademark, Intellectual Property right or
            copyrighted material of The Company and/or its licensors without their prior written
            permission.
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            11.8 If the Customer violates any of paragraphs of article 11 in these terms and
            conditions, then the costumer forfeits to The Company an immediately payable fine of €10
            000 for each violation and €500 per day will apply starting from the second week of the
            violation until the activity ceases.
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: 'primary.contrastText', textAlign: 'left', fontWeight: 600, mt: 1 }}
          >
            ARTICLE 12 – LIABILITY
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            12.1. Except in the event of fraud or willful misconduct, The Company shall not be
            liable for any incidental, indirect or consequential damages resulting from the use of
            the Platform or from the temporary inability to consult the Platform.
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            12.2. The Content on the Platform is intended to be informative only. The Company makes
            every effort to ensure the accuracy of this information, but cannot be held liable for
            any damage arising as a result of incorrect or incomplete information.
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            12.3. If the Customer makes decisions on the basis of the Content made available on the
            Platform, these decisions are made at the Customer’s own risk and The Company cannot be
            held liable for the consequences of these decisions in any way.
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            12.4. The Customer acknowledges and agrees that the Platform may become temporarily
            unavailable due to a variety of causes, including but not limited to software failure,
            protocol changes by third party providers, internet outages, force majeure event or
            unscheduled maintenance, or other causes either within or outside its control. The
            Company cannot be held liable for the direct or indirect damages as a consequence of the
            unavailability of the Platform.
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            12.5. The Company is not liable for any damage or interruption caused by any (i)
            computer viruses, spyware, Trojan horses or other malware that may affect the Customer’s
            computer or other equipment, (ii) SMS, e-mail services and other (authentication)
            services which might be vulnerable to spoofing and phishing attacks.
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            12.6. USERS REPRESENT THAT THEY HAVE INDEPENDENTLY INVESTIGATED THE ADVISABILITY OF
            USING THE PLATFORM AND THE POSSIBLE RISKS INVOLVED IN USING THE PLATFORM. USERS AGREE TO
            MAINTAIN THEIR OWN INSURANCE COVERING SUCH RISKS AND WILL LOOK SOLELY TO SUCH INSURANCE
            FOR REIMBURSEMENT OF ANY RESULTING DAMAGES.
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left' }}>
            The Company reserves the right at all times, for any reason, and without notice to: (i)
            restrict, deactivate, suspend and/or terminate access to the Platform (or any part
            thereof); and (ii) modify or discontinue providing the Platform (or any part thereof).
            Customers acknowledge and agree that The Company will not be liable to them or any third
            party for any termination, suspension or modification to the Platform regardless of the
            reason for such termination, suspension or modification. Customers acknowledge and agree
            that their only right with respect to any dissatisfaction with any modification or
            discontinuation of the Platform made by The Company is to terminate the use of the
            Platform.
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left' }}>
            WITHOUT LIMITING THE FOREGOING AND UNLESS SPECIFICALLY PROVIDED OTHERWISE BY APPLICABLE
            MANDATORY LAW, UNDER NO CIRCUMSTANCES SHALL THE COMPANY BE LIABLE FOR:
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left' }}>
            • ANY INDIRECT, INCIDENTAL OR CONSEQUENTIAL LOSS, INCLUDING BUT NOT LIMITED TO, LOSS OF
            OR DAMAGE TO CLIENTELE, LOSS OF DATA, LOSS OF EARNINGS, LOSS OF PROFITS, DISRUPTION OF
            BUSINESS, CLAIMS FROM THIRD PARTIES, REPUTATION OR EXPECTED SAVINGS EVEN IF THE OWNER
            WAS ADVISED OR WAS OTHERWISE AWARE OR SHOULD HAVE BEEN AWARE OF THE POSSIBILITY OR
            LIKELIHOOD OF SUCH LOSSES AND REGARDLESS OF WHETHER THE CAUSE OF ACTION IS IN CONTRACT
            OR IN TORT (INCLUDING NEGLIGENCE) OR OTHERWISE;
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left' }}>
            • ANY DIRECT LOSS OTHER THAN CAUSED EXCLUSIVELY BY THE COMPANY OWN GROSS NEGLIGENCE OR
            WILFUL MISCONDUCT.
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left' }}>
            TO THE EXTENT PERMITTED BY MANDATORY LAW AND NOTWITHSTANDING ANY PROVISION CONTAINED IN
            THIS AGREEMENT TO THE CONTRARY, THE AGGREGATE LIABILITY OF THE COMPANY UNDER THE
            AGREEMENT FOR ANY AND ALL LOSSES SUFFERED OR INCURRED BY USERS AND WHICH IS NOT
            SPECIFICALLY EXCLUDED HEREIN, SHALL NOT EXCEED THE PRICE PAID BY THE CUSTOMER FOR ITS
            SUBSCRIPTION IRRESPECTIVE OF THE LEGAL GROUND INVOKED INCLUDING, WITHOUT LIMITATION,
            BREACH OF CONTRACT, BREACH OF WARRANTIES, TORT OR ANY OTHER LEGAL THEORY.
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: 'primary.contrastText', textAlign: 'left', fontWeight: 600, mt: 1 }}
          >
            ARTICLE 13 – DATA PROTECTION
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            13.1. In the context of the performance of the agreement, The Company will collect and
            process personal data of the Customer. The Company shall respect the applicable data
            protection legislation, including the General Data Protection Regulation
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            13.2. The Company may collect the following personal data: name, surname, address,
            telephone and/or cell phone number, gender, date of birth, bank account number and email
            address. The Company hereby acts as a data controller and will process the data for the
            purposes of customer management, accounting/finance, invoice (dispute) management and
            direct marketing. For electronic direct marketing communications prior opt-in will first
            be sought.
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            13.3. Such data may be communicated by The Company to its own subcontractors/processors,
            affiliates, external law firms and/or governmental authorities for the purposes listed
            above.
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            13.4. The Company takes all reasonable measures to guarantee the confidentiality of the
            personal data communicated by the Customer.
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            13.5. The Company shall provide the data subjects with a right to access the personal
            data concerning them and, if applicable, a right to demand correction or deletion of
            (erroneous) data, or a right to restriction of processing or to data portability, but
            only insofar as the legal criteria to exercise such rights are fulfilled and if proof of
            identity is provided. Any individual also has the right, free of charge and upon
            request, to oppose any use of his/her data for direct marketing purposes.
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            13.6. If data subjects have any questions or complaints about the exercise of their
            rights and/or the processing of their personal data, they can always obtain further
            information by sending an e-mail to management@bspconsult.online.
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: 'primary.contrastText', textAlign: 'left', fontWeight: 600, mt: 1 }}
          >
            ARTICLE 14 – INVALID PROVISIONS
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            14.1. The terms of the General Conditions shall always be interpreted in a manner that
            does not affect their validity or enforceability under the applicable law. In the event
            that one or more provisions are declared invalid, illegal or unenforceable, in whole or
            in part, this shall not affect the validity and enforceability of the remainder of that
            provision or of these General Conditions. Moreover, in such an event, the parties shall
            amend the invalid, illegal or unenforceable provision or any part thereof and/or agree
            on a new provision, in such a way as to reflect as closely as possible the purpose of
            the invalid, illegal or unenforceable provision.
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: 'primary.contrastText', textAlign: 'left', fontWeight: 600, mt: 1 }}
          >
            ARTICLE 15 – APPLICABLE LAW AND JURISDICTION
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            15.1. All proposals, invoices and agreements to which these General Conditions apply
            shall be governed by the UK law
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 1 }}>
            15.2. All disputes arising therefrom shall be subject to the exclusive jurisdiction of
            the courts of the judicial district of London
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: 'primary.contrastText', textAlign: 'left', fontWeight: 600, mt: 1 }}
          >
            ARTICLE 16 – NO WAIVER
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.contrastText', textAlign: 'left' }}>
            The Company failure to enforce any provision of these General Conditions or any
            additional terms shall not be deemed a waiver of such provisions nor of its right to
            enforce such provision.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
