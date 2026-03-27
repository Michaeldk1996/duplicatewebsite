/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import './css/ConnectSection.css';

const SectionConnect = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="section-connect-us pb-85 bg-dark xs-pb-35">
      <div className="container-2 mx-auto pl-2 pr-2 text-center mb-65 xs-mb-35">
        <h5 className="heading-h5 mb-25">QUESTIONS STILL UNANSWERED?</h5>
        <h2 className="heading-h2 mb-30">We are ready to help you</h2>
        <p className="text-variation5 mb-40">
          Connect with our student success team for quick answers! Schedule a free discovery call{' '}
          <br />
          below, and they'll respond within minutes to address all your inquiries.
        </p>
        {isDesktop ? (
          <div
            style={{
              width: '1000px',
              overflow: 'hidden',
              margin: '0 auto',
              borderRadius: '8px',
            }}
          >
            <iframe
              title="calendly"
              src="https://calendly.com/d/cpc5-87r-68y/consultation-call"
              width="100%"
              height="660px"
              frameBorder="0"
              style={{ borderRadius: '8px' }}
            />
          </div>
        ) : (
          <div
            style={{
              width: '100%',
              overflow: 'hidden',
              margin: '0 auto',
              borderRadius: '8px',
            }}
          >
            <iframe
              title="calendly-mobile"
              src="https://calendly.com/d/cpc5-87r-68y/consultation-call"
              width="100%"
              height="820px"
              style={{ borderRadius: '8px' }}
            />
          </div>
        )}
      </div>
      <div className="d-flex flex-column text-center">
        <a href="https://bspconsult.online">
          <img src="img/f-logo.webp" alt="Logo" className="f-logo" />
        </a>
        <ul className="footer-nav d-flex justify-content-center column-gap-38 mt-55 mt-30">
          <li>
            <a href="https://bspconsult.online/terms-and-conditions">Terms & Conditions</a>
          </li>
          <li>
            <a href="https://bspconsult.online/privacy-policy">Privacy Policy</a>
          </li>
          <li>
            <a href="https://www.instagram.com/bspconsult/?igsh=NW9kd252bjk2a3ls&utm_source=qr">
              Contact us
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default SectionConnect;
