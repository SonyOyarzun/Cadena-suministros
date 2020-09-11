import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import React, { useState, useEffect } from 'react';

const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  div * {
    font-size: ${({ theme }) => theme.font};
    color: ${({ theme }) => theme.text};
    font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  }

  table {
    border: ${({ theme }) => theme.border};
    background-color: ${({ theme }) => theme.body};
    width: 100%;
    text-align: left;
    border-collapse: collapse;
  }
  table td, table th {
    border: ${({ theme }) => theme.border};
    padding: 3px 2px;
  }
 
  table tr:nth-child(even) {
    background: ${({ theme }) => theme.body};
  }
  table thead {
    background: #1C6EA4;
    background: -moz-linear-gradient(top, #5592bb 0%, #327cad 66%, #1C6EA4 100%);
    background: -webkit-linear-gradient(top, #5592bb 0%, #327cad 66%, #1C6EA4 100%);
    background: ${({ theme }) => theme.gradient};
    border-bottom: ${({ theme }) => theme.body};
  }
  table thead th {
    font-size: 15px;
    font-weight: bold;
    color: ${({ theme }) => theme.body};
    border-left: ${({ theme }) => theme.body};
  }
  table thead th:first-child {
    border-left: none;
  }
  
  table tfoot {
    font-size: 14px;
    font-weight: bold;
    color: ${({ theme }) => theme.body};
    background: ${({ theme }) => theme.body};
    background: -moz-linear-gradient(top, #5592bb 0%, #327cad 66%, #1C6EA4 100%);
    background: -webkit-linear-gradient(top, #5592bb 0%, #327cad 66%, #1C6EA4 100%);
    background: ${({ theme }) => theme.gradient};
    border-top: 2px solid #444444;
  }

  table tfoot .links {
    text-align: right;
  }
  table tfoot .links a{
    display: inline-block;
    background: #1C6EA4;
    color: #FFFFFF;
    padding: 2px 8px;
    border-radius: 5px;
  }


`;

const defaultTheme = {
    body: '#dee2e6',
    border: '#363537',
    font: '1rem',
    text: '#363537',
    toggleBorder: '#fff',
    gradient: 'linear-gradient(#39598A, #79D7ED)',
}

const specialTheme = {
    body: '#363537',
    border: '#FAFAFA',
    text: '#FAFAFA',
    font: '1rem',
    toggleBorder: '#6B8096',
    gradient: 'linear-gradient(#091236, #1E215D)',
}

const Toggle = ({ theme, toggleTheme }) => {
    const isDefault = theme === 'default';

    return (
        <ToggleContainer defaultTheme={isDefault} onClick={toggleTheme}>
            <img src="https://image.flaticon.com/icons/svg/1164/1164954.svg" width="224" height="224" alt="Sun free icon" title="Sun free icon" />
            <img src="https://image.flaticon.com/icons/svg/2033/2033921.svg" width="224" height="224" alt="Moon free icon" title="Moon free icon" />
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

