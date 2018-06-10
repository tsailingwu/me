import React from 'react';
import Header from './header/Header.js';
import Content from './content/Content.js';
import './App.css';

class ViewApp extends React.Component {
    componentDidMount() {
        setInterval(() => {
            this.props.timer();
        }, 3000);
    }
    render() {
        return (
            <div className="wrapper">
                <Header />
                <Content />
            </div>
        );
    }
}

export default ViewApp;
