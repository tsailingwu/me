import React from 'react';
import Chart from 'chart.js';

class ViewBarVertical extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        var ctx = this.dom.getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["Apple", "Banana", "Coco"],
                datasets: [{
                    label: 'Dataset',
                    data: this.props.data,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'Bar Chart'
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

export default ViewBarVertical;
