import './App.css';
import React, { useState, useEffect } from 'react'

function App() {
  const [currentMode, setMode] = useState('Session');
  const [sessionLength, setSession] = useState(new Date(1500000));
  const [breakLength, setBreak] = useState(300000);
  return (
    <div className="App">
      <div id="main-title">25 + 5 Clock</div>
      <div className="length-container">
        <div>
          <div id="break-label">Break Length</div> <div className="ctl">
          <div id="break-decrement" >
              <i className="fas fa-arrow-down"></i>
            </div>
            <div id="break-length"></div>
            <div id="break-increment" >
              <i className="fas fa-arrow-up"></i>
            </div>
          </div>
        </div>
        <div>
          <div id="session-label">Session Length</div>
          <div className="ctl">
            <div id="session-decrement" >
              <i className="fas fa-arrow-down"></i>
            </div>
            <div id="session-length"></div>
            <div id="session-increment">
              <i className="fas fa-arrow-up"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="timer">
        <div id="timer-label">{currentMode}</div>
    <div id="time-left">{currentMode === 'Session' ? `${sessionLength.getMinutes()}:${sessionLength.getSeconds()}` : breakLength}</div>
      </div>
      <div className="control">
        <button id="start_stop">
          <i className="fas fa-play"></i>
          <i className="fas fa-pause"></i>
        </button>
        <div id="reset">
          <i className="fas fa-sync-alt"></i>
        </div>
      </div>
    </div>
  );
}

export default App;
