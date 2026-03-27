import React, { useState } from 'react';
import './css/FaqSection.css';

const faqs = [
  {
    q: 'How much bankroll do I need to start?',
    a: (
      <>
        <p>
          We recommend a minimum bankroll of around €500 to start the right way.
        </p>

        <p>
          It’s better to save and begin properly than to start undercapitalized and in a rush.
        </p>

      </>
    ),
  },
  {
    q: 'What is your strategy based on?',
    a: (
      <>
        <p>
          Our strategy combines objective data, subjective tennis knowledge, and player momentum and form. Value is important to target, but first you need to be able to follow a clear strategy before spotting value in the market.
        </p>

        <p>
          We apply 8 confirmations before entering a market. We only bet when everything in our strategy aligns — not based on emotions or intuition.
        </p>

      </>
    ),
  },
  {
    q: 'Do you only bet on tennis?',
    a: (
      <>
        <p>
          Yes, we exclusively focus on the ATP tennis market. Niche betting provides a stronger edge: deeper information, faster access to insights and more exploitable mistakes.
        </p>

        <p>
          Bookmakers concentrate on big sports where the people are; we focus on niche markets where bookmakers make mistakes.
        </p>

      </>
    ),
  },
  {
    q: 'Should I update the BSP Tennis Betting Model myself?',
    a: (
      <>
        <p>
          No. You will receive a copy linked to my master model, and I am the one who maintains and updates it.
        </p>

        <p>
          This means your version is automatically updated as well. You will always have access to the latest data and the most important ATP metrics of the moment.
        </p>

      </>
    ),
  },
  {
    q: 'Can I cancel anytime?',
    a: `Yes, you can cancel your subscription whenever you want. No long-term obligation, no lock-in.`,
  },
  {
    q: 'What makes BSP Consult different from tipsters?',
    a: (
      <>
        <p>
          The betting space is full of hype, fake screenshots and people betting purely on what they see, without evaluating the prices and odds they receive.
        </p>
        We do it differently:
        <ul className="faq-list">


          <li>
            Full transparency (screen recordings, bookmaker switching, proof of withdrawals, real execution)
          </li>
          <li>
            One niche, one sport, one proven framework
          </li>
          <li>
            Real study cases, recorded live — not just claims
          </li>
        </ul>

        <p>
          We don’t just give bets — we show the entire process behind them.
        </p>


      </>
    ),
  },
  {
    q: 'Do I need a specific bookmaker to follow your bets?',
    a: (
      <>
        <p>
          No, you don’t. Our betting opportunities are mainly on the ATP market and we target only high-liquidity lines that are available on 95% of bookmakers.
        </p>

        <p>
          We also help our members by recommending the bookmakers that consistently offer the best odds in our markets.
        </p>

      </>
    ),

  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section-faq pb-85">
      <div className="container-3 mx-auto text-center mb-30">

        <div className="features-badge">
          FAQS
        </div>
        <h5 className="heading-h5" style={{ fontWeight: '600' }}>Before You Get Started</h5>
        <h2 className="heading-h2">Frequently Asked Questions Regarding BSP Consult</h2>

        <div className="faq-box">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={index} className={`faq-item ${isOpen ? 'open' : ''}`}>
                <button
                  type="button"
                  className="faq-question-row"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                >
                  <span>{item.q}</span>
                  <span className={`faq-icon ${isOpen ? 'open' : ''}`}>{isOpen ? '−' : '+'}</span>
                </button>

                {isOpen && (
                  <div className="faq-answer">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>



        {/* CTA BOX */}
        <div className="faq-cta">
          <div className="faq-cta-overlay">
            <h3>
              Stop Betting Emotionally.
              <br />
              Start Betting With Structure.
            </h3>

            <p>
              If you keep betting based on emotions, impulse and frustration,
              the outcome will always be the same: loss of hard-earned money and no progress.
              Change it now or accept the same results.
            </p>

            {/* CTA Button */}
            <div className='view-program'>
              <a href="#SectionPrice" className="cta-gradient-btn">
                <span className="cta-text">Apply the BSP Method</span>
                <img
                  src="img/viewbtn.svg"
                  alt=""
                  className="cta-icon"
                />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
