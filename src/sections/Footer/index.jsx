import { motion } from 'framer-motion';
import React from 'react';
import { useLocomotiveScroll } from 'react-locomotive-scroll';
import styled from 'styled-components';
import { Home, User, Folder, Mail } from 'lucide-react';

const GithubIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Section = styled.section`
  min-height: 50vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};
  position: relative;
  padding: 5rem 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);

  @media (max-width: 48em) {
    padding: 3rem 1.5rem;
    padding-bottom: 6rem; /* Extra space at the bottom for the mobile dock */
  }
`;

const ContentContainer = styled.div`
  width: 80%;
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr;
  gap: 4rem;

  @media (max-width: 64em) {
    grid-template-columns: 1fr;
    width: 90%;
    text-align: center;
    gap: 3rem;
  }

  @media (max-width: 48em) {
    width: 100%;
    gap: 2.5rem;
  }
`;

const BrandSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 64em) {
    align-items: center;
  }

  img {
    width: 7rem;
    height: 7rem;
    border-radius: 50%;
    margin-bottom: 1.5rem;
    object-fit: cover;
    box-shadow: 0 0 30px 5px rgba(255, 255, 255, 0.2);
    border: 2px solid rgba(255, 255, 255, 0.1);

    @media (max-width: 48em) {
      width: 5.5rem;
      height: 5.5rem;
      margin-bottom: 1rem;
    }
  }

  h2 {
    font-family: 'Kaushan Script', cursive;
    font-size: ${(props) => props.theme.fontxxl};
    margin-bottom: 0.8rem;
    color: #ffffff;
    text-shadow: 0 2px 10px rgba(0,0,0,0.5);

    @media (max-width: 48em) {
      font-size: ${(props) => props.theme.fontxl};
    }
  }

  p {
    font-size: ${(props) => props.theme.fontsm};
    color: rgba(255, 255, 255, 0.6);
    max-width: 320px;
    line-height: 1.6;

    @media (max-width: 48em) {
      font-size: ${(props) => props.theme.fontxs};
      max-width: 280px;
    }
  }
`;

const NavGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 64em) {
    align-items: center;
  }

  h4 {
    font-size: ${(props) => props.theme.fontmd};
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 2rem;
    color: #ffffff;
    position: relative;
    padding-bottom: 0.5rem;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 40px;
      height: 3px;
      background: #58a6ff;
      border-radius: 2px;
    }

    @media (max-width: 64em) {
      &::after {
        left: 50%;
        transform: translateX(-50%);
      }
    }

    @media (max-width: 48em) {
      font-size: 1rem;
      margin-bottom: 1.5rem;
    }
  }

  ul {
    list-style: none;
    padding: 0;
    width: 100%;
  }

  li {
    font-size: ${(props) => props.theme.fontsm};
    margin-bottom: 1.2rem;
    color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.8rem;

    @media (max-width: 64em) {
      justify-content: center;
    }

    @media (max-width: 48em) {
      font-size: 0.9rem;
      margin-bottom: 1rem;
    }

    svg {
      color: #58a6ff;
      opacity: 0.8;
      transition: all 0.3s ease;
    }

    &:hover {
      color: #ffffff;
      transform: translateX(5px);
      
      svg {
        opacity: 1;
      }
    }

    a {
      color: inherit;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 0.8rem;
    }
  }

  @media (max-width: 64em) {
    li:hover {
      transform: translateY(-3px);
    }
  }
`;

const Bottom = styled.div`
  width: 80%;
  margin-top: 5rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${(props) => props.theme.fontxs};
  color: rgba(255, 255, 255, 0.4);

  @media (max-width: 48em) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
    margin-top: 3rem;
    width: 90%;
  }
`;

const Footer = () => {
  const { scroll } = useLocomotiveScroll();

  const handleScroll = (id) => {
    let elem = document.querySelector(id);
    if (elem) {
      scroll.scrollTo(elem, {
        offset: '-100',
        duration: '2000',
        easing: [0.25, 0.0, 0.35, 1.0],
      });
    }
  };

  return (
    <Section>
      <ContentContainer>
        <BrandSection>
          <img src="/favicon.png" alt="SURESHKUMAR" />
          <h2>SURESHKUMAR</h2>
          <p>
            Building intelligent digital systems that bridge AI, healthcare, and
            next-generation technology.
          </p>
        </BrandSection>

        <NavGroup>
          <h4>Navigation</h4>
          <ul>
            <li onClick={() => handleScroll('#home')}>
              <Home size={18} /> Home
            </li>
            <li onClick={() => handleScroll('.about')}>
              <User size={18} /> About Me
            </li>
            <li onClick={() => handleScroll('.projects')}>
              <Folder size={18} /> Projects
            </li>
          </ul>
        </NavGroup>

        <NavGroup>
          <h4>Connect</h4>
          <ul>
            <li>
              <a href="https://github.com/ssureshkxmar" target="_blank" rel="noreferrer">
                <GithubIcon /> GitHub
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/sureshkumar-s-585691356" target="_blank" rel="noreferrer">
                <LinkedinIcon /> LinkedIn
              </a>
            </li>
            <li>
              <a href="mailto:ssureshkxmar@gmail.com">
                <Mail size={18} /> Email Me
              </a>
            </li>
          </ul>
        </NavGroup>
      </ContentContainer>

      <Bottom>
        <span>
          &copy; {new Date().getFullYear()} SURESHKUMAR. All Rights Reserved.
        </span>
        <span>Engineered with Precision & Innovation.</span>
      </Bottom>
    </Section>
  );
};

export default Footer;
