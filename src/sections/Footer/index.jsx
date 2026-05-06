import { motion } from 'framer-motion';
import React from 'react';
import { useLocomotiveScroll } from 'react-locomotive-scroll';
import styled from 'styled-components';
import LogoImg from '../../assets/logo.png';

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
`;

const BrandSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 64em) {
    align-items: center;
  }

  img {
    width: 5rem;
    height: auto;
    margin-bottom: 1rem;
    filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.15));
  }

  h2 {
    font-family: 'Kaushan Script';
    font-size: ${(props) => props.theme.fontxl};
    margin-bottom: 0.5rem;
  }

  p {
    font-size: ${(props) => props.theme.fontsm};
    opacity: 0.6;
    max-width: 300px;
    line-height: 1.5;
  }
`;

const NavGroup = styled.div`
  display: flex;
  flex-direction: column;

  h4 {
    font-size: ${(props) => props.theme.fontmd};
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 1.5rem;
    color: ${(props) => props.theme.text};
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    font-size: ${(props) => props.theme.fontsm};
    margin-bottom: 1rem;
    opacity: 0.5;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      opacity: 1;
      transform: translateX(5px);
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
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${(props) => props.theme.fontxs};
  opacity: 0.4;

  @media (max-width: 48em) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const Footer = () => {
  const { scroll } = useLocomotiveScroll();

  const handleScroll = (id) => {
    let elem = document.querySelector(id);
    scroll.scrollTo(elem, {
      offset: '-100',
      duration: '2000',
      easing: [0.25, 0.0, 0.35, 1.0],
    });
  };

  return (
    <Section>
      <ContentContainer>
        <BrandSection>
          <img src={LogoImg} alt="ESINN" />
          <h2>ESINN</h2>
          <p>
            Building intelligent digital systems that bridge AI, healthcare, and
            next-generation technology.
          </p>
        </BrandSection>

        <NavGroup>
          <h4>Navigation</h4>
          <ul>
            <li onClick={() => handleScroll('#home')}>Home</li>
            <li onClick={() => handleScroll('.about')}>About Me</li>
            <li onClick={() => handleScroll('.projects')}>Projects</li>
          </ul>
        </NavGroup>

        <NavGroup>
          <h4>Connect</h4>
          <ul>
            <li>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="mailto:contact@esinn.com"
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                Email Me
              </a>
            </li>
          </ul>
        </NavGroup>
      </ContentContainer>

      <Bottom>
        <span>
          &copy; {new Date().getFullYear()} ESINN. All Rights Reserved.
        </span>
        <span>Engineered with Precision & Innovation.</span>
      </Bottom>
    </Section>
  );
};

export default Footer;
