
import React from 'react';
import ReactApexChart from 'react-apexcharts';


class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      series: [{
        name: 'Series 1',
        data: [80, 50, 30, 40, 100, 20, 50, 35],
      }],
      options: {
        chart: {
          height: 750,
          type: 'radar',
          toolbar: {
            show: false
          }
        },
        yaxis: {
          stepSize: 20
        },
        xaxis: {
          categories: this.props.categories,
          labels: {
            show: true,
            style: {
              colors: ["#000", "#000","#000","#000","#000","#000","#000","#000"],
              fontSize: "11px",
              fontFamily: 'Arial',
            }
          }
        }
      },
    };
  }



  render() {
    return (
      <div>
        <div id="chart">
          <ReactApexChart options={this.state.options} series={this.state.series} type="radar" height={550} />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}


export default ApexChart;