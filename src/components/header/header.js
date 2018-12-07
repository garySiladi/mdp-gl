// @flow
import React from 'react';
import { Icon } from '../image';
import profilePic from '../../assets/profile-pic.png';

const Header = () => (
  <div className="header">
    <div className="logo">
      POC DEMO
    </div>
    <div className="profile">
      <span className="bold text-highlight">The Doctor</span>
      <img src={profilePic} alt="..." className="profile-pic" />
      <Icon name="dropdownTopBar" />
    </div>
    <a href="https://www.google.com/">
      <Icon
        name="logOut"
        className="logout"
      />
    </a>
  </div>
);

export default Header;
