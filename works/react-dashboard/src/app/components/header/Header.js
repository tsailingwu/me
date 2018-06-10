import React from 'react';
// import ThemeStyle from '../../containers/header/ThemeStyle.js';
import ViewThemeStyle from './ThemeStyle.js';
import './Header.css';

class Header extends React.Component {
    render() {
        return (
            <header>
                <div className="title">Dashboard</div>
                <ViewThemeStyle />
            </header>
        );
    }
}

export default Header;
