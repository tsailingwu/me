import React from 'react';
import Chart from 'chart.js';

class ViewPie extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.ctx = this.dom.getContext('2d');
        this.myChart = new Chart(this.ctx, {
            type: 'pie',
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [{
                    data: this.props.data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            }
        });
    }
    componentDidUpdate() {
        this.myChart.data.datasets[0].data = this.props.data;
        this.myChart.update();
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

export default ViewPie;
