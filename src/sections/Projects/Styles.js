import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Section = styled.section`
  min-height: 100vh;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const Overlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30vw;
  height: 90vh;
  box-shadow: 0 0 0 5vw ${(props) => props.theme.text};
  border: 3px solid black;
  z-index: 11;

  @media (max-width: 70em) {
    width: 40vw;
    height: 80vh;
  }
  @media (max-width: 64em) {
    width: 50vw;
    box-shadow: 0 0 0 60vw ${(props) => props.theme.text};
    height: 80vh;
  }
  @media (max-width: 48em) {
    width: 60vw;
    height: 80vh;
  }
  @media (max-width: 30em) {
    width: 80vw;
    height: 60vh;
  }
`;

export const Container = styled.div`
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%, 0%);
  width: 25vw;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 20;

  @media (max-width: 64em) {
    width: 30vw;
  }
  @media (max-width: 48em) {
    width: 40vw;
  }
  @media (max-width: 30em) {
    width: 80vw;
  }
`;

export const Title = styled(motion.h1)`
  font-size: ${(props) => props.theme.fontxxxl};
  font-family: 'Kaushan Script';
  font-weight: 300;
  color: ${(props) => props.theme.body};
  text-shadow: 1px 1px 1px ${(props) => props.theme.text};
  position: absolute;
  top: 2rem;
  left: 1rem;
  z-index: 15;

  @media (max-width: 64em) {
    font-size: ${(props) => props.theme.fontxxl};
  }
  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontxl};
  }
`;

export const Text = styled.div`
  width: 20%;
  font-size: ${(props) => props.theme.fontlg};
  font-weight: 300;
  position: absolute;
  padding: 2rem;
  top: 0;
  right: 0;
  z-index: 11;

  @media (max-width: 48em) {
    display: none;
  }
`;

export const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 4rem 0;
  width: 100%;
`;

export const Card = styled.div`
  width: 100%;
  background: ${(props) => props.theme.body};
  border: 1.5px solid ${(props) => `${props.accentcolor}55`};
  border-left: 4px solid ${(props) => props.accentcolor};
  border-radius: 12px;
  padding: 1.4rem 1.2rem;
  box-shadow: 0 4px 24px ${(props) => `${props.accentcolor}22`};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, ${(props) => props.accentcolor}, transparent);
    opacity: 0.6;
  }
`;

export const CardImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
  opacity: 0.8;
  transition: all 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

export const CategoryBadge = styled.span`
  display: inline-block;
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${(props) => props.accentcolor};
  background: ${(props) => `${props.accentcolor}18`};
  border: 1px solid ${(props) => `${props.accentcolor}40`};
  border-radius: 50px;
  padding: 0.2rem 0.6rem;
  margin-bottom: 0.6rem;
`;

export const ConfidentialBadge = styled.span`
  display: inline-block;
  font-size: 0.5rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #fff;
  background: #ef4444;
  border-radius: 4px;
  padding: 0.15rem 0.5rem;
  margin-left: 0.5rem;
  vertical-align: middle;
  animation: pulse 2s infinite;

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
  }
`;

export const CardTitle = styled.h2`
  font-size: 0.95rem;
  font-weight: 700;
  color: ${(props) => props.theme.text};
  margin: 0.3rem 0 0.5rem;
  line-height: 1.2;
  letter-spacing: -0.01em;
`;

export const CardDesc = styled.p`
  font-size: 0.65rem;
  font-weight: 400;
  color: ${(props) => props.theme.text};
  opacity: 0.65;
  line-height: 1.5;
  margin: 0;
`;
