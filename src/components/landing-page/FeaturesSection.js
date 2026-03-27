/* eslint-disable no-irregular-whitespace */
import React from "react";
import "./css/Features.css";
import RevealText from "./RevealText";

const FeaturesSection = () => (
  <section className="section-features">
    <div className="container pl-5 pr-5">
      <div className="features-content">

        <div className="features-badge">
          From Emotions to Structure
        </div>

        <div className="features-text">

          <RevealText
            className="features-description desktop-only"
            text={`Chasing losses. Following random tips. Betting on instinct.
      The pattern is always the same: you win, you lose, you tilt and
       you bet again to recover. Most bettors don’t fail because they’re 
       unlucky. They fail because they bet emotionally without 
       structure and without properly evaluating the odds. Knowing a 
       sport is not the same as beating the market.\n
          This is where our method replaces emotion. Not feelings.\n Not random bets. Betting becomes a process backed by a 
          clear structure and the right tools.\n 
          This is the foundation of how BSP works.
          `}
          />

          <RevealText
            className="features-description mobile-only"
            text={`If you’ve ever chased a loss, trusted a random tip, or bet on instinct,
    you’ve lived the cycle:\n
    You win. You lose. You tilt. You repeat.\n
    The problem isn’t knowledge of a sport — it’s emotional betting without structure or proper odds evaluation.\n
    Knowing a sport isn’t the same as beating the market.\n
    Our system replaces emotion with structure.\n
    No instincts. No guesswork. Just a clear, data-driven strategy.\n
    Betting becomes a process backed by a clear structure and the right tools.`}
          />
        </div>
      </div>
    </div>
  </section>
);

export default FeaturesSection;