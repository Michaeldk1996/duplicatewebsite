import SideNavbar from "./SideNavbar";
import "./profile-settings.css";

export default function ProfileSettings() {
    return (
        <div className="dashboard-layout">
            <SideNavbar />

            <main className="dashboard-content">
                {/* HEADER */}
                <header className="page-header">
                    <h1>
                        BSP Consult <span>- Evolving the approach of Sports Betting</span>
                    </h1>
                </header>

                {/* CONTENT GRID */}
                <section className="content-grid">
                    <div className="all-content">
                        <p className="manage-profile">Manage Profile</p>
                        <div className="all-profile-info">
                            {/* Personal Information */}
                            <div className="info-box">
                                <h3>Personal Information</h3>

                                <div className="info-row">
                                    <span>Username</span>
                                    <span className="profile-ans">Upwork</span>
                                </div>

                                <div className="info-row">
                                    <span>E-mail</span>
                                    <span className="profile-ans">Upwork1234@hotmail.com</span>
                                </div>

                                <div className="info-row">
                                    <span>Password</span>
                                    <span className="profile-ans with-icon">
                                        ********
                                        <img src="/img/eye-off.svg" alt="arrow" />
                                    </span>
                                </div>

                                <div className="info-row">
                                    <span> </span>
                                    <span className="profile-ans with-icon">
                                        Reset Password
                                        <img src="/img/Icon.svg" alt="arrow" />
                                    </span>
                                </div>
                            </div>

                            {/* Subscription */}
                            <div className="info-box">
                                <h3>Subscription</h3>
                                <div className="program-type">
                                    <p>Silver Program</p>
                                    <button type="button" className="upgrade-btn">Upgrade Membership</button>
                                </div>
                            </div>

                            {/* Risk Management */}
                            <div className="info-box">
                                <h3>Risk Management</h3>

                                <div className="info-row">
                                    <span>Bankroll</span>
                                    <span className="profile-ans with-icon">0
                                        <img src="/img/chevron-right.svg" alt="arrow" />
                                    </span>
                                </div>

                                <div className="info-row">
                                    <span>Staking Strategy</span>
                                    <span className="profile-ans with-icon">Aggressive
                                        <img src="/img/chevron-right.svg" alt="arrow" />
                                    </span>
                                </div>
                            </div>

                            {/* Free Training */}
                            <div className="info-box">
                                <h3>Free Training</h3>

                                <button type="button" className="Strategy-btn">
                                    <span className="btn-left">
                                        <img src="/img/bsplogo.png" alt="Strategy" />
                                        Strategy Models
                                    </span>
                                    <img src="/img/Icon.svg" alt="arrow" className="btn-arrow" />
                                </button>

                                <button type="button" className="Strategy-btn">
                                    <span className="btn-left">
                                        <img src="/img/bsp-gold.svg" alt="Masterclass" />
                                        Strategy Masterclass
                                    </span>
                                    <img src="/img/Icon.svg" alt="arrow" className="btn-arrow" />
                                </button>
                            </div>


                            {/* Contact Us */}
                            <div className="info-box">
                                <h3>Contact Us</h3>

                                <div className="contact-buttons">
                                    <button type="button" className="contact-btn">
                                        <img src="/img/insta.svg" alt="Instagram" />
                                        <span>Instagram</span>
                                    </button>

                                    <button type="button" className="contact-btn">
                                        <img src="/img/snap.svg" alt="Snapchat" />
                                        <span>Snapchat</span>
                                    </button>
                                </div>
                            </div>


                            {/* Account Settings */}
                            <div className="info-box">
                                <h3>Account Setting</h3>
                                <button type="button" className="Strategy-btn">
                                    <span className="btn-left">
                                        <img src="/img/tool-02.svg" alt="Strategy" />
                                        Terms of Services
                                    </span>

                                </button>

                                <button type="button" className="Strategy-btn">
                                    <span className="btn-left">
                                        <img src="/img/file-shield-02.svg" alt="Masterclass" />
                                        Privacy Policy
                                    </span>

                                </button>
                                <button type="button" className="delete-btn">Delete my Account</button>

                            </div>

                            {/* UPGRADE MEMBERSHIP – FULL WIDTH */}
                            <div className="upgrade-box">
                                <div className="upgrade-content">
                                    <h3>Upgrade Membership</h3>
                                    <p>Upgrade to unlock full access.</p>
                                </div>
                                <button type="button" className="Gold-btn">Gold</button>

                                <div className="price-card price-card--gold is-featured">
                                    <div className="price-inner">

                                        <div className="program-headers">
                                            <h3 className="program-title">Gold Program</h3>
                                        </div>

                                        <div className="program-price">
                                            <span className="price-amount">€400</span>
                                            <span className="price-period">one time fee</span>
                                        </div>

                                        <div className="program-note">
                                            Lock in current pricing before next update.
                                        </div>

                                        <button type="button" className="Gold-btn">
                                            Get Gold Program
                                        </button>

                                    </div>

                                    <div className="program-includes">
                                        <h4>Extra benefits with Gold</h4>
                                        <ul>
                                            <li className="active">
                                                <img src="img/gold-tick.svg" alt="check" />
                                                <span className="include-text">High-Stakes Betting Frameworks</span>
                                            </li>
                                            <li className="active">
                                                <img src="img/gold-tick.svg" alt="check" />
                                                <span className="include-text">BSP Masterclass (20+ Hours of Video)</span>
                                            </li>
                                            <li className="active">
                                                <img src="img/gold-tick.svg" alt="check" />
                                                <span className="include-text">Real Time Study Cases</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
