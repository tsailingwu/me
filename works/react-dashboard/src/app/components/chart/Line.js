import React from 'react';
import Chart from 'chart.js';

class ViewLine extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        var ctx = this.dom.getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [{
                    label: 'My First dataset',
                    data: this.props.data,
                    backgroundColor: 'rgba(153, 102, 255, 1)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    fill: false,
                }]
            }
        });
    }
    render() {
        return (
            <canvas
                ref={(c) => this.dom = c}
                width="400"
                height="400"
            />
        );
    };
}

export default ViewLine;
