import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useLocomotiveScroll } from 'react-locomotive-scroll';

const NavContainer = styled(motion.div)`
  position: absolute;
  top: ${(props) => (props.$click ? '0' : `-${props.theme.navHeight}`)};
  transition: all 0.3s ease;
  z-index: 100;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    /* Mobile Dock Style */
    position: fixed;
    top: auto;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%) !important;
    width: 90vw;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 50px;
    padding: 0.5rem 1rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    z-index: 9999;
  }
`;

const MenuBtn = styled.li`
  background-color: ${(props) => `rgba(${props.theme.textRgba},0.7)`};
  color: ${(props) => props.theme.body};
  width: 15rem;
  height: 2.5rem;
  border: none;
  outline: none;
  clip-path: polygon(0 0, 100% 0, 80% 100%, 20% 100%);
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  font-size: ${(props) => props.theme.fontmd};
  font-weight: 600;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    display: none; /* Hide MENU button on mobile, dock is always visible */
  }
`;

const MenuItems = styled(motion.ul)`
  position: relative;
  height: ${(props) => props.theme.navHeight};
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};
  display: flex;
  justify-content: space-around;
  align-items: center;
  list-style: none;
  width: 100%;
  padding: 0 10rem;

  @media (max-width: 768px) {
    background-color: transparent;
    height: auto;
    padding: 0;
    justify-content: space-around;
    width: 100%;
  }
`;

const Item = styled(motion.li)`
  text-transform: uppercase;
  color: ${(props) => props.theme.text};
  cursor: pointer;

  .icon {
    display: none;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    font-size: 0.65rem;
    padding: 0.5rem;
    color: #fff;
    font-weight: 600;
    
    .icon {
      display: block;
      margin-bottom: 2px;
    }
    
    span {
      display: block;
    }
  }
`;

const HomeIcon = () => (
  <svg className="icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const AboutIcon = () => (
  <svg className="icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const ProjectsIcon = () => (
  <svg className="icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
  </svg>
);

const Navbar = () => {
  const [click, setClick] = useState(false);
  const { scroll } = useLocomotiveScroll();

  const handleScroll = (id) => {
    let elem = document.querySelector(id);
    if (!elem) return;
    setClick(false);
    scroll.scrollTo(elem, {
      offset: '-100',
      duration: '2000',
      easing: [0.25, 0.0, 0.35, 1.0],
    });
  };

  return (
    <NavContainer
      $click={click}
      initial={{ y: '-100%' }}
      animate={{ y: 0 }}
      transition={{ duration: 1, delay: 2 }}
    >
      <MenuItems>
        <MenuBtn onClick={() => setClick(!click)}>MENU</MenuBtn>
        <Item onClick={() => handleScroll('#home')}>
          <HomeIcon />
          <span>Home</span>
        </Item>
        <Item onClick={() => handleScroll('.about')}>
          <AboutIcon />
          <span>About</span>
        </Item>
        <Item onClick={() => handleScroll('.projects')}>
          <ProjectsIcon />
          <span>Projects</span>
        </Item>
      </MenuItems>
    </NavContainer>
  );
};

export default Navbar;
