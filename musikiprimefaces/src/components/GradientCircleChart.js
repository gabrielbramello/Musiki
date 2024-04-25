import React from 'react';
import ReactApexCharts from 'react-apexcharts';

class GradientCircleChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          type: 'radialBar',
          offsetY: -20,
          sparkline: {
            enabled: true
          }
        },
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 135,
            hollow: {
              margin: 0,
              size: '70%',
              background: '#fff',
              image: undefined,
              imageOffsetX: 0,
              imageOffsetY: 0,
              position: 'front',
              dropShadow: {
                enabled: true,
                top: 3,
                left: 0,
                blur: 4,
                opacity: 0.24
              }
            },
            track: {
              background: '#f2f2f2',
              strokeWidth: '67%',
              margin: 0, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: -3,
                left: 0,
                blur: 4,
                opacity: 0.35
              }
            },
            dataLabels: {
              name: {
                offsetY: -10,
                show: false,
                color: '#888',
                fontSize: '17px'
              },
              value: {
                offsetY: 16,
                color: '#111',
                fontSize: '36px',
                show: false,
              }
            }
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'horizontal',
            shadeIntensity: 0.5,
            gradientToColors: ['#ABE5A1'],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100]
          }
        },
      },
      series: [90],
    };
  }

  render() {
    const { options, series } = this.state;

    return (
      <div id="chart">
        <ReactApexCharts options={options} series={this.state.series} type="radialBar" height={180} />
      </div>
    );
  }
}

export default GradientCircleChart;
