import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import React, { useState, useEffect,useLayoutEffect } from 'react';



const defaultTheme = {
  body: 'rgb(155,164,180,0.7)',
  text: '#f1f6f9',
  border: 'rgb(155,164,180,0.7)',
  gradient: 'linear-gradient(#14274e, #394867)',
}

const specialTheme = {
  body: 'rgb(33,33,33,0.7)',
  text: '#eeeeee',
  border: 'rgb(13,115,119, 0.7)',
  gradient: 'linear-gradient(#212121, #0d7377)',
}

const Toggle = ({ theme, toggleTheme }) => {
  const isDefault = theme === 'default';

  return (
    <ToggleContainer defaultTheme={isDefault} onClick={toggleTheme}>
      <img src="/img/sun.svg" width="100" height="100" alt="Sun free icon" title="Tema Diurno" />
      <img src="/img/moon.svg" width="100" height="100" alt="Moon free icon" title="Tema Nocturno" />
    </ToggleContainer>
  );
};

const ToggleContainer = styled.button`
  position: relative;
  display: flex;
  justify-content: space-between;
  background: ${({ theme }) => theme.text};
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

.navbar.navbar-light .navbar-toggler-icon {
  cursor: pointer;
  background-image: url(/img/icon-logo.svg);
  width: 50px;
  height: 50px;
  }



.back{
  background: url('/storage/images/${( props.config.background )}');
  background-position: center top;
  background-repeat: no-repeat;
  background-size: cover;
  overFlow: auto;
  padding-bottom: 200vh;
  width: 100%;
}



html * {
  font-family: Roboto;
} 

/*NAVBAR*/
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


/*TRACE*/
.MuiTypography-body1 {
  background-color: ${({ theme }) => theme.body} !important; 
  color: ${({ theme }) => theme.text}!important;
}
.MuiTypography-h6 {
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
  color: ${({ theme }) => theme.text} !important;
}
a {
  color: ${({ theme }) => theme.text} !important;
  text-decoration: none;
}

a:link, a:visited, a:active {
  text-decoration:none;
}

/*flechas paginacion*/
span.mdb-dataTables_paginate{
  color: ${({ theme }) => theme.body} !important;
}

p {
  color: ${({ theme }) => theme.text} !important;
  text-decoration: none;
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



/* CSS BARRA LATERAL INICIO*/

.sidenav---sidenav---_2tBP {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1006;
  min-width: 64px;
  background: ${({ theme }) => theme.body};
  -webkit-transition: min-width 0.2s;
  -moz-transition: min-width 0.2s;
  -o-transition: min-width 0.2s;
  -ms-transition: min-width 0.2s;
  transition: min-width 0.2s;
}
.sidenav---sidenav---_2tBP.sidenav---collapsed---LQDEv .sidenav---sidenav-nav---3tvij .sidenav---sidenav-navitem---uwIJ- .sidenav---sidenav-subnav---1EN61 {
  display: none;
}
.sidenav---sidenav---_2tBP.sidenav---collapsed---LQDEv .sidenav---sidenav-nav---3tvij .sidenav---sidenav-navitem---uwIJ-:hover > .sidenav---sidenav-subnav---1EN61 {
  display: block;
}
.sidenav---sidenav---_2tBP.sidenav---expanded---1KdUL {
  min-width: 240px;
}

.sidenav---sidenav---_2tBP.sidenav---expanded---1KdUL .sidenav---sidenav-nav---3tvij > .sidenav---sidenav-navitem---uwIJ- .sidenav---navicon---3gCRo + .sidenav---navtext---1AE_f {
  visibility: visible;
  opacity: 1;
  -ms-filter: none;
  filter: none;
  -webkit-transition: opacity 0.2s linear;
  -moz-transition: opacity 0.2s linear;
  -o-transition: opacity 0.2s linear;
  -ms-transition: opacity 0.2s linear;
  transition: opacity 0.2s linear;
}
.sidenav---sidenav---_2tBP.sidenav---expanded---1KdUL .sidenav---sidenav-nav---3tvij > .sidenav---sidenav-navitem---uwIJ-.sidenav---expandable---3_dr7 > .sidenav---navitem---9uL5T {
  cursor: pointer;
}

.sidenav---sidenav-subnav---1EN61 {
  color: ${({ theme }) => theme.text};
}

.sidenav---sidenav---_2tBP.sidenav---expanded---1KdUL .sidenav---sidenav-subnav---1EN61 {
  position: static;
  border: none;
  float: left;
  clear: both;
  width: 100%;
  background: transparent;
  overflow: hidden;
  -webkit-box-shadow: none;
  box-shadow: none;
}
.sidenav---sidenav---_2tBP.sidenav---expanded---1KdUL .sidenav---sidenav-nav---3tvij > .sidenav---sidenav-navitem---uwIJ-.sidenav---expanded---1KdUL .sidenav---sidenav-subnav---1EN61 {
  display: block;
}
.sidenav---sidenav---_2tBP.sidenav---expanded---1KdUL .sidenav---sidenav-subnav---1EN61 {
  display: none;
}
.sidenav---sidenav---_2tBP.sidenav---expanded---1KdUL .sidenav---sidenav-subnav---1EN61 > .sidenav---sidenav-subnavitem---1cD47 {
  position: relative;
}
.sidenav---sidenav---_2tBP.sidenav---expanded---1KdUL .sidenav---sidenav-subnav---1EN61 > .sidenav---sidenav-subnavitem---1cD47::before {
  content: " ";
  width: 100%;
  height: 28px;
  position: absolute;
  top: 0;
  z-index: -1;
}
.sidenav---sidenav---_2tBP.sidenav---expanded---1KdUL .sidenav---sidenav-subnav---1EN61 > .sidenav---sidenav-subnavitem---1cD47:first-child {
  display: none;
}
.sidenav---sidenav---_2tBP.sidenav---expanded---1KdUL .sidenav---sidenav-subnav---1EN61 > .sidenav---sidenav-subnavitem---1cD47:hover::before {
  background: ${({ theme }) => theme.border};
  opacity: 0.15;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=15)";
  filter: alpha(opacity=15);
}
.sidenav---sidenav---_2tBP.sidenav---expanded---1KdUL .sidenav---sidenav-subnav---1EN61 > .sidenav---sidenav-subnavitem---1cD47::before {
  content: " ";
  width: 100%;
  height: 28px;
  position: absolute;
  top: 0;
  z-index: -1;
}
.sidenav---sidenav---_2tBP.sidenav---expanded---1KdUL .sidenav---sidenav-subnav---1EN61 > .sidenav---sidenav-subnavitem---1cD47.sidenav---selected---1EK3y > .sidenav---navitem---9uL5T {
  color: ${({ theme }) => theme.text};
}
.sidenav---sidenav---_2tBP.sidenav---expanded---1KdUL .sidenav---sidenav-subnav---1EN61 > .sidenav---sidenav-subnavitem---1cD47.sidenav---selected---1EK3y > .sidenav---navitem---9uL5T::before {
  content: " ";
  width: 2px;
  height: 20px;
  left: 10px;
  top: 4px;
  position: absolute;
  border-left: 2px #fff solid;
}
.sidenav---sidenav---_2tBP.sidenav---expanded---1KdUL .sidenav---sidenav-subnav---1EN61 > .sidenav---sidenav-subnavitem---1cD47:hover > .sidenav---navitem---9uL5T {
  background: transparent;
  color: ${({ theme }) => theme.text};
}
.sidenav---sidenav---_2tBP.sidenav---expanded---1KdUL .sidenav---sidenav-subnav---1EN61 > .sidenav---sidenav-subnavitem---1cD47 > .sidenav---navitem---9uL5T {
  color: ${({ theme }) => theme.text};
  padding: 0 14px 0 20px;
  line-height: 28px;
}
.sidenav---sidenav-toggle---1KRjR {
  position: relative;
  float: left;
  width: 64px;
  height: 64px;
  padding: 0;
  margin: 0;
  background-color: transparent;
  background-image: none;
  border: 0;
  border-radius: 0;
  cursor: pointer;
}
.sidenav---sidenav-toggle---1KRjR:focus {
  outline: none;
}
.sidenav---sidenav-toggle---1KRjR .sidenav---icon-bar---u1f02 {
  display: block;
  width: 20px;
  height: 2px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.text};
  border-radius: 1px;
  -webkit-transition: all 0.15s;
  -moz-transition: all 0.15s;
  -o-transition: all 0.15s;
  -ms-transition: all 0.15s;
  transition: all 0.15s;
  opacity: 0.7;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=70)";
  filter: alpha(opacity=70);
}
.sidenav---sidenav-toggle---1KRjR .sidenav---icon-bar---u1f02 + .sidenav---icon-bar---u1f02 {
  margin-top: 4px;
}
.sidenav---sidenav---_2tBP.sidenav---expanded---1KdUL .sidenav---sidenav-toggle---1KRjR .sidenav---icon-bar---u1f02 {
  width: 25px;
}
.sidenav---sidenav---_2tBP.sidenav---expanded---1KdUL .sidenav---sidenav-toggle---1KRjR .sidenav---icon-bar---u1f02:nth-child(1) {
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
.sidenav---sidenav---_2tBP.sidenav---expanded---1KdUL .sidenav---sidenav-toggle---1KRjR .sidenav---icon-bar---u1f02:nth-child(2) {
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
}
.sidenav---sidenav---_2tBP.sidenav---expanded---1KdUL .sidenav---sidenav-toggle---1KRjR .sidenav---icon-bar---u1f02:nth-child(3) {
  margin-top: -8px;
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  transform: rotate(-45deg);
}
.sidenav---sidenav-nav---3tvij {
  float: left;
  padding: 0;
  margin: 0;
  clear: both;
  list-style: none;
  width: 100%;
}
.sidenav---sidenav-nav---3tvij > .sidenav---sidenav-navitem---uwIJ- {
  clear: both;
  position: relative;
}
.sidenav---sidenav-nav---3tvij > .sidenav---sidenav-navitem---uwIJ-.sidenav---highlighted---oUx9u > .sidenav---navitem---9uL5T {
  cursor: default;
}
.sidenav---sidenav-nav---3tvij > .sidenav---sidenav-navitem---uwIJ-:hover > .sidenav---navitem---9uL5T::after {
  background: ${({ theme }) => theme.border};
  opacity: 0.15;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=15)";
  filter: alpha(opacity=15);
}
.sidenav---sidenav-nav---3tvij > .sidenav---sidenav-navitem---uwIJ-.sidenav---highlighted---oUx9u > .sidenav---navitem---9uL5T::after,
.sidenav---sidenav-nav---3tvij > .sidenav---sidenav-navitem---uwIJ-:hover.sidenav---highlighted---oUx9u > .sidenav---navitem---9uL5T::after {
  background: ${({ theme }) => theme.border};
  opacity: 0.2;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=20)";
  filter: alpha(opacity=20);
}
.sidenav---sidenav-nav---3tvij > .sidenav---sidenav-navitem---uwIJ-.sidenav---highlighted---oUx9u.sidenav---expanded---1KdUL > .sidenav---navitem---9uL5T::after,
.sidenav---sidenav-nav---3tvij > .sidenav---sidenav-navitem---uwIJ-:hover.sidenav---highlighted---oUx9u.sidenav---expanded---1KdUL > .sidenav---navitem---9uL5T::after {
  background: ${({ theme }) => theme.border};
  opacity: 0.25;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=25)";
  filter: alpha(opacity=25);
}
.sidenav---sidenav-nav---3tvij > .sidenav---sidenav-navitem---uwIJ-.sidenav---highlighted---oUx9u.sidenav---selected---1EK3y.sidenav---expanded---1KdUL > .sidenav---navitem---9uL5T::after,
.sidenav---sidenav-nav---3tvij > .sidenav---sidenav-navitem---uwIJ-:hover.sidenav---highlighted---oUx9u.sidenav---selected---1EK3y.sidenav---expanded---1KdUL > .sidenav---navitem---9uL5T::after {
  background: ${({ theme }) => theme.border};
  opacity: 0.2;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=20)";
  filter: alpha(opacity=20);
}
.sidenav---sidenav-nav---3tvij > .sidenav---sidenav-navitem---uwIJ-:hover > .sidenav---navitem---9uL5T .sidenav---navicon---3gCRo,
.sidenav---sidenav-nav---3tvij > .sidenav---sidenav-navitem---uwIJ-.sidenav---highlighted---oUx9u > .sidenav---navitem---9uL5T .sidenav---navicon---3gCRo {
  opacity: 1;
  -ms-filter: none;
  filter: none;
}
.sidenav---sidenav-nav---3tvij > .sidenav---sidenav-navitem---uwIJ-:hover > .sidenav---navitem---9uL5T .sidenav---navicon---3gCRo,
.sidenav---sidenav-nav---3tvij > .sidenav---sidenav-navitem---uwIJ-:hover > .sidenav---navitem---9uL5T .sidenav---navtext---1AE_f,
.sidenav---sidenav-nav---3tvij > .sidenav---sidenav-navitem---uwIJ-.sidenav---highlighted---oUx9u > .sidenav---navitem---9uL5T .sidenav---navicon---3gCRo,
.sidenav---sidenav-nav---3tvij > .sidenav---sidenav-navitem---uwIJ-.sidenav---highlighted---oUx9u > .sidenav---navitem---9uL5T .sidenav---navtext---1AE_f {
  color: ${({ theme }) => theme.border};
}
.sidenav---sidenav-nav---3tvij > .sidenav---sidenav-navitem---uwIJ-:hover > .sidenav---navitem---9uL5T .sidenav---navicon---3gCRo > *,
.sidenav---sidenav-nav---3tvij > .sidenav---sidenav-navitem---uwIJ-:hover > .sidenav---navitem---9uL5T .sidenav---navtext---1AE_f > *,
.sidenav---sidenav-nav---3tvij > .sidenav---sidenav-navitem---uwIJ-.sidenav---highlighted---oUx9u > .sidenav---navitem---9uL5T .sidenav---navicon---3gCRo > *,
.sidenav---sidenav-nav---3tvij > .sidenav---sidenav-navitem---uwIJ-.sidenav---highlighted---oUx9u > .sidenav---navitem---9uL5T .sidenav---navtext---1AE_f > * {
  color: ${({ theme }) => theme.border};
}
.sidenav---sidenav-nav---3tvij > .sidenav---sidenav-navitem---uwIJ- > .sidenav---navitem---9uL5T {
  position: relative;
  display: block;
  line-height: 50px;
  height: 50px;
  white-space: nowrap;
  text-decoration: none;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  cursor: pointer;
}
.sidenav---sidenav-nav---3tvij > .sidenav---sidenav-navitem---uwIJ- > .sidenav---navitem---9uL5T:focus {
  outline: 0;
}
.sidenav---sidenav-nav---3tvij > .sidenav---sidenav-navitem---uwIJ- > .sidenav---navitem---9uL5T::after {
  content: '';
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  background: ${({ theme }) => theme.body};
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
  z-index: -1;
}
.sidenav---sidenav-nav---3tvij > .sidenav---sidenav-navitem---uwIJ- > .sidenav---navitem---9uL5T .sidenav---navicon---3gCRo,
.sidenav---sidenav-nav---3tvij > .sidenav---sidenav-navitem---uwIJ- > .sidenav---navitem---9uL5T .sidenav---navtext---1AE_f {
  color: ${({ theme }) => theme.text};
}
.sidenav---sidenav-nav---3tvij > .sidenav---sidenav-navitem---uwIJ- > .sidenav---navitem---9uL5T .sidenav---navicon---3gCRo > *,
.sidenav---sidenav-nav---3tvij > .sidenav---sidenav-navitem---uwIJ- > .sidenav---navitem---9uL5T .sidenav---navtext---1AE_f > * {
  color: ${({ theme }) => theme.text};
}
.sidenav---sidenav-nav---3tvij > .sidenav---sidenav-navitem---uwIJ- > .sidenav---navitem---9uL5T .sidenav---navicon---3gCRo {
  display: block;
  float: left;
  width: 64px;
  height: 50px;
  margin-right: -6px;
  vertical-align: top;
  background-repeat: no-repeat;
  background-position: center center;
  background-color: transparent;
  opacity: 0.7;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=70)";
  filter: alpha(opacity=70);
  line-height: 50px;
  text-align: center;
}
.sidenav---sidenav-nav---3tvij > .sidenav---sidenav-navitem---uwIJ- > .sidenav---navitem---9uL5T .sidenav---navicon---3gCRo + .sidenav---navtext---1AE_f {
  width: 0;
  visibility: hidden;
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
  -webkit-transition: visibility 0s 0.2s, opacity 0.2s linear;
  -moz-transition: visibility 0s 0.2s, opacity 0.2s linear;
  -o-transition: visibility 0s 0.2s, opacity 0.2s linear;
  -ms-transition: visibility 0s 0.2s, opacity 0.2s linear;
  transition: visibility 0s 0.2s, opacity 0.2s linear;
}
.sidenav---sidenav-subnav---1EN61 {
  min-width: 200px;
  position: absolute;
  list-style: none;
  padding: 0;
  margin: 0;
  top: 0;
  left: 64px;
  background: ${({ theme }) => theme.body};
  border: 1px #bbb solid;
  -webkit-box-shadow: 2px 2px 10px rgba(0,0,0,0.15);
  box-shadow: 2px 2px 10px rgba(0,0,0,0.15);
}
.sidenav---sidenav-subnav---1EN61 > .sidenav---sidenav-subnavitem---1cD47:first-child {
  margin: 0 24px;
  line-height: 48px;
  border-bottom: 1px #ccc solid;
  font-size: 14px;
  font-weight: normal;
}
.sidenav---sidenav-subnav---1EN61 > .sidenav---sidenav-subnavitem---1cD47:nth-child(2) {
  margin-top: 8px;
}
.sidenav---sidenav-subnav---1EN61 > .sidenav---sidenav-subnavitem---1cD47:last-child {
  margin-bottom: 8px;
}
.sidenav---sidenav-subnav---1EN61 > .sidenav---sidenav-subnavitem---1cD47.sidenav---selected---1EK3y > .sidenav---navitem---9uL5T {
  color: ${({ theme }) => theme.text};
  font-weight: bold;
  background: none;
  cursor: default;
}
.sidenav---sidenav-subnav---1EN61 > .sidenav---sidenav-subnavitem---1cD47.sidenav---selected---1EK3y > .sidenav---navitem---9uL5T:hover {
  background: ${({ theme }) => theme.border};
}
.sidenav---sidenav-subnav---1EN61 > .sidenav---sidenav-subnavitem---1cD47 > .sidenav---navitem---9uL5T {
  display: block;
  text-decoration: none;
  color: ${({ theme }) => theme.border};
  font-size: 13px;
  line-height: 30px;
  padding: 0 24px;
  cursor: pointer;
}


/*HOVER DE ITEMS DE NAV*/
.sidenav---sidenav-subnav---1EN61 > .sidenav---sidenav-subnavitem---1cD47 > .sidenav---navitem---9uL5T:hover {
  background: ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.border};
  opacity: 0.7;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=70)";
  filter: alpha(opacity=70);
}
.sidenav---sidenav-subnav---1EN61 > .sidenav---sidenav-subnavitem---1cD47 > .sidenav---navitem---9uL5T:focus {
  outline: 0;
}
.sidenav---sidenav---_2tBP {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  line-height: 20px;
}
.sidenav---sidenav---_2tBP *,
.sidenav---sidenav---_2tBP *:before,
.sidenav---sidenav---_2tBP *:after {
  -webkit-box-sizing: inherit;
  -moz-box-sizing: inherit;
  box-sizing: inherit;
}


/* CSS BARRA LATERAL FIN*/


/*PROFILE INICIO*/
.MuiCardHeader-root{
  background-color: ${({ theme }) => theme.body} !important;
  color: ${({ theme }) => theme.text} !important;
}

.MuiCardHeader-content{
  color: ${({ theme }) => theme.text}!important;
}
.MuiCardHeader-action{
  color: ${({ theme }) => theme.text}!important;
}

.MuiCollapse-wrapper{
  color: ${({ theme }) => theme.text}!important;
}

.MuiTypography-colorTextSecondary{
  color: ${({ theme }) => theme.text}!important;
}

.MuiIconButton-root{
  background-color: ${({ theme }) => theme.body} !important;
  color: ${({ theme }) => theme.text}!important; 
}


.MuiPaper-root{
  background-color: ${({ theme }) => theme.body} !important;
  color: ${({ theme }) => theme.text}!important; 
}
.MuiTypography-root{
  background-color: ${({ theme }) => theme.body} !important;
  color: ${({ theme }) => theme.text}!important; 
}
/*PROFILE FIN*/


/*SNACKS INICIO*/

.MuiAlert-icon {
  background-color: ${({ theme }) => theme.body} !important;
  color: ${({ theme }) => theme.text}!important; 
}
.MuiAlert-message {
  background-color: ${({ theme }) => theme.body} !important;
  color: ${({ theme }) => theme.text}!important; 
}
.MuiAlert-action {
  background-color: ${({ theme }) => theme.body} !important;
  color: ${({ theme }) => theme.text}!important; 
}

/*SNACKS FIN*/

/*FOOTER INICIO*/

.page-footer{
  background-color: ${({ theme }) => theme.body} !important;
  color: ${({ theme }) => theme.text}!important; 
}

.footer-copyright {
  background-color: ${({ theme }) => theme.body} !important;
  color: ${({ theme }) => theme.text}!important; 
}

/*FOOTER FIN*/


/*UPLOAD FIN*/
.fileUpload {
  position: relative;
  overflow: hidden;
  margin: 10px;
}
.fileUpload input.upload {
  position: absolute;
  top: 0;
  right: 0;
  margin: 0;
  padding: 0;
  cursor: pointer;
  opacity: 0;
  filter: alpha(opacity=0);
}
/*UPLOAD FIN*/


.form-control-sm ::placeholder{
  content: 'gg';
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

