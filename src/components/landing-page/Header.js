import WistiaPlayer from './WistiaPlayer';
import './css/Header.css';


const Header = () => (
  <header className="pb-65 relative index">
    <div className="navbar">
      <div className="navbar-inner">
        <div className="brand">
          <a href="/" className="brand-link">
            <img src="img/bsplogo.png" alt="BSP Consult" className="brand-logo" />
            <span className="brand-text">
              <strong>BSP</strong> CONSULT
            </span>
          </a>
        </div>

        <div className="login">
          <a href="/login" className="btn-white">
            Login
            <img src="img/loginLogo.svg" alt="" className="btn-icon" />
          </a>
        </div>
      </div>
    </div>


    <div className="bg-effect" />

    <div className="hero-section container pl-5 pr-5 pt-65 d-flex flex-column xs-pl-24 xs-pr-24">
      <div className="hero-badge-wrapper">
        <div className="hero-badge">
          <span className="hero-badge-tag">Proven</span>
          <span className="hero-badge-text">ATP Tennis Betting System</span>
        </div>
      </div>

      <h1 className="heading-h1 text-center">
        Step-by-Step <br />Method Built for Elite Tennis <br />
        Betting That Explains <span>How Money Flows</span> to <br />
        Structured Bettors
      </h1>
      <div className="watch-video-text">

        <span> <img src="img/play.svg" alt="Play" className="play-icon" /> Watch the 8-minute video to understand how it works</span>
      </div>
      <WistiaPlayer videoId="s9dfisq9e7" wrapper="wistia-player-container-1" />

      <div className="features-list">
        <div className="feature-item">
          <img src="img/Icon-circle.png" alt="Years" className="feature-icon" />
          <span>4+ Years Proven Track Record</span>
        </div>

        <div className="feature-item">
          <img src="img/Icon-circle.png" alt="Years" className="feature-icon" />

          <span>Single Sport Focus</span>
        </div>

        <div className="feature-item">
          <img src="img/Icon-circle.png" alt="Years" className="feature-icon" />
          <span>Selective Bets Only</span>
        </div>

        <div className="feature-item">
          <img src="img/Icon-circle.png" alt="Years" className="feature-icon" />
          <span>ROI Driven Strategy</span>
        </div>
      </div>

      <div className="cta-wrapper">
        <a href="#SectionPrice" className="cta-gradient-btn">
          <span className="cta-text">View the Programs</span>
          <img
            src="img/viewbtn.svg"
            alt=""
            className="cta-icon"
          />
        </a>

        <div className="cta-rating">
          <div className="stars">
            <span className="star full"><img src="img/star.svg" alt="star" /></span>
            <span className="star full"><img src="img/star.svg" alt="star" /></span>
            <span className="star full"><img src="img/star.svg" alt="star" /></span>
            <span className="star full"><img src="img/star.svg" alt="star" /></span>
            <span className="star full"><img src="img/star-alt.svg" alt="star" /></span>
          </div>
          <div className="rating-text">
            <strong>4.8 | </strong> <strong>487 </strong>Reviews
          </div>
        </div>
      </div>

    </div>
  </header>
);
export default Header;
