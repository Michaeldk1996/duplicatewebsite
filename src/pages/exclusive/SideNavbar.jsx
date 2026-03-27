/* eslint-disable react/prop-types */
import "./SideNavbar.css";

  const ChevronRight = () => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        d="M4.45508 9.95998L7.71508 6.69998C8.10008 6.31498 8.10008 5.68498 7.71508 5.29998L4.45508 2.03998"
        stroke="white"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

export default function SideNavbar({ active, onChange, onLogout }) {
  const menuItems = [
    { id: "Profile", label: "Profile", icon: "/img/user.svg" },
    { id: "Tips", label: "Setups", icon: "/img/lamp-charge.svg" },
    { id: "VideoContentSilver", label: "Essential Video Content", icon: "/img/book.svg" },
    { id: "Courses", label: "BSP Masterclass", icon: "/img/video-play.svg" },
    { id: "Subscriptions", label: "Programs", icon: "/img/crown.png" },
  ];


  return (
    <aside className="side-navbar">
      {/* Logo */}
      <div className="nav-header">
        <img src="/img/bsplogo.png" alt="BSP Consult" className="logo" />
        <p className="company-name">
          BSP <span>Consult</span>
        </p>
      </div>

      <div className="main-container">
        <p className="section-title">MAIN</p>

        <nav className="nav-menu">
          {menuItems.map((item) => (
            <button
            type="button"
              key={item.id}
              className={`nav-item ${active === item.id ? "active" : ""}`}
              onClick={() => onChange(item.id)}
            >
              <div className="nav-con">
                <span className="c-icon">
                  <img src={item.icon} alt={item.label} />
                </span>
                {item.label}
              </div>
              {active === item.id && <ChevronRight />}
            </button>
          ))}
        </nav>
      </div>

      <div className="logout-container">
        <button type="button" className="logout-btn" onClick={onLogout}>
          <span className="icon">
            <img src="/img/logout.svg" alt="Logout" />
          </span>
          Logout
        </button>
      </div>
    </aside>
  );
}
