import { Link, useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <div
      className="home"
      style={{
        backgroundImage: "url('/college.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >

      {/* Navbar */}
      <nav className="navbar">

        <div className="logo-container">
          <img src="/jitlogo.jpg" alt="JIT Logo" className="logo-img" />
          <h2 className="logo-text">Lost & Found</h2>
        </div>

        <div className="nav-links">

          {!token ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "white",
                fontWeight: "bold"
              }}
            >
              {/* Username */}
              <span>{username}</span>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                style={{
                  padding: "8px 16px",
                  borderRadius: "6px",
                  border: "none",
                  background: "#ff4d4d",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                Logout
              </button>
            </div>
          )}

        </div>

      </nav>

      {/* Hero Section */}
      <section className="hero">

        <h1>College - Lost & Found Portal</h1>

        <p>
          A simple platform that helps students report lost items,
          browse found items, and reconnect with their belongings.
        </p>

        <div className="hero-buttons">
          <Link to="/report" className="btn primary">
            Report Item
          </Link>

          <Link to="/items" className="btn secondary">
            Browse Items
          </Link>
        </div>

      </section>

      {/* Features */}
      <section className="features">

        <div className="feature-card">
          <span className="icon">📢</span>
          <h3>Report Lost Items</h3>
          <p>Quickly report items you lost or found around campus.</p>
        </div>

        <div className="feature-card">
          <span className="icon">🔎</span>
          <h3>Search Listings</h3>
          <p>Browse items reported by other students easily.</p>
        </div>

        <div className="feature-card">
          <span className="icon">🤝</span>
          <h3>Reconnect Easily</h3>
          <p>Contact owners and safely return lost belongings.</p>
        </div>

      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 Jyothy Institute of Technology Lost & Found Portal</p>
      </footer>

    </div>
  );
}

export default Home;