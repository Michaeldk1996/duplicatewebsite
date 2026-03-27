import React, { useState } from 'react';
import { useAuthContext } from '../../auth/useAuthContext';
import './css/Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const { addEmailSubscribe } = useAuthContext();
  const handleSubscribe = async () => {
    if (!email || !email.includes('@')) {
      alert('❌ Enter a valid email');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const result = await addEmailSubscribe(email);

      if (result.success) {
        setMessage('✅ Successfully subscribed!');
        setEmail('');
      } else {
        alert('❌ An error occurred. Please try again.');
      }
    } catch (error) {
      alert('❌ Server connection error');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <footer className="footer">
      <div className="footer-gradient" />

      <div className="footer-container">
        {/* Left */}
        <div className="footer-left">
          <div className="footer-logo">
            <img src="/img/logo-footer.png" alt="BSP Consult" />
          </div>

          <p className="footer-desc">
            BSP CONSULT – We build high-level bettors.
          </p>

          <h4 className="footer-title">Get BSP Insights</h4>

          <div className="footer-subscribe">
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubscribe()}
              disabled={loading}
            />
            {/* <button type="button">
              Subscribe
              <img src="/img/viewbtn.svg" alt="arrow" />
            </button> */}
            <button 
              type="button"
              onClick={handleSubscribe}
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Subscribe'}
              <img src="/img/viewbtn.svg" alt="arrow" />
            </button>
          </div>
          {message && <p className="subscribe-message" style={{ marginTop: '12px', marginLeft: '12px' }}>{message}</p>}
        </div>

        {/* Middle */}
        <div className="footer-links">
          <h4>Company</h4>
          <ul>
            <li><a href="https://www.instagram.com/bspconsult/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="/terms-condition">Terms & Conditions</a></li>
            <li><a href="https://bspconsult.com/privacy-policy">Privacy Policy</a></li>
            <li><a href="mailto:management@bspconsult.com">Contact Us</a></li>
          </ul>
        </div>

        {/* Right */}
        <div className="footer-apps">
          <h4>Apps</h4>
          <a
            href="https://play.google.com/store/apps/details?id=com.istarii.bsppronos&pcampaignid=web_share"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/img/gp.svg" alt="Google Play" width={145} height={50} />
          </a>
          <a
            href="https://apps.apple.com/us/app/bsp-consult/id1531281216"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/img/ap.svg" alt="App Store" width={145} height={50} />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        © 2026 BSP Consult. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
