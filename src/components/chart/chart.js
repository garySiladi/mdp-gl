import React from 'react';
import { Line } from 'react-chartjs-2';

type Dataset = {
  +data: Array<Number>,
  +label: String,
  +borderColor: String,
}

type Props = {
  +data: {
    +labels: Array<Number>,
    +datasets: Array<Dataset>,
  },
  +options: Object, // TODO: change later
  +getRef: Function,
}

type WrapperProps = {
  +values: Array<number>,
  +medianValues: Array<number>,
};

class Graph extends React.Component {
  static createGradient(chartInstance) {
    const gradient = chartInstance.ctx.createLinearGradient(0, 0, 0, chartInstance.height);
    gradient.addColorStop(0, 'rgba(156,206,249,0.8)');
    gradient.addColorStop(0.8, 'rgba(156,206,249,0)');
    return gradient;
  }

  constructor(props) {
    super(props);
    this.chart = null;
    this.state = {
      medianBackground: 'transparent',
    };
  }

  componentDidMount() {
    const chartInstance = this.chart.chart_instance;
    this.setState({ medianBackground: Graph.createGradient(chartInstance) }); // eslint-disable-line
  }

  props:WrapperProps
  render() {
    const { values } = this.props;
    const data = {
      labels: Array(values.length).fill().map((_, i) => i),
      datasets: [
        {
          data: values,
          label: 'Value',
          borderColor: '#9ccef9',
          backgroundColor: this.state.medianBackground,
          pointStyle: 'line',
          showLines: false,
        },
      ],
    };
    const options = {
      title: {
        display: false,
        text: 'You got cancur',
      },
      legend: {
        display: false,
      },
      scales: {
        xAxes: [{
          ticks: {
            maxTicksLimit: 10,
            fontColor: '#ccc',
            fontSize: 16,
          },
        }],
        yAxes: [{
          ticks: {
            fontColor: '#ccc',
            fontSize: 16,
          },
        }],
      },
    };
    return (
      <GraphView
        data={data}
        options={options}
        getRef={ref => { this.chart = ref; }}
      />
    );
  }
}

const GraphView = ({ data, options, getRef }: Props) => (
  <Line ref={getRef} data={data} options={options} width={400} height={250} />
);

export default Graph;
