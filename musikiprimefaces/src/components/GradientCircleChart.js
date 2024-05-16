import React from 'react';
import ReactApexCharts from 'react-apexcharts';

class GradientCircleChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
          
      series: [],
      options: {
        chart: {
          type: 'radialBar'
        },
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 225,
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
              background: '#fff',
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
              show: true,
              name: {
                offsetY: -10,
                show: true,
                color: '#000',
                fontSize: '12px'
              },
              value: {
                formatter: function(val) {
                  return parseInt(val);
                },
                color: '#111',
                fontSize: '20px',
                show: true,
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
        stroke: {
          lineCap: 'round'
        },
      },
    
    
    };
  }


  render() {
    const { options } = this.state;
    options.labels = this.props.label;

    return (
      <div id="chart" style={{width:'25%', margin:'0px'}}>
        <ReactApexCharts style={{margin:'0px'}} options={options} series={this.props.series} type="radialBar" height={150} />
      </div>
    );
  }
}

export default GradientCircleChart;
