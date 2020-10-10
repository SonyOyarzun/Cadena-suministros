import React, { Component } from 'react';

import Header from './Header';
import Overview from './Overview';


export default class UserProfile extends Component {

  constructor(props) {
    super(props);

  }


  render() {
    const { photo, userName, location } = this.props;

    return (
      <>
            <Header />
            <Overview
              photo={photo}
              name={userName}
              location={location}
            />
      </>
    );
  }
}
