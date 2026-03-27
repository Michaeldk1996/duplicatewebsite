import { m, useScroll, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";
import PropTypes from "prop-types";

const RevealText = ({ text, className }) => {
  const ref = useRef(null);
  const [revealedCount, setRevealedCount] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 30%"],
  });

  // Preserve newlines, normalize other whitespace (spaces and tabs)
  const normalizedText = text.trim().replace(/[ \t]+/g, ' ');
  const letters = normalizedText.split("");

  // Listen to scroll progress safely
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const count = Math.floor(latest * letters.length);
    setRevealedCount(count);
  });

  return (
    <p ref={ref} className={className} style={{ textAlign: 'center' }}>
      {letters.map((char, i) => {
        if (char === '\n') {
          return <br key={i} />;
        }
        return (
       <m.span
        key={i}
        animate={{
            color: i <= revealedCount
            ? "#ffffff"
            : "#818288",
            fontWeight: i <= revealedCount ? 400 : 400,
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        >
        {char}
        </m.span>

        );
      })}
    </p>
  );
};

RevealText.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default RevealText;
