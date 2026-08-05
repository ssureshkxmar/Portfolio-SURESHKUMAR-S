import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const SwitcherContainer = styled.div`
  display: flex;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 9999px;
  padding: 4px;
  margin: 0 auto 3rem;
  width: max-content;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

const TabButton = styled.button`
  position: relative;
  background: transparent;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 9999px;
  color: ${props => props.$active ? '#090d16' : '#ffffff'};
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  z-index: 1;
  transition: color 0.3s ease;
  outline: none;
`;

const ActiveIndicator = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 9999px;
  z-index: -1;
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.2);
`;

const SegmentedControl = ({ activeView, setActiveView, tabs }) => {
  return (
    <SwitcherContainer>
      {tabs.map((tab) => (
        <TabButton
          key={tab.id}
          $active={activeView === tab.id}
          onClick={() => setActiveView(tab.id)}
        >
          {activeView === tab.id && (
            <ActiveIndicator
              layoutId="activeTabIndicator"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          {tab.label}
        </TabButton>
      ))}
    </SwitcherContainer>
  );
};

export default SegmentedControl;
