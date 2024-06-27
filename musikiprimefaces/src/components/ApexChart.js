
import React from 'react';
import ReactApexChart from 'react-apexcharts';


class ApexChart extends React.Component {
  constructor(props) {
    super(props); 
  }


  render() {

    const apexChartInfos = {

      series: [{
        name: 'Valor',
        data: this.props.values,
      }],
      options: {
        chart: {
          height: 750,
          toolbar: {
            show: false
          }
        },
        yaxis: {
          stepSize: 10
        },
        xaxis: {
          categories: this.props.categories,
          labels: {
            show: true,
            style: {
              colors: ["#000", "#000", "#000", "#000", "#000", "#000", "#000", "#000"],
              fontSize: "11px",
              fontFamily: 'Arial',
            }
          }
        }
      },
    };

    return (
      <div>
        <div id="chart">
          <ReactApexChart options={apexChartInfos.options} series={apexChartInfos.series} type="radar" height={550} />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}


export default ApexChart;