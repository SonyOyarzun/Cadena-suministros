import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import React, { useState, useEffect, useLayoutEffect } from 'react';



const defaultTheme = {
  font: '0.9rem',
}

const specialTheme = {
  font: '1.1rem',
}

const Toggle = ({ theme, toggleTheme }) => {
  const isDefault = theme === 'default';

  return (
    <ToggleContainer defaultTheme={isDefault} onClick={toggleTheme}>
      <img src="/img/aminus.svg" width="50" height="50" alt="minus" title="Reducir fuente" />
      <img src="/img/aplus.svg" width="50" height="50" alt="plus" title="Aumentar fuente" />
    </ToggleContainer>
  );
};

const ToggleContainer = styled.button`
  position: relative;
  display: flex;
  justify-content: space-between;
  background: ${({ theme }) => theme.gradient};
  width: 3rem;
  height: 2rem;
  margin: 0 auto;
  border-radius: 30px;
  border: 2px solid ${({ theme }) => theme.toggleBorder};
  font-size: 0.5rem;
  padding: 0.5rem;
  overflow: hidden;
  cursor: pointer;

  img {
    height: auto;
    width: 1rem;
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




export default function Theme(props) {
  const [theme, toggleTheme] = useSpecialMode();
  const themeMode = theme === 'default' ? defaultTheme : specialTheme;

  // console.log(props.config)


  const GlobalStyles = createGlobalStyle`
*,
*::after,
*::before {
  box-sizing: border-box;
}


html * {
  font-size: ${({ theme }) => theme.font};
} 

/*TABLE INICIO*/
table {
  font-size: ${({ theme }) => theme.font};
}
table td, table th {
  font-size: ${({ theme }) => theme.font};
}
table tr:nth-child(even) {
  font-size: ${({ theme }) => theme.font};
}
table thead {
  font-size: ${({ theme }) => theme.font};
}
table thead th {
  font-size: ${({ theme }) => theme.font};
}
table thead th:first-child {
  font-size: ${({ theme }) => theme.font};
}
table tfoot {
  font-size: ${({ theme }) => theme.font};
}
table tfoot .links {
  font-size: ${({ theme }) => theme.font};
}
table tfoot .links a{
  font-size: ${({ theme }) => theme.font};
}
/*TABLE FIN*/

/*PROFILE INICIO*/
.MuiCardHeader-root{
  font-size: ${({ theme }) => theme.font};
}
.MuiCardHeader-content{
  font-size: ${({ theme }) => theme.font};
}
.MuiCardHeader-action{
  font-size: ${({ theme }) => theme.font};
}
.MuiCollapse-wrapper{
  font-size: ${({ theme }) => theme.font};
}
.MuiTypography-colorTextSecondary{
  font-size: ${({ theme }) => theme.font};
}
.MuiIconButton-root{
  font-size: ${({ theme }) => theme.font};
}
.MuiPaper-root{
  font-size: ${({ theme }) => theme.font};
}
.MuiTypography-root{
  font-size: ${({ theme }) => theme.font};
}
/*PROFILE FIN*/
`;



  return (
    <ThemeProvider theme={themeMode}>
      <div>
        <GlobalStyles />
        <Toggle theme={theme} toggleTheme={toggleTheme} />
      </div>
    </ThemeProvider>
  );
};

