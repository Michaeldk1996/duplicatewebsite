import './css/TennisBetting.css';

const steps = [
  {
    step: 1,
    tag: 'All Programs',
    title: 'Start with Structure',
    description:
      'Access the BSP app and live channel, set your bankroll and staking system. Get notified of new, structured betting opportunities with clear logic and disciplined execution.',
    tagClass: 'tag-blue',
  },
  {
    step: 2,
    tag: 'Advanced & Gold',
    title: 'Use Advanced Data & Modeling',
    description:
      'Access the BSP Tennis Betting Model and advanced insights to understand the market, identify mispriced opportunities, and consistently spot EV+ bets.',
    tagClass: 'tag-blue',
  },
  {
    step: 3,
    tag: 'Gold Only',
    title: 'Access the Full Method',
    description:
      'Get access to high-staking betting frameworks, real-time case studies and the complete BSP Masterclass to master betting at the highest level.',
    tagClass: 'tag-gold',
  },
];

const TennisBettingSection = () => (
  <section className="section-tennis-betting pb-85">
    <div className="container-1 mx-auto">
      <div className="container-1 mx-auto pl-2 pr-2 text-center mb-65">
        <div className="features-badge">
          From Clarity to Execution
        </div>
        <h5 className="heading-h5" style={{ fontWeight: '600' }}>How it Works</h5>
        <h2 className="heading-h2">A simple 3-step framework for profitable betting</h2>
      </div>

      <div className="tennis-steps">
        {steps.map((item) => (
          <div className="tennis-step-card">
            <div className="step-header">
              <div className="step-circle">{item.step}</div>

              <span className={`step-tag ${item.tagClass}`}>
                {item.tag}
              </span>
            </div>

            <h3 className="step-title">{item.title}</h3>
            <p className="step-description">{item.description}</p>
          </div>

        ))}
      </div>
    </div>
  </section>
);



export default TennisBettingSection;
