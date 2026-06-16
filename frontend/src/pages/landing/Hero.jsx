import { Link } from 'react-router-dom'
import HeatmapPreview from './HeatmapPreview'

function Hero() {
  return (
    <section className="hero">
      <div className="hero-text">
        <div className="hero-tag">Hyperlocal civic reporting</div>
        <h1 className="hero-title">
          Your city has a <span className="hero-accent">problem</span>.
          <br />Let's fix it.
        </h1>
        <p className="hero-sub">
          Spot a pothole, broken streetlight, or open manhole? Report it in 30 seconds.
          The issue auto-escalates to a{' '}
          <strong>High-Priority Crisis</strong> and your ward officer gets notified.
        </p>
        <div className="hero-actions">
          <Link to="/signup" className="btn-hero-primary">Report an issue</Link>
          <Link to="/map"    className="btn-hero-secondary">Browse the map</Link>
        </div>
      </div>
      <HeatmapPreview />
    </section>
  )
}

export default Hero