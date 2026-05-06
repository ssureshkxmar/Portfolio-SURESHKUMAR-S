import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainVideo from '../assets/bg-video.mp4';
import MobileVideo from '../assets/mobile.mp4';

const VideoContainer = styled.section`
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background-color: #000;

  video {
    width: 100%;
    height: 100vh;
    object-fit: cover;
    filter: brightness(0.55) contrast(1.15) saturate(0.85);

    @media (max-width: 48em) {
      object-position: center 10%;
    }
    @media (max-width: 30em) {
      object-position: center 50%;
    }
  }
`;

const DarkOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.65) 0%,
      rgba(0, 0, 0, 0.25) 40%,
      rgba(0, 0, 0, 0.25) 60%,
      rgba(0, 0, 0, 0.8) 100%
    );
`;

const Title = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.text};
  padding: 0 1rem;

  div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  h1 {
    font-family: "Kaushan Script";
    font-size: calc(1.5rem + 5vw);
    white-space: nowrap;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);

    @media (max-width: 30em) {
      font-size: calc(1.2rem + 7vw);
    }
  }

  h2 {
    font-size: ${(props) => props.theme.fontlg};
    font-family: "Sirin Stencil";
    font-weight: 500;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
    margin: 0 auto;
    text-transform: capitalize;
    letter-spacing: 2px;

    @media (max-width: 30em) {
      font-size: ${(props) => props.theme.fontmd};
      margin-top: 0.5rem;
      align-self: center !important;
      text-align: center;
    }
  }
`;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 2,
      staggerChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const CoverVideo = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <VideoContainer data-scroll>
      <DarkOverlay />
      <Title variants={container} initial="hidden" animate="show">
        <div>
          {['E', 'S', 'I', 'N', 'N'].map((char, index) => (
            <motion.h1
              key={index}
              variants={item}
            >
              {char}
            </motion.h1>
          ))}
        </div>
        <motion.h2
          style={{ alignSelf: 'flex-end' }}
          variants={item}
        >
          build beyond limits
        </motion.h2>
      </Title>

      <video 
        src={isMobile ? MobileVideo : MainVideo} 
        type="video/mp4" 
        autoPlay 
        muted 
        loop 
        playsInline 
        preload="auto"
      />
    </VideoContainer>
  );
};

export default CoverVideo;
