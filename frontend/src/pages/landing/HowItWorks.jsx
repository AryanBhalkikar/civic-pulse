const steps = [
  {
    number: '1',
    title: 'Pin it & report',
    desc: 'Drop a pin on the map. Fill out a brief report of the hazard. Takes under 30 seconds.',
  },
  {
    number: '2',
    title: 'Community verifies',
    desc: 'Others in your area see the issue and confirm it.',
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