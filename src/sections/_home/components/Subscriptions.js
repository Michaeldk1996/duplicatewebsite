/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-nested-ternary */

import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { paths } from 'src/routes/paths';
import { useAuthContext } from 'src/auth/useAuthContext';

const stripePromise = loadStripe(
  'pk_live_51NAUESCf4YXq1rsyBMpbCD1Yqi5kocGdjxYqcqknpppNXXnUKKCVxar7NqInLJRCJTCEVkbqQPppP7nvve8E053I00P0pVQI8d'
);

// Map program → Stripe Price ID
const PRICE_MAP = {
  silver: 'price_1TFS6kCf4YXq1rsyYEX6ReQS', // 'price_1OgVTPCf4YXq1rsyGHWrpUI3',
  advanced: 'price_1TFUxCCf4YXq1rsyh1ANAzmB',  // 'price_1SgyrmCf4YXq1rsyFk0I3ljo',
  gold: 'price_1TFSBQCf4YXq1rsysVBaXJI9',  // 'price_1NqWtkCf4YXq1rsyDvmsIWtF',
};

const programs = [
  {
    id: 'silver',
    name: 'Silver Program',
    description:
      'For bettors who want a simple, disciplined foundation built on structured bets, clear analysis and repeatable execution. Designed to replace emotional decisions and bad habits with consistency.',
    priceAmount: '€99',
    pricePeriod: ' for 3 months',
    note: 'Best for starting with structure.',
    button: 'Get Silver Program',
    highlightCount: 4,
  },
  {
    id: 'advanced',
    name: 'Advanced Program',
    description:
      'For bettors who want structured bets backed by game-changing data and access to the BSP Betting Model to consistently identify mispriced odds.',
    priceAmount: '€149',
    pricePeriod: ' for 3 months',
    note: 'Lock in pricing before the next platform.',
    button: 'Get Advanced Program',
    highlightCount: 7,
  },
  {
    id: 'gold',
    name: 'Gold Program',
    description:
      'For bettors who want to master high-level decision-making, advanced strategies and real-world study cases to operate at their highest potential.',
    priceAmount: '€349',
    pricePeriod: ' for 3 months',
    note: 'Secure current Gold pricing.',
    button: 'Get Gold Program',
    highlightCount: 10,
  },
];

const UPGRADE_PRICING = {
  silver: {
    advanced: {
      priceAmount: '€597',
      priceId: 'price_1SgyrmCf4YXq1rsyFk0I3ljo',
    },
    gold: {
      priceAmount: '€997',
      priceId: 'price_1NqWtkCf4YXq1rsyDvmsIWtF',
    },
  },
  advanced: {
    gold: {
      priceAmount: '€997',
      priceId: 'price_1NqWtkCf4YXq1rsyDvmsIWtF',
    },
  },
};


const includes = [
  'Structured Bets',
  'Detailed Bet Analysis',
  'Tournament Previews',
  'Live Betting Opportunities',
  'Advanced Data Insights (BSP App)',
  'BSP Tennis Betting Model',
  'Essential Video Content',
  'High-Stakes Betting Frameworks',
  'BSP Masterclass (20+ Hours of Video)',
  'Real Time Study Cases',
];

export default function Subscriptions() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthContext();
  const [activeProgram, setActiveProgram] = useState('silver');

  // Membership helpers
const MEMBERSHIP = {
  NONE: '1',
  SILVER: '8',
  ADVANCED: '9',
  GOLD: '10',
};

const membership = user?.membership ?? MEMBERSHIP.NONE;
  const checkExpireDate = () => {
  const sec = user?.expire_date ? user.expire_date.seconds * 1000 : 0;
  if (!sec) return true; 
  return Date.now() < sec;
};

const isExpired = !checkExpireDate();

const isSilver = membership === MEMBERSHIP.SILVER && !isExpired;
const isAdvanced = membership === MEMBERSHIP.ADVANCED && !isExpired;
const isGold = membership === MEMBERSHIP.GOLD && !isExpired;

const currentPlan = isExpired
  ? null
  : isSilver
    ? 'silver'
    : isAdvanced
      ? 'advanced'
      : null;



// hierarchy: gold > advanced > silver
const PLAN_RANK = {
  silver: 1,
  advanced: 2,
  gold: 3,
};

const USER_RANK = isExpired ? 0 : isGold ? 3 : isAdvanced ? 2 : isSilver ? 1 : 0;


// disable if user already owns this or higher plan
const isDisabled = (programId) =>
  USER_RANK >= PLAN_RANK[programId];

const getProgramPricing = (programId) => {
  // Upgrade case (Silver → Advanced / Gold, Advanced → Gold)
  if (currentPlan && UPGRADE_PRICING[currentPlan]?.[programId]) {
    return UPGRADE_PRICING[currentPlan][programId];
  }

  // Default/base pricing
  return {
    priceAmount: programs.find(p => p.id === programId).priceAmount,
    priceId: PRICE_MAP[programId],
  };
};


  const handleProgramClick = async (programId) => {
  if (!isAuthenticated) {
    navigate(paths.login, { replace: true });
    return;
  }

  try {
    const stripe = await stripePromise;

    // ✅ ALWAYS use dynamic pricing
    const pricing = getProgramPricing(programId);

    const response = await fetch(
      'https://us-central1-bspconsult-bcd6e.cloudfunctions.net/createCheckoutSession',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: pricing.priceId, // ✅ FIXED
          customerEmail: user?.email,
          platform: 'web',
          upgrade: true,
        }),
      }
    );

    const session = await response.json();

    await stripe.redirectToCheckout({
      sessionId: session.id,
    });
  } catch (error) {
    console.error('Stripe checkout error:', error);
  }
};


  return (
    <section className="section-prices" id="SectionPrice">
      

    <div className="price-grid">
  {programs.map((program) => {
    const pricing = getProgramPricing(program.id);

    return (
      <div
        key={program.id}
        className={`price-card
          ${program.id === 'advanced' ? 'is-featured' : ''}
          ${activeProgram === program.id ? 'is-active' : ''}
        `}
      >
        <div className="price-inner">
          <div className="price-inner-content-top">
            <div className="program-headers">
              <h3 className="program-title">{program.name}</h3>
              {program.id === 'advanced' && (
                <span className="best-value-badge">Best Value</span>
              )}
            </div>

            <p className="program-desc">{program.description}</p>
          </div>

          <div className="price-inner-content-bottom">
            <div className="program-price">
              <span className="price-amount">{pricing.priceAmount}</span>
              <span className="price-period">{program.pricePeriod}</span>
            </div>

            <div className="program-note">{program.note}</div>

            <button
              type="button"
              className={`program-btn ${isDisabled(program.id) ? 'is-disabled' : ''}`}
              disabled={isDisabled(program.id)}
              onClick={() => handleProgramClick(program.id)}
            >
              {isDisabled(program.id)
                ? program.id === 'silver' && isSilver
                  ? 'Current Plan'
                  : program.id === 'gold' && isGold
                    ? 'Current Plan'
                    : 'Already Included'
                : program.button}
            </button>
          </div>
        </div>

        <div className="program-includes">
          <h4>{program.name.split(' ')[0]} Includes</h4>
          <ul>
            {includes.map((item, i) => (
              <li
                key={item}
                className={i < program.highlightCount ? 'active' : 'inactive'}
              >
                <img src="img/check-circle.svg" alt="check" />
                <span className="include-text">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  })}
</div>

    </section>
  );
}