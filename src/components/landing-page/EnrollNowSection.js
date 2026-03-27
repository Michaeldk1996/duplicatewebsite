import './css/EnrollNow.css';

/* eslint-disable react/no-unescaped-entities */

import React, { useRef, useEffect, useState } from 'react';
import { ICON_MAP } from './Icons';

const EnrollNowSection = () => {
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);

  // Calculate slide width once
  useEffect(() => {
    if (!scrollRef.current) return;

    const slide = scrollRef.current.querySelector('.enroll-items');
    if (slide) {
      const gap = 32;
      setSlideWidth(slide.offsetWidth + gap);
    }
  }, []);

  const scroll = (direction) => {
    if (!scrollRef.current || !slideWidth) return;

    let nextIndex = currentIndex;

    if (direction === 'right' && currentIndex < enrollItems.length - 1) {
      nextIndex += 1;
    }

    if (direction === 'left' && currentIndex > 0) {
      nextIndex -= 1;
    }

    scrollRef.current.scrollTo({
      left: nextIndex * slideWidth,
      behavior: 'smooth',
    });

    setCurrentIndex(nextIndex);
  };

  return (
    <section className="section-enroll-now section-top-divider">
      <div className="container-1 mx-auto pl-2 pr-2 text-center mb-65">
        <div className="features-badge">From Structure to Clarity</div>
        <h5 className="heading-h5">
          Here's What <span>You Get</span>
        </h5>
        <h2 className="heading-h2">
          A complete method designed to transform your
          <span className="enroll-break"> betting approach</span>
        </h2>

      </div>

      <div className="enroll-wrapper">
        <div className="container-slider" ref={scrollRef}>
          <div className="enroll-track">
            {enrollItems.map((item, index) => (
              <div className="enroll-items" key={index}>
                <div className="enroll-items-bg">
                  <div className="enroll-left">
                    {item.icon && ICON_MAP[item.icon] && (
                      <div className="enroll-icon-box">
                        {React.createElement(ICON_MAP[item.icon], {
                          size: 22,
                          className: 'icon-main',
                        })}
                      </div>
                    )}

                    <h3 className="heading-h3">{item.title}</h3>
                    <h4 className="heading-h4">{item.description}</h4>

                    {item.extraInfo && (
                      <div className="enroll-extra-list">
                        {item.extraInfo.items.map((info, i) => (
                          <div key={i} className="enroll-extra-box">
                            {ICON_MAP[info.icon] &&
                              React.createElement(ICON_MAP[info.icon], {
                                size: 14,
                                className: 'icon-small',
                              })}
                            <span>{info.text}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="enroll-right">
                    <img
                      src={item.imgSrc}
                      alt={item.alt}
                      className="enroll-image"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ARROWS */}
        <div className="scroll-controls">
          <button
            type="button"
            className="scroll-btn prev"
            onClick={() => scroll("left")}
            disabled={currentIndex === 0}
            aria-label="Previous"
          />

          <button
            type="button"
            className="scroll-btn next"
            onClick={() => scroll("right")}
            disabled={currentIndex === enrollItems.length - 1}
            aria-label="Next"
          />
        </div>

      </div>
    </section>
  );
};


const enrollItems = [
  {
    imgSrc: 'img/scroll1_new.png',
    alt: 'BSP Application',
    title: 'BSP Application',
    description:
      "Follow a structured ATP betting strategy directly inside the app. Every betting opportunity is supported by clear analysis and a personalized staking system, removing emotion from decision-making and allowing users to fully understand the logic behind each bet, complemented by advanced tournament-level insights.",
    icon: 'applications',
    extraInfo: {
      label: 'Includes',
      items: [
        { icon: 'app1', text: 'Advanced Data Insights' },
        { icon: 'app2', text: 'High ROI-focused bets' },
        { icon: 'app3', text: 'Detailed Bet Analysis' },
        { icon: 'app4', text: 'Tournament Previews & Context' },
      ],
    },
  },
  {
    imgSrc: 'img/scroll3.png',
    alt: 'BSP Tennis Betting Model',
    title: 'BSP Tennis Betting Model',
    description:
      "Access our in-house statistical model that centralizes key ATP metrics to identify mispriced lines and bookmaker inefficiencies. Every bet is supported by a clear Expected Value (EV), removing bias and emotion in favor of objective, data-driven decisions. Built and refined across multiple ATP seasons",
    icon: 'tenniss',
    extraInfo: {
      label: 'Includes',
      items: [
        { icon: 'tennis1', text: 'Essential Video Content' },
        { icon: 'tennis2', text: 'Edge Identification' },
        { icon: 'tennis3', text: 'Data Modeling' },
        { icon: 'tennis4', text: 'EV+ Bets' },
      ],
    },
  },
  {
    imgSrc: 'img/scroll2.png',
    alt: 'Telegram Live Channel',
    title: 'Telegram Live Channel',
    description:
      'Access live betting opportunities with real-time context. Learn why we enter, skip, or exit matches in real time, identify momentum shifts and act before odds adjust. Master hedging strategies on tennis without emotional pressure.',
    icon: 'chat',
    extraInfo: {
      label: 'Includes',
      items: [
        { icon: 'chat1', text: 'Predefined Entries' },
        { icon: 'chat2', text: 'Live Market Edge' },
        { icon: 'chat3', text: 'Timing & Execution' },
      ],
    },
  },
  {
    imgSrc: 'img/scroll4.png',
    alt: 'Masterclass Channel',
    title: 'Masterclass Channel',
    description:
      'Access deep, high-precision tennis information normally reserved for professional analysts. From elite tennis statistics to advanced betting strategies suited for high-staking profiles, this channel is built for bettors who want a complete advanced understanding of the game.',
    icon: 'channels',
    extraInfo: {
      label: 'Includes',
      items: [
        { icon: 'channel1', text: 'High-Staking Strategies' },
        { icon: 'channel2', text: 'Advanced Statistics' },
        { icon: 'channel3', text: 'Crypto Bookmaker Dynamics' },
        { icon: 'channel4', text: 'Profit Optimization' },
      ],
    },
  },
  {
    imgSrc: 'img/scroll5.png',
    alt: 'BSP Masterclass Video Course',
    title: 'BSP Masterclass Video Course',
    description:
      'A complete A→Z breakdown of the Method. Learn the methodology, tools, and decision logic through real case studies showcasing wins and losses, recorded step by step without filters. Built for members who want full access to the secrets of our strategy',
    icon: 'videos',
    extraInfo: {
      label: 'Includes',
      items: [
        { icon: 'video1', text: 'Advanced Data & Tools' },
        { icon: 'video2', text: 'Case Studies' },
        { icon: 'video3', text: 'Personal Account Walkthroughs' },
      ],
    },
  },

];

export default EnrollNowSection;