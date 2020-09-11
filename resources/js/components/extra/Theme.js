import styled,{ createGlobalStyle, ThemeProvider } from 'styled-components';
import React, { useState, useEffect } from 'react';

const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  body {
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    padding: 0;
    margin: 0;
    font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    transition: all 0.25s linear;
  }

  html * {
    font-size: ${({ theme }) => theme.font};
  }
`;

const defaultTheme = {
  body: '#e2e2e2',
  font: '1rem',
  text: '#363537',
  toggleBorder: '#fff',
  gradient: 'linear-gradient(#39598A, #79D7ED)',
}

const specialTheme = {
  body: '#363537',
  text: '#363537',
  font: '1.5rem',
  toggleBorder: '#6B8096',
  gradient: 'linear-gradient(#091236, #1E215D)',
}

const Toggle = ({ theme, toggleTheme }) => {
  const isDefault = theme === 'default';

  return (
    <ToggleContainer defaultTheme={isDefault} onClick={toggleTheme}>

    </ToggleContainer>
  );
};

const ToggleContainer = styled.button`
  position: relative;
  display: flex;
  justify-content: space-between;
  background: ${({ theme }) => theme.gradient};
  width: 8rem;
  height: 4rem;
  margin: 0 auto;
  border-radius: 30px;
  border: 2px solid ${({ theme }) => theme.toggleBorder};
  font-size: 0.5rem;
  padding: 0.5rem;
  overflow: hidden;
  cursor: pointer;

  img {
    height: auto;
    width: 2.5rem;
    transition: all 0.3s linear;
    
    // sun icon
    &:first-child {
      transform: ${({ defaultTheme }) => defaultTheme ? 'translateY(0)' : 'translateY(100px)'};
    }
    
    // moon icon
    &:nth-child(2) {
      transform: ${({ defaultTheme }) => defaultTheme ? 'translateY(-100px)' : 'translateY(0)'};
    }
`;

const useSpecialMode = () => {
  const [theme, setTheme] = useState('default');

  const toggleTheme = () => {
    if (theme === 'default') {
      setTheme('special')
      window.localStorage.setItem('theme', 'special');
    } else {
      setTheme('default')
      window.localStorage.setItem('theme', 'default');
    }
  };
  
  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');

    if (localTheme) {
      setTheme(localTheme);
    } else {
      window.localStorage.setItem('theme', 'default');
    }
  })

  return [theme, toggleTheme]
};




export default function Theme() {
  const [theme, toggleTheme] = useSpecialMode();
  const themeMode = theme === 'default' ? defaultTheme : specialTheme;

  return (
    <ThemeProvider theme={themeMode}>
      <div>
        <GlobalStyles />
        <Toggle theme={theme} toggleTheme={toggleTheme} />
      </div>
    </ThemeProvider>
  );
};

