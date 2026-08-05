import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  touch-action: none;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  z-index: 6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: black;
  padding: 2rem;
  text-align: center;
`;

const textVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.5,
      ease: 'easeInOut',
    },
  },
};

const Text = styled(motion.p)`
  font-size: ${(props) => props.theme.fontxl};
  color: ${(props) => props.theme.text};
  padding-top: 0.5rem;
  line-height: 1.6;
  white-space: pre-line;

  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontlg};
  }
`;

const AuthorText = styled(motion.span)`
  font-size: ${(props) => props.theme.fontsm};
  color: ${(props) => props.theme.text};
  opacity: 0.7;
  margin-top: 1rem;
`;

const Loader = () => {
  const [kural, setKural] = useState("");

  useEffect(() => {
    fetch('/thirukkural.json')
      .then((response) => response.json())
      .then((data) => {
        const kuralArray = data.kural;
        const randomIndex = Math.floor(Math.random() * kuralArray.length);
        const selectedKural = kuralArray[randomIndex];
        setKural(`${selectedKural.Line1}\n${selectedKural.Line2}`);
      })
      .catch((error) => {
        console.error("Failed to load Thirukkural:", error);
        setKural("அகர முதல எழுத்தெல்லாம் ஆதி\nபகவன் முதற்றே உலகு.");
      });
  }, []);

  return (
    <Container
      initial={{ y: 0, opacity: 1 }}
      exit={{ y: '100%', opacity: 0 }}
      transition={{ duration: 2, delay: 2.5 }}
    >
      <Text variants={textVariants} initial="hidden" animate="visible">
        {kural}
      </Text>
      {kural && (
        <AuthorText variants={textVariants} initial="hidden" animate="visible">
          — Written by Thiruvalluvar
        </AuthorText>
      )}
    </Container>
  );
};

export default Loader;
