import { useRef, useState, ChangeEvent } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ProgressBar } from 'react-bootstrap';
import './App.css';
import moment from 'moment';

const momentObj = moment;

function Success() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: '100vh', flexDirection: 'column' }}
    >
      <div className="icon ringing-bell">🔔</div>
      <div>Success</div>
      <button
        type="button"
        onClick={() => {
          window.electron.ipcRenderer.closeSuccessWindow();
        }}
        className="mt-4 btn btn-primary"
      >
        Close
      </button>
    </div>
  );
}

function Hello() {
  const timeFieldRef = useRef<HTMLInputElement>(null);
  const [timeFieldValue, setTimeFieldValue] = useState(
    momentObj().format('HH:mm'),
  );
  const [progressBarValue, setProgressBarValue] = useState(0);
  const getVariantValue = () => {
    if (progressBarValue <= 60) {
      return 'info';
    }
    if (progressBarValue > 60 && progressBarValue < 80) {
      return 'warning';
    }
    return 'danger';
  };

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const updateProgressBar = (
    selectedSeconds: number,
    totalTimeDiffValue: number,
  ) => {
    const currentTimeInSeconds = momentObj
      .duration(momentObj().format('HH:mm'))
      .asSeconds();
    if (currentTimeInSeconds >= selectedSeconds) {
      if (timerRef.current) clearInterval(timerRef.current);
      // showNotificationFn() // TODO: Define showNotificationFn
    }
    const currentTimeDiffValue = selectedSeconds - currentTimeInSeconds;
    const value = currentTimeDiffValue / totalTimeDiffValue;
    const valueInPercent = value * 100;
    console.log('valueInPercent', valueInPercent);
    if (valueInPercent <= 0) {
      window.electron?.ipcRenderer.openSuccessWindow();
      if (timerRef.current) clearInterval(timerRef.current);
    }
    setProgressBarValue(100 - valueInPercent);
  };

  const updateTimer = (selectTimeValue: string) => {
    const selectedSeconds = momentObj.duration(selectTimeValue).asSeconds();
    const currentTimeInSeconds = momentObj
      .duration(momentObj().format('HH:mm'))
      .asSeconds();
    const totalTimeDiffValue = selectedSeconds - currentTimeInSeconds;
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    updateProgressBar(selectedSeconds, totalTimeDiffValue);
    timerRef.current = setInterval(() => {
      console.log('currentTimeInSeconds', currentTimeInSeconds);
      updateProgressBar(selectedSeconds, totalTimeDiffValue);
    }, 2000);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTimeFieldValue(event.currentTarget.value);
    updateTimer(event.currentTarget.value);
  };

  return (
    <div>
      <ProgressBar
        style={{ borderRadius: 0, borderBottom: 'solid rgb(100, 97, 97) 1px' }}
        animated
        variant={getVariantValue()}
        now={progressBarValue}
        max={100}
        key={1}
        className="draggable-div"
      />
      <div className="d-flex justify-content-center align-items-center border border-bottom">
        <input
          style={{ display: 'none' }}
          value={timeFieldValue}
          onChange={handleChange}
          ref={timeFieldRef}
          type="time"
        />
        <b
          style={{ margin: 0, cursor: 'pointer' }}
          role="button"
          tabIndex={0}
          onClick={() => {
            timeFieldRef.current?.showPicker();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              timeFieldRef.current?.showPicker();
            }
          }}
        >
          {timeFieldValue}
        </b>

        {/* <button onClick={resetHandler}>@</button> */}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
}
