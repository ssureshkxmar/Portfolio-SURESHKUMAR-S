import React, { Suspense } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';

const GithubIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const CoverVideo = React.lazy(() => import('../../components/CoverVideo'));
const Navbar = React.lazy(() => import('../../components/Navbar'));
const Logo = React.lazy(() => import('../../components/Logo'));

const Section = styled.section`
  position: relative;
  min-height: 100vh;
  overflow: hidden;
`;

const SocialLinksContainer = styled(motion.div)`
  position: absolute;
  top: 2rem;
  right: 2rem;
  display: flex;
  gap: 1rem;
  z-index: 100;

  a {
    color: rgba(255, 255, 255, 0.7);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(10px);
    text-decoration: none;

    &:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.1);
      transform: translateY(-3px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
      border-color: rgba(255, 255, 255, 0.2);
    }
  }

  @media (max-width: 900px) {
    top: 1rem;
    right: 1rem;
    gap: 0.5rem;
    a {
      width: 40px;
      height: 40px;
    }
  }
`;

const Home = () => {
  return (
    <Section id="home">
      <SocialLinksContainer
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        <a href="https://github.com/ssureshkxmar" target="_blank" rel="noopener noreferrer" title="GitHub">
          <GithubIcon size={22} />
        </a>
        <a href="https://www.linkedin.com/in/sureshkumar-s-585691356?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" title="LinkedIn">
          <LinkedinIcon size={22} />
        </a>
        <a href="mailto:ssureshkxmar@gmail.com" title="Email">
          <Mail size={22} />
        </a>
        <a href="tel:8925427760" title="Call">
          <Phone size={22} />
        </a>
      </SocialLinksContainer>
      
      <Suspense fallback={<></>}>
        <Navbar />
        <CoverVideo />
      </Suspense>
    </Section>
  );
};

export default Home;
