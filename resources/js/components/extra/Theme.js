import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import React, { useState, useEffect,useLayoutEffect } from 'react';


const defaultTheme = {
  body: '#0d7377',
  border: '#212121',
  font: '1rem',
  text: '#eeeeee',
  toggleBorder: '#212121',
  gradient: 'linear-gradient(#32e0c4, #0d7377)',
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
      <img src="https://image.flaticon.com/icons/svg/1164/1164954.svg" width="50" height="50" alt="Sun free icon" title="Sun free icon" />
      <img src="https://image.flaticon.com/icons/svg/2033/2033921.svg" width="50" height="50" alt="Moon free icon" title="Moon free icon" />
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

  console.log(props.config)


const GlobalStyles = createGlobalStyle`
*,
*::after,
*::before {
  box-sizing: border-box;
}

.navbar.navbar-light .navbar-toggler-icon {
  cursor: pointer;
  background-image: url(/img/Toggle.png);
}



#back{
  background: url('/storage/images/${( props.config.background )}');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  width: 100%;
}


html * {
  font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
} 

.sidenav---sidenav-subnav---1EN61 {
  background-color: ${({ theme }) => theme.body} !important;
  color: ${({ theme }) => theme.text} !important;
}

/*Toggle*/
.sidenav---icon-bar---u1f02{
  background-color: ${({ theme }) => theme.text} !important;
  color: ${({ theme }) => theme.body} !important;  
}



.navbar,
.navbar-default {
  background-color: ${({ theme }) => theme.body} !important;
}

.dropdown-item {
  background-color: ${({ theme }) => theme.body} !important;
  color: ${({ theme }) => theme.text}!important;
}

.dropdown-menu {
  background-color: ${({ theme }) => theme.body} !important;
  color: ${({ theme }) => theme.text}!important;
}

.card {
  background-color: ${({ theme }) => theme.body} !important;
  color: ${({ theme }) => theme.text} !important;
}

.btn {
  background-image: ${({ theme }) => theme.gradient} !important;
  color: ${({ theme }) => theme.text} !important;
}

input {
  background-color: ${({ theme }) => theme.body} !important;
  color: ${({ theme }) => theme.text} !important;
}
label {
  background-color: ${({ theme }) => theme.body} !important;
  color: ${({ theme }) => theme.text} !important;
}

.PrivateNotchedOutline-legendLabelled-3 {
  background-color: ${({ theme }) => theme.body} !important;
  color: ${({ theme }) => theme.text} !important;
}

/*flechas paginacion*/
span{
  color: ${({ theme }) => theme.body} !important;
}

p {
  color: ${({ theme }) => theme.text} !important;
}

/*Color de item del nav*/
.sidenav---sidenav-subnavitem---1cD47 :hover{
  background-color: ${({ theme }) => theme.body} !important;
  color: ${({ theme }) => theme.text} !important; 
}

/*Paginacion de tablas*/
.page-link {
  background-color: ${({ theme }) => theme.text} !important;
  color: ${({ theme }) => theme.body} !important; 
}

Strong {
  color: ${({ theme }) => theme.text} !important;
}

select {
  background-color: ${({ theme }) => theme.body} !important;
  color: ${({ theme }) => theme.text} !important;
}



.modal-content {
  background-color: ${({ theme }) => theme.body} !important;
  color: ${({ theme }) => theme.text} !important;
}

.foot {
  background-color: ${({ theme }) => theme.body} !important;
}

.badge {
  background-image: ${({ theme }) => theme.gradient} !important;
  color: ${({ theme }) => theme.text} !important;
}


table {
  border: ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.body};
  width: 100%;
  text-align: left;
  border-collapse: collapse;
}
table td, table th {
  color: ${({ theme }) => theme.text};
  border: ${({ theme }) => theme.border};
  padding: 3px 2px;
  font-size: 1rem;
  font-weight: 500;
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
  color: ${({ theme }) => theme.text};
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

.darkLight {
  background: ${({ theme }) => theme.body} !important;
  color: ${({ theme }) => theme.text} !important;
}

.darkLight-text{
  color: ${({ theme }) => theme.text} !important;
}

.darkLight-body {
  background: ${({ theme }) => theme.body} !important;
}

.lightDark-text{
  color: ${({ theme }) => theme.text} !important;
}

.lightDark-body {
  background: ${({ theme }) => theme.text} !important;
}

[onClick] {
  cursor:pointer;
}

.autocomplete{
color: ${({ theme }) => theme.body} !important;
}

.custom-file-label::after{
  background-image: ${({ theme }) => theme.gradient} !important;
  color: ${({ theme }) => theme.text} !important;
  display: none;
}

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

/*
SideNav {
    background-color: ${({ theme }) => theme.body} !important;
    color: ${({ theme }) => theme.text}!important;
  }

  NavItem {
    background-color: ${({ theme }) => theme.body} !important;
    color: ${({ theme }) => theme.text}!important;
  }

  NavIcon {
    color: ${({ theme }) => theme.text}!important;
  }

  NavText {
    color: ${({ theme }) => theme.text}!important;
  }

  Toggle {
    color: ${({ theme }) => theme.text}!important;
  }
*/