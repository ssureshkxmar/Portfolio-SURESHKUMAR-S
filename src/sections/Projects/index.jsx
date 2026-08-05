import React from 'react';
import styled from 'styled-components';
import InteractivePortfolio from './InteractivePortfolio';
import { Title } from './Styles';

const Section = styled.section`
  min-height: 100vh;
  width: 100vw;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  background-color: ${(props) => props.theme.body || '#090d16'}; /* Dark fallback */
  color: ${(props) => props.theme.text || '#fff'};
  padding-top: 8rem;
  padding-bottom: 5rem;
`;

const Projects = () => {
  return (
    <Section id="fixed-target" className="projects">
      <Title data-scroll data-scroll-speed="-2" data-scroll-direction="horizontal" style={{ marginBottom: '2rem', color: '#fff' }}>
        My Projects
      </Title>
      
      <div style={{ width: '100%', maxWidth: '100vw', margin: '0 auto', zIndex: 10 }}>
        <InteractivePortfolio />
      </div>
    </Section>
  );
};

export default Projects;
