import React, { Component } from 'react';
import './Metronome.css';

import click1 from './click1.wav';
import click2 from './click2.wav';

class Metronome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bpm: 100,
      isStarted: false,
      count: 0,
      beatsPerMeasure: 4,
    };

    this.click1 = new Audio(click1);
    this.click2 = new Audio(click2);
  }

  playClick = () => {
    const { count, beatsPerMeasure } = this.state;
    if (count % beatsPerMeasure === 0) {
      this.click2.play();
    } else {
      this.click1.play();
    }

    this.setState((state) => ({
      count: (state.count + 1) % state.beatsPerMeasure,
    }));
  }

  handleBpmChange = (event) => {
    const bpm = event.target.value;
    if (this.state.isStarted) {
      clearInterval(this.handler);
      this.handler = setInterval(this.playClick, (60 / bpm) * 1000);

      this.setState({ 
        count: 0,
        bpm 
      });
    } else {
      this.setState({ bpm });
    }
  }

  startStop = () => {
    if (this.state.isStarted) {
      clearInterval(this.handler);
      this.setState({
        isStarted: false,
      });
    } else {
      this.handler = setInterval(this.playClick, (60 / this.state.bpm) * 1000 );
      this.setState({
        count: 0,
        isStarted: true,
      }, this.playClick);
    }
  }

  render() {
    const { isStarted, bpm } = this.state;

    return (
      <div className="metronome">
        <div className="bpm-slider">
          <div>{bpm}</div>
          <input type="range" min="60" max="240" value={bpm} onChange={this.handleBpmChange} />
        </div>
        <button onClick={this.startStop}>{isStarted ? 'Stop' : 'Start'}</button>
      </div>
    )
  }
}

export default Metronome;