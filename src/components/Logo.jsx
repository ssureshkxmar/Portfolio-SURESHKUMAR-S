import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import star from '../assets/logo.png';

const Container = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 6;
  width: fit-content;
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;

  a {
    display: flex;
    align-items: flex-end;
  }

  img {
    width: 6rem;
    height: auto;
    animation: zoomPulse 2s infinite ease-in-out;
    transform-origin: center bottom;
  }

  @keyframes zoomPulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.15); }
    100% { transform: scale(1); }
  }
`;

const Text = styled(motion.span)`
  font-size: ${(props) => props.theme.fontlg};
  color: ${(props) => props.theme.text};
  padding-bottom: 0.5rem;
  margin-left: -5px;
`;

const ToggleIcon = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.text};
  font-size: 1.2rem;
  cursor: pointer;
  padding-bottom: 0.5rem;
  opacity: 0.7;
  transition: opacity 0.2s;
  &:hover {
    opacity: 1;
  }
`;

const textVariants = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: -5,
    transition: {
      duration: 2,
      delay: 5,
      ease: 'easeInOut',
    },
  },
};

const Logo = () => {
  const [isTamil, setIsTamil] = useState(false);

  return (
    <Container>
      <Link to="/">
        <motion.img
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 3 }}
          src={star}
          alt="SURESH"
        />
        <Text variants={textVariants} initial="hidden" animate="visible">
          {isTamil ? 'சுரேஷ்' : 'SURESH'}
        </Text>
      </Link>
      <ToggleIcon onClick={() => setIsTamil(!isTamil)} title="Translate">
        🌐
      </ToggleIcon>
    </Container>
  );
};

export default Logo;
