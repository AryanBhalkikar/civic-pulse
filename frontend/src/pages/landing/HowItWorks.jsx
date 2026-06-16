const steps = [
  {
    number: '1',
    title: 'Snap & pin it',
    desc: 'Take a photo of the hazard and drop a pin on the map. Takes under 30 seconds.',
  },
  {
    number: '2',
    title: 'Community verifies',
    desc: 'Others in your area see the issue and can upvote or add photos to confirm it.',
  },
  {
    number: '3',
    title: 'Authorities get notified',
    desc: 'The issue auto-escalates and your ward councillor gets a formal grievance email.',
  },
]

function HowItWorks() {
  return (
    <section className="how-section">
      <p className="section-label">How it works</p>
      <div className="steps-grid">
        {steps.map((step) => (
          <div key={step.number} className="step-card">
            <div className="step-num">{step.number}</div>
            <h3 className="step-title">{step.title}</h3>
            <p className="step-desc">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default HowItWorks