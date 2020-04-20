import React, { Component } from 'react';
import classes from './Dashboard.module.css';
import LineGraph from '../../components/Dashboard/LineGraph';
import chartIcon from '../../assets/chart-icon.svg';
import Tabletop from 'tabletop';

export default class Dashboard extends Component {
  state = {
    data1: [],
    managerData: [],
    managerQuarterData: [],
    yearLabels: [],
    quarterLabels: [],
    nationalAverageData: [],
    nationalAverageQuarterData: [],
    data: [],
    average: [],
    labels: [],
  };

  handleButtonClick = (e) => {
    const { value } = e.target;
    const isAnnual = value === 'annual';

    const newData = isAnnual
      ? this.state.managerData
      : this.state.managerQuarterData;
    const newLabels = isAnnual
      ? this.state.yearLabels
      : this.state.quarterLabels;
    const newAverage = isAnnual
      ? this.state.nationalAverageData
      : this.state.nationalAverageQuarterData;

    this.setState({
      data: newData,
      average: newAverage,
      labels: newLabels,
    });
  };

  componentDidMount() {
    Tabletop.init({
      key: '1EpRdW3plcwKQn-_UrdC3VPzCvQpoP7zDXj4cfVwGY8s',
      callback: (googleData) => {
        this.setState({
          data1: googleData,
        });
        const arr = this.state.data1;
        const arrLen = arr.length;

        for (let i = 0; i < arrLen; i++) {
          this.state.managerData.push(arr[i]['managerData']);
          this.state.nationalAverageData.push(arr[i]['nationalAverageData']);
          this.state.yearLabels.push(arr[i]['yearLabels']);
          this.state.managerQuarterData.push(arr[i]['managerQuarterData']);
          this.state.nationalAverageQuarterData.push(
            arr[i]['nationalAverageQuarterData']
          );
          this.state.quarterLabels.push(arr[i]['quarterLabels']);
        }
        this.setState({
          data: this.state.managerData,
          average: this.state.nationalAverageData,
          labels: this.state.yearLabels,
        });
      },
      simpleSheet: true,
    });
  }

  render() {
    console.log('updated state --->', this.state);

    const { data, average, labels } = this.state;
    return (
      <div className={classes.container}>
        <header>
          <img src={chartIcon} alt='bar chart icon' />
          <h1>Sales Dashboard</h1>
        </header>

        <div className={classes.buttonContainer}>
          <button value='annual' onClick={this.handleButtonClick}>
            Annual
          </button>

          <button value='lastquarter' onClick={this.handleButtonClick}>
            Last Quarter
          </button>
        </div>

        <LineGraph data={data} average={average} labels={labels} />
      </div>
    );
  }
}
