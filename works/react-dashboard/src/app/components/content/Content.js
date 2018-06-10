import React from 'react';
import Pie from '../../containers/chart/Pie';
import BarHorizontal from '../../containers/chart/BarHorizontal.js';
import BarVertical from '../../containers/chart/BarVertical.js';
import Line from '../../containers/chart/Line.js';
import './Content.css';

class Content extends React.Component {
    render() {
        return (
            <div className="Content">
                <div>
                    <div><Pie /></div>
                    <div><BarHorizontal /></div>
                </div>
                <div>
                    <div><BarVertical /></div>
                    <div><Line /></div>
                </div>
            </div>
        );
    }
}

export default Content;
