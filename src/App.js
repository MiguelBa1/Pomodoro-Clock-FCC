import './App.css';
import React, { useState, useEffect, useRef } from 'react'

function App() {
  const [currentMode, setMode] = useState('Session');
  const [sessionLength, setSession] = useState(25);
  const [breakLength, setBreak] = useState(5);
  const [active, setActive] = useState(false);
  const [sessionTimer, setSTimer] = useState(sessionLength*60)
  const [breakTimer, setBTimer] = useState(breakLength*60)
  let audioElem = useRef(null)
  let myInterval = useRef(null)

  useEffect(() => {
    if (active) {
      if (currentMode === 'Session') {
        myInterval.current = setInterval(() => {
          setSTimer(prev => prev-1)
        }, 1000)
      } else if (currentMode === 'Break') {
        myInterval.current = setInterval(() => {
          setBTimer(prev => prev-1)
        }, 1000)
      }
    }
    return (() => {
      clearInterval(myInterval.current)
    })
  }, [active, currentMode])

  function handleLenghtBreak(e) {
    if (!active) {
      const direction = e.target.dataset.sign
      if (direction === '-' && breakLength > 1) {
        setBreak(prevValue => {
          setBTimer((prevValue - 1)*60)
          return prevValue - 1
        })
      } else if (direction === '+' && breakLength < 60) {
        setBreak(prevValue => {
          setBTimer((prevValue + 1)*60)
          return prevValue + 1
        })
      }

    }
  }

  function handleLenghtSession(e) {
    if (!active) {
      const direction = e.target.dataset.sign
      if (direction === '-' && sessionLength > 1) {
        setSession(prevValue => {
          setSTimer((prevValue - 1)*60)
          return prevValue - 1
        })
      } else if (direction === '+' && sessionLength < 60) {
        setSession(prevValue => {
          setSTimer((prevValue + 1)*60)
          return prevValue + 1
        })
      }
    }
  }

  function start() {
    setActive(prev => {
      return(!prev)
    })
  }
  
  function reset() {
    setActive(false)
    setMode('Session')
    setSession(25)
    setBreak(5)
    setSTimer(25*60)
    setBTimer(5*60)
    audioElem.current.pause()
    audioElem.current.currentTime = 0
  }

  function manageTime(totSeconds) {
    if (totSeconds === -1 && currentMode ==='Session') {
      setMode('Break')
      setSTimer(sessionLength*60)
      audioElem.current.play()
    }  
    if (totSeconds === -1 && currentMode ==='Break') {
      setMode('Session')
      setBTimer(breakLength*60)
      audioElem.current.play()
    }  
    return displayTime(totSeconds)
  }
  
  function displayTime(totSeconds) {
    let minutes = parseInt(totSeconds / 60).toString()
    totSeconds = (totSeconds % 60).toString()
    minutes = minutes.length > 1 ?
      `${minutes}` :
      `0${minutes}`
    let seconds = totSeconds.length > 1 ?
      `${totSeconds}` :
      `0${totSeconds}`
    return `${minutes}:${seconds}`
  }

  return (
    <div className="App">
      <div id="main-title">25 + 5 Clock</div>
      <div className="length-container">
        <div>
          <div id="break-label">Break Length</div>
          <div className="ctl">
            <button id="break-decrement" onClick={handleLenghtBreak} data-sign='-'>
              <i className="fas fa-arrow-down" data-sign='-'></i>
            </button>
            <div id="break-length">{breakLength}</div>
            <button id="break-increment" onClick={handleLenghtBreak} data-sign='+'>
              <i className="fas fa-arrow-up" data-sign='+'></i>
          </button>
        </div>
      </div>
      <div>
        <div id="session-label">Session Length</div>
          <div className="ctl">
            <button id="session-decrement" onClick={handleLenghtSession} data-sign='-'>
              <i className="fas fa-arrow-down"data-sign='-'></i>
            </button>
            <div id="session-length">{sessionLength}</div>
            <button id="session-increment" onClick={handleLenghtSession} data-sign='+'>
              <i className="fas fa-arrow-up" data-sign='+'></i>
            </button>
          </div>
        </div>
      </div>
      <div className="timer">
        <div id="timer-label">{currentMode}</div>
      <div id="time-left">{
        currentMode === 'Session' ?
        manageTime(sessionTimer) :
        manageTime(breakTimer)
      }
      </div>
      </div>
      <div className="control">
        <button id="start_stop" onClick={start}>
          <i className="fas fa-play"></i>
          <i className="fas fa-pause"></i>
        </button>
        <button id="reset" onClick={reset}>
          <i className="fas fa-sync-alt"></i>
        </button>
      </div>
      <audio src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" id="beep" ref={audioElem}></audio>
    </div>
  );
}

export default App;
