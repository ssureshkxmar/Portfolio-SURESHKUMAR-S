import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Search } from 'lucide-react';

const rotateBorder = keyframes`
  0% { --border-angle: 0deg; }
  100% { --border-angle: 360deg; }
`;

const SearchContainer = styled.div`
  @property --border-angle {
    syntax: '<angle>';
    initial-value: 0deg;
    inherits: false;
  }
  
  position: relative;
  border-radius: 9999px;
  padding: 1.5px;
  background: conic-gradient(
    from var(--border-angle, 0deg),
    #ff0055,
    #7a00ff,
    #00e5ff,
    #00ff66,
    #ff0055
  );
  animation: ${rotateBorder} 4s linear infinite;
  display: flex;
  max-width: 350px;
  margin: 0 auto 2rem;

  @supports not (background: paint(something)) {
    & {
       background: linear-gradient(90deg, #ff0055, #7a00ff, #00e5ff, #00ff66, #ff0055);
       background-size: 400% 400%;
       animation: gradient-shift 8s ease infinite;
    }
  }

  @keyframes gradient-shift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

const InputWrapper = styled.div`
  background: #090d16;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.85rem 1.5rem;
  color: #ffffff;
`;

const StyledInput = styled.input`
  background: transparent;
  border: none;
  outline: none;
  color: #ffffff;
  font-size: 1rem;
  width: 100%;
  margin-left: 0.75rem;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <SearchContainer>
      <InputWrapper>
        <Search size={20} color="rgba(255,255,255,0.6)" />
        <StyledInput
          type="text"
          placeholder="Search repositories, languages, or topics... (Press '/')"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          id="global-search-input"
        />
      </InputWrapper>
    </SearchContainer>
  );
};

export default SearchBar;
