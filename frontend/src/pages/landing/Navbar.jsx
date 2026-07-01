import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <div className="logo-dot"></div>
        <span>ZonePulse</span>
      </div>
      <div className="navbar-links">
        <Link to="/login" className="btn-ghost">Log in</Link>
        <Link to="/signup" className="btn-primary">Sign up free</Link>
      </div>
    </nav>
  )
}

export default Navbar