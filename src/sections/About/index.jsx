import React from 'react';
import styled from 'styled-components';
import img1 from '../../assets/Images/profile.png';

const Section = styled.section`
  min-height: 100vh;
  width: 80vw;
  margin: 0 auto;
  position: relative;
  display: flex;
  align-items: center;

  @media (max-width: 48em) {
    width: 90vw;
  }

  @media (max-width: 30em) {
    width: 100vw;
  }
`;

const Left = styled.div`
  width: 50%;
  font-size: ${(props) => props.theme.fontlg};
  font-weight: 300;
  position: relative;
  z-index: 5;
  margin-top: 10%;

  @media (max-width: 64em) {
    width: 80%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) !important;
    margin: 0 auto;
    padding: 2rem;
    font-weight: 600;
    backdrop-filter: blur(2px);
    background-color: ${(props) => `rgba(${props.theme.textRgba},0.4)`};
    border-radius: 20px;
  }
  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontmd};
  }
  @media (max-width: 30em) {
    font-size: ${(props) => props.theme.fontsm};
    padding: 2rem;
    width: 70%;
  }
`;

const Right = styled.div`
  width: 50%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 6rem;

  img {
    width: 72%;
    height: auto;
    border-radius: 12px;
    display: block;
    margin: 0 auto;
  }

  @media (max-width: 64em) {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 60%;
      height: auto;
      object-fit: cover;
    }
  }

  @media (max-width: 48em) {
    img {
      width: 80%;
    }
  }
`;

const Title = styled.h1`
  font-size: ${(props) => props.theme.fontBig};
  font-family: 'Kaushan Script';
  font-weight: 300;
  position: absolute;
  top: 1rem;
  left: 5%;
  z-index: 5;

  span {
    display: inline-block;
  }

  @media (max-width: 64em) {
    font-size: ${(props) => `calc(${props.theme.fontBig} - 5vw)`};
    top: 0;
    left: 0%;
  }
  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontxxxl};
  }
`;

const About = () => {
  return (
    <Section id="fixed-target" className="about">
      <Title
        data-scroll
        data-scroll-speed="-2"
        data-scroll-direction="horizontal"
      >
        About Me
      </Title>
      <Left data-scroll>
        Building intelligent digital systems that bridge AI, healthcare, and
        next-generation technology.
        <br />
        <br />
        I am an engineering student and technology developer focused on creating
        innovative solutions in artificial intelligence, IoT, embedded systems,
        and advanced web applications. My recent work includes AI-powered
        medical visualization platforms, smart real-time monitoring systems, and
        cloud-connected intelligent applications designed for practical industry
        use.
        <br />
        <br />
        With a strong interest in research, innovation, and scalable product
        development, I aim to engineer technologies that are futuristic,
        impactful, and capable of solving complex real-world challenges.
      </Left>

      <Right>
        <img width="400" height="600" src={img1} alt="About Me" />
      </Right>
    </Section>
  );
};

export default About;
