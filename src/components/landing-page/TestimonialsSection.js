// eslint-disable-next-line consistent-return

import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './css/Tetimonials.css';

const TestimonialItem = ({ src, label }) => (
  <div className="testimonial-card">
    <div className="testimonial-image-wrapper">
      <div className="testimonial-image-box">
        <img src={src} alt={label} />
      </div>
    </div>

    <div className="testimonial-footer">
      <div className="testimonial-label">{label}</div>
    </div>
  </div>
);

TestimonialItem.propTypes = {
  src: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

const testimonials = [
  { src: '/img/t2.png', label: 'April 2025 · Gold Member' },
  { src: '/img/t3.png', label: 'April 2025 · Gold Member' },
  { src: '/img/t4.png', label: 'Aug 2025 · Gold Member' },
  { src: '/img/t5.png', label: 'Feb 2025 · Gold Member' },
  { src: '/img/t6.png', label: 'Feb 2025 · Silver Member' },
  { src: '/img/t7.png', label: 'Feb 2025 · Silver Member' },
  { src: '/img/t8.png', label: 'Jan 2025 · Gold Member' },
  { src: '/img/t9.png', label: 'March 2025 · Gold Member' },
  { src: '/img/t10.png', label: 'Mar 2025 · Gold Member' },
  { src: '/img/t11.png', label: 'May 2025 · Silver Member' },
  { src: '/img/t12.png', label: 'Nov 2025 · Advanced Member' },
  { src: '/img/t13.png', label: 'Nov 2025 · Gold Member' },
  { src: '/img/t14.png', label: 'Nov 2025 · Silver Member' },
  { src: '/img/t15.png', label: 'Oct 2025 · Gold Member' },
  { src: '/img/t17.png', label: 'Nov 2025 · Advanced Member' },
  { src: '/img/t18.png', label: 'Oct 2025 · Advanced Member' },
  { src: '/img/t16.png', label: 'Sep 2025 · Gold Member' },
  { src: '/img/t1.png', label: 'July 2025 · Advanced Member' },
];

const TestimonialsSection = () => {
  const scrollRef = useRef(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Update arrow states
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) {
      return () => { }; // ✅ satisfies ESLint
    }

    const updateButtons = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
    };

    updateButtons();
    container.addEventListener('scroll', updateButtons);

    return () => {
      container.removeEventListener('scroll', updateButtons);
    };
  }, []);


  // Arrow scroll (card by card)
  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    const card = container.querySelector('.testimonial-card');
    if (!card) return;

    const gap = 20;
    const scrollAmount = card.offsetWidth + gap;

    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="section-testimonials pb-65">
      <div className="container-3 mx-auto text-center mb-65">
        <div className="features-badge">Testimonials From Members</div>

        <h5 className="heading-h5">
          Messages from members applying the
          <span className="desktop-line-break"> method day   <br className="mobile-only-br" />to day</span>
        </h5>


        <h2 className="heading-h2">
          This is what happens when you replace emotional betting with structure.
        </h2>
      </div>

      <div className="testimonials-wrapper">
        <div className="testimonials-row" ref={scrollRef}>
          {testimonials.map((item, index) => (
            <TestimonialItem key={index} {...item} />
          ))}
        </div>

        <div className="scroll-controls">
          <button
            type="button"
            className={`scroll-btn prev ${canScrollLeft ? 'active' : ''}`}
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            aria-label="Previous"
          />

          <button
            type="button"
            className={`scroll-btn next ${canScrollRight ? 'active' : ''}`}
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            aria-label="Next"
          />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
