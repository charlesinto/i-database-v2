import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("i-access-id");
    navigate("/");
  };
  return (
    <>
      <header className="header-global">
        <nav
          id="navbar-main"
          aria-label="Primary navigation"
          className="navbar navbar-main navbar-expand-lg navbar-theme-primary pt-4 @@classNamees"
        >
          <div className="container position-relative">
            <div
              className="navbar-collapse collapse me-auto"
              id="navbar_global"
            >
              <div className="navbar-collapse-header">
                <div className="row">
                  <div className="col-6 collapse-brand">
                    <a href="@@path/index.html">
                      <img src="/assets/img/brand/light.svg" alt="Volt logo" />
                    </a>
                  </div>
                  <div className="col-6 collapse-close">
                    <a
                      href="#navbar_global"
                      className="fas fa-times"
                      data-toggle="collapse"
                      data-target="#navbar_global"
                      aria-controls="navbar_global"
                      aria-expanded="false"
                      title="close"
                      aria-label="Toggle navigation"
                    ></a>
                  </div>
                </div>
              </div>
              <ul className="navbar-nav navbar-nav-hover align-items-lg-center">
                <li className="nav-item me-2">
                  <a href="/dashboard" className="nav-link">
                    Dashboard
                  </a>
                </li>
                <li className="nav-item me-2">
                  <Link to="/dashboard/settings" className="nav-link">
                    Settings
                  </Link>
                </li>
              </ul>
            </div>
            <div class="d-flex align-items-center ms-auto">
              <a
                href="#"
                class="btn btn-outline-white d-inline-flex align-items-center me-md-3"
                onClick={handleLogout}
              >
                Logout
              </a>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default NavBar;
