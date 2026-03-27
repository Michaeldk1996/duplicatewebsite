// /* eslint-disable react/no-unescaped-entities */
// /* eslint-disable no-return-assign */
// import React, { useState, useRef, useEffect } from 'react';
// import './css/Phase.css';

// const useScreenSize = () => {
//   const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsDesktop(window.innerWidth >= 768);
//     };

//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   return isDesktop;
// };

// const SectionPhase = () => {
//   const isDesktop = useScreenSize();
//   const [lineHeight, setLineHeight] = useState(0);
//   const timelineRef = useRef(null);
//   const lineToDrawRef = useRef(null);
//   const itemsRef = useRef([]);

//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   const handleScroll = () => {
//     const windowDistance = window.scrollY;
//     const windowHeight = window.innerHeight / 1.5;
//     const viewportHeight = window.innerHeight / 5;
//     const sectionPhaseHeight = timelineRef.current.offsetHeight;
//     const timelineDistance = timelineRef.current.offsetTop;

//     if (lineToDrawRef.current) {
//       const line = windowDistance - timelineDistance + windowHeight;
//       if (line <= sectionPhaseHeight) {
//         setLineHeight(line);
//       } else {
//         setLineHeight(sectionPhaseHeight);
//       }
//     }

//     const bottom = lineToDrawRef.current.offsetTop + lineHeight;
//     itemsRef.current.forEach((item, index) => {
//       const title = item.querySelector('.phase-items-title');
//       const circlePosition = item.offsetTop;
//       if (bottom > circlePosition) {
//         item.classList.add('in-view');
//       } else {
//         item.classList.remove('in-view');
//       }

//       if (index > 0 && itemsRef.current[index - 1]) {
//         const previousItem = itemsRef.current[index - 1];
//         const previousTitle = previousItem.querySelector('.phase-items-title h2');

//         if (previousTitle) {
//           const previousItemTop = previousItem.offsetTop;
//           const previousItemBottom = previousItemTop + previousItem.offsetHeight;

//           previousTitle.style.transition = 'transform 0.5s ease-out';

//           if (bottom > previousItemTop && bottom < previousItemBottom) {
//             const offset = Math.max(bottom - previousItemTop - viewportHeight, 0);
//             previousTitle.style.transform = `translateY(${offset}px)`;
//           }
//         }
//       }
//     });

//     const extraItem = itemsRef.current[3];
//     const extraTitle = extraItem?.querySelector('.phase-items-title h2');
//     if (extraTitle) {
//       const extraItemTop = extraItem.offsetTop;
//       const extraItemBottom = extraItemTop + extraItem.offsetHeight;

//       extraTitle.style.transition = 'transform 0.5s ease-out';
//       if (bottom > extraItemTop && bottom < extraItemBottom) {
//         const offset = Math.max(bottom - extraItemTop - viewportHeight, 0);
//         extraTitle.style.transform = `translateY(${offset}px)`;
//       }
//     }
//   };

//   useEffect(() => {
//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, [handleScroll, lineHeight]);

//   return (
//     <section className="section-phase pb-85 pt-270 xs-pt-125" ref={timelineRef}>
//       <div className="container-1 mx-auto pl-2 pr-2 relative">
//         {/* Phase 1 */}
//         <div
//           className="phase-items d-flex flex-wrap-mob mb-180 xs-mb-75"
//           // eslint-disable-next-line no-return-assign
//           ref={(el) => (itemsRef.current[0] = el)}
//         >
//           <div className="phase-items-title w-50">
//             <h2 className="heading-1">Phase 1</h2>
//           </div>
//           {isDesktop ? (
//             <div className="phase-items-content w-50">
//               <h4 className="heading-2 mt-12 mb-55">Choose your Program</h4>
//               <p className="text-variation4">
//                 Both programs share the same foundation. You will have immediate access to our
//                 platform, available on <strong>both website and mobile app</strong> , where all{' '}
//                 <strong>premium content</strong> will be posted.
//               </p>
//               <p className="text-variation4">
//                 Simply enter your starting betting capital into the profile section of the app, and
//                 it will <strong>automatically calculate</strong> how much you need to stake per bet.
//               </p>
//               <p className="text-variation4">
//                 In addition, you will also receive access to our{' '}
//                 <strong>Telegram Live channel</strong> , allowing you to get our live calls
//                 throughout the week.
//               </p>
//               <p className="text-variation4">
//                 <strong>Both features</strong> will serve as <strong>your daily guide</strong> to
//                 understand the industry and follow all our bets, enabling you{' '}
//                 <strong>to profit from the market with just a couple of clicks per week</strong>.
//               </p>
//               <video width="100%" height="auto" autoPlay muted loop>
//                 <source src="https://skyblue-mouse-860210.hostingersite.com/img/phase1.webm" type="video/webm" />
//                 Your browser does not support the video tag.
//               </video>
//             </div>
//           ) : (
//             <div className="phase-items-content w-50">
//               <h4 className="heading-2 mt-12 mb-55">Choose your Program</h4>
//               <p className="text-variation4">
//                 Both programs share the same foundation. You will have immediate access to our
//                 platform, available on <strong>both website and mobile app</strong>, where all{' '}
//                 <strong>premium content</strong> will be posted.
//               </p>
//               <p className="text-variation4">
//                 Simply enter your starting betting capital into the profile section of the app, and
//                 it will <strong>automatically calculate</strong> how much you need to stake per bet.
//               </p>
//               <video width="100%" height="auto" autoPlay loop muted playsInline>
//                 <source src="https://skyblue-mouse-860210.hostingersite.com/img/phase1.webm" type="video/webm" />
//                 Your browser does not support the video tag.
//               </video>
//             </div>
//           )}
//         </div>

//         {/* Phase 2 */}
//         <div
//           className="phase-items d-flex flex-wrap-mob mb-70 xs-mb-75"
//           // eslint-disable-next-line no-return-assign
//           ref={(el) => (itemsRef.current[1] = el)}
//         >
//           <div className="phase-items-title w-50 phase2-title">
//             <h2 className="heading-1">Phase 2</h2>
//           </div>
//           {isDesktop ? (
//             <div className="phase-items-content w-50">
//               <h4 className="heading-2 mt-12 mb-55">BSP Tennis Betting Model</h4>
//               <p className="text-variation4">‘When preparation meets opportunity’</p>
//               <p className="text-variation4">
//                 <strong>The most successful bettors</strong> are those who use{' '}
//                 <strong>the best tools</strong> on the market.
//               </p>
//               <p className="text-variation4">
//                 In both programs, you will gain access to our{' '}
//                 <strong>BSP Tennis Betting Model</strong>, which has generated me six figures over
//                 the past years, along with a comprehensive course explaining how to use it
//                 effectively
//               </p>
//               <p className="text-variation4">
//                 <strong>This model</strong> will help you understand the market,{' '}
//                 <strong>shift your perception of the game, identify value opportunities</strong>,
//                 and most importantly, a<strong>void mistakes and maximize your profit.</strong>
//               </p>
//               <video width="100%" height="auto" autoPlay muted loop>
//                 <source src="https://skyblue-mouse-860210.hostingersite.com/img/phase2.webm" type="video/webm" />
//                 Your browser does not support the video tag.
//               </video>
//             </div>
//           ) : (
//             <div className="phase-items-content w-50">
//               <h4 className="heading-2 mt-12 mb-55">BSP Tennis Betting Model</h4>
//               <p className="text-variation4">
//                 <strong>The most successful bettors</strong> are those who use{' '}
//                 <strong>the best tools</strong> on the market.
//               </p>
//               <p className="text-variation4">
//                 In both programs, you will gain access to our{' '}
//                 <strong>BSP Tennis Betting Model</strong>, which has generated me six figures over
//                 the past years, along with a comprehensive course explaining how to use it
//                 effectively
//               </p>
//               <p className="text-variation4">
//                 <strong>This model</strong> will help you understand the market,{' '}
//                 <strong>shift your perception of the game, identify value opportunities</strong>,
//                 and most importantly, a<strong>void mistakes and maximize your profit.</strong>
//               </p>
//               <video width="100%" height="auto" autoPlay loop muted playsInline>
//                 <source src="https://skyblue-mouse-860210.hostingersite.com/img/phase2.webm" type="video/webm" />
//                 Your browser does not support the video tag.
//               </video>
//             </div>
//           )}
//         </div>

//         {/* Phase 3 */}
//         <div
//           className="phase-items d-flex flex-wrap-mob mb-100 xs-mb-75"
//           // eslint-disable-next-line no-return-assign
//           ref={(el) => (itemsRef.current[2] = el)}
//         >
//           <div className="phase-items-title w-50 phase3-title">
//             <h2 className="heading-1">Phase 3</h2>
//           </div>
//           {isDesktop ? (
//             <div className="phase-items-content w-50">
//               <h4 className="heading-2 mt-12 mb-55">Unlock the Masterclass Features</h4>
//               <p className="text-variation4">
//                 Once you feel ready for the next step in <strong>your betting journey</strong>, you
//                 can unlock <strong>the three Masterclass features</strong> to solidify your
//                 knowledge of the industry and l<strong>earn all the secrets of my strategy</strong>.
//               </p>
//               <p className="text-variation4">
//                 As a bettor, it’s essential <strong>to surround yourself</strong> with others who
//                 have <strong>unmatched knowledge of the industry</strong> so you can continuously
//                 learn and <strong>refine your strategy</strong>.
//               </p>
//               <p className="text-variation4">
//                 We’ve created a <strong>Masterclass</strong> that will help you{' '}
//                 <strong>develop a high-income skill</strong> that you can use independently,
//                 alongside someone who has succeeded in this industry.
//               </p>
//               <p className="text-variation4">
//                 You will have all the tools{' '}
//                 <strong>to achieve financial, location, and time freedom.</strong>
//               </p>
//               <video width="100%" height="auto" autoPlay muted loop>
//                 <source src="https://skyblue-mouse-860210.hostingersite.com/img/phase3.webm" type="video/webm" />
//                 Your browser does not support the video tag.
//               </video>
//             </div>
//           ) : (
//             <div className="phase-items-content w-50">
//               <h4 className="heading-2 mt-12 mb-55">Unlock the Masterclass Features</h4>
//               <p className="text-variation4">
//                 Once you feel ready for the next step in <strong>your betting journey</strong>, you
//                 can unlock <strong>the three Masterclass features</strong> to solidify your
//                 knowledge of the industry and l<strong>earn all the secrets of my strategy.</strong>
//               </p>
//               <p className="text-variation4">
//                 As a bettor, it’s essential <strong>to surround yourself</strong> with others who
//                 have<strong> unmatched knowledge of the industry</strong> so you can continuously
//                 learn and <strong>refine your strategy</strong>.
//               </p>
//               <video width="100%" height="auto" autoPlay loop muted playsInline>
//                 <source src="https://skyblue-mouse-860210.hostingersite.com/img/phase3.webm" type="video/webm" />
//                 Your browser does not support the video tag.
//               </video>
//             </div>
//           )}
//         </div>

//         {/* Extra’s */}
//         <div className="phase-items d-flex flex-wrap-mob" ref={(el) => (itemsRef.current[3] = el)}>
//           <div className="phase-items-title w-50 phase4-title">
//             <h2 className="heading-1 xs-text-center">Extra’s</h2>
//           </div>
//           {isDesktop ? (
//             <div className="phase-items-content w-50">
//               <h4 className="heading-2 mt-12 mb-55">$14K Success Blueprint</h4>
//               <p className="text-variation4">
//                 In this world, many people claim to understand the game and make money from betting,
//                 but few can show real numbers.
//               </p>
//               <p className="text-variation4">
//                 That’s why w<strong>e decided to create a "proof of work" challenge</strong>, where
//                 we set out <strong>to scale our account</strong> over two weeks.
//               </p>
//               <p className="text-variation4">
//                 It’s a challenge we accepted and decided to record our progress day by day,
//                 ultimately creating <strong>a case study in which we made 14K in two weeks</strong>,
//                 using <strong>our strategy</strong> and modest stakes of 1K to 2K.
//               </p>
//               <p className="text-variation4">
//                 These c<strong>ase studies are recorded step-by-step</strong>, showing{' '}
//                 <strong>both wins and losses</strong>. This is undoubtedly the biggest added value
//                 of our program ; <strong>something you won’t find anywhere else.</strong>
//               </p>
//               <p className="text-variation4">
//                 "Many people tell you what they can do or teach you, but only a few actually prove
//                 it with real-time results or practice."
//               </p>
//               <p className="text-variation4">
//                 <strong>We are ready to move this whole industry</strong>
//               </p>
//               <video width="100%" height="auto" autoPlay muted loop>
//                 <source src="https://skyblue-mouse-860210.hostingersite.com/img/extra.webm" type="video/webm" />
//                 Your browser does not support the video tag.
//               </video>
//             </div>
//           ) : (
//             <div className="phase-items-content w-50">
//               <h4 className="heading-2 mt-12 mb-55">$14K Success Blueprint</h4>
//               <p className="text-variation4">
//                 In this industry, many people claim to understand the game and make money from
//                 betting, but few can show real numbers. That’s why w
//                 <strong>e decided to create a "proof of work" challenge</strong>, where we set out{' '}
//                 <strong>to scale our account</strong> over two weeks.
//               </p>
//               <p className="text-variation4">
//                 These c<strong>ase studies are recorded step-by-step</strong>, showing{' '}
//                 <strong>both wins and losses</strong>. This is undoubtedly the biggest added value
//                 of our program ; <strong>something you won’t find anywhere else</strong>.
//               </p>
//               <video width="100%" height="auto" autoPlay loop muted playsInline>
//                 <source src="https://skyblue-mouse-860210.hostingersite.com/img/extra.webm" type="video/webm" />
//                 Your browser does not support the video tag.
//               </video>
//             </div>
//           )}
//         </div>
//         {/* Timeline Line */}
//         <div className="timeline-line">
//           <div ref={lineToDrawRef} className="draw-line" style={{ height: `${lineHeight  }px` }} />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SectionPhase;
