import React from 'react';
import Chart from 'chart.js';

class ViewBarHorizontal extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        var ctx = this.dom.getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'horizontalBar',
            data: {
                labels: ['March', 'June', 'September', 'December'],
                datasets: [{
                    label: 'Dataset',
                    data: this.props.data,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'Horizontal Bar Chart'
                }
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

export default ViewBarHorizontal;
