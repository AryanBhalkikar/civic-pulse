import { Link } from 'react-router-dom'

function AuthLayout({ children }) {
  return (
    <div className="auth-shell">

      {/* Left — brand panel */}
      <div className="auth-brand">
        <div className="auth-brand-logo">
          <div className="auth-logo-dot"></div>
          <span>ZonePulse</span>
        </div>

        <div className="auth-brand-mid">
          <h2 className="auth-brand-title">Make your city work for you.</h2>
          <p className="auth-brand-sub">
            Join thousands of citizens reporting and tracking civic issues
            across their wards in real time.
          </p>
        </div>

        <div className="auth-brand-stats">
          <div className="auth-bstat">
            <div className="auth-bstat-l">Now Serving</div>
            <div className="auth-bstat-n">City of BENGALURU</div>
          </div>
        </div>
      </div>

      {/* Right — form panel (Login or Signup gets injected here) */}
      <div className="auth-form-panel">
        {children}
      </div>

    </div>
  )
}

export default AuthLayout