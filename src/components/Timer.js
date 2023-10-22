import React, { useRef, useState } from 'react'
import { ProgressBar } from 'react-bootstrap'
import moment from 'moment';

let timerHandler = null;
let notificationDebounceHandler = null;
const momentObj = moment;

const preSetIncrements = [
  {
    label: '+1',
    value: 1
  },
  {
    label: '+30',
    value: 30
  },
  {
    label: '+60',
    value: 60
  }
]

export default function Timer() {
  const timeFieldRef = useRef();
  const [timeFieldValue, setTimeFieldValue] = useState(momentObj().format("HH:mm"));
  const [progressBarValue, setProgressBarValue] = useState(0);

  const handleChange = (event) => {
    console.log('event.currentTarget.value', event.currentTarget.value)
    setTimeFieldValue(event.currentTarget.value);
    updateTimer(event.currentTarget.value)
  }


  const updateTimer = (selectTimeValue) => {
    const selectedSeconds = momentObj.duration(selectTimeValue).asSeconds()
    const currentTimeInsec = momentObj.duration(momentObj().format("HH:mm")).asSeconds()
    const totalTimeDiffValue = selectedSeconds - currentTimeInsec;
    if (timerHandler) {
      clearInterval(timerHandler)
    };
    updateProgressBar(selectedSeconds, totalTimeDiffValue)
    timerHandler = setInterval(() => {
      updateProgressBar(selectedSeconds, totalTimeDiffValue)
    }, 2000)
  }

  const showNotificationFn = () => {
    clearTimeout(notificationDebounceHandler);
    notificationDebounceHandler = setTimeout(() => {
      window?.electronAPI?.timeUp()
    }, 4000)
  }

  const updateProgressBar = (selectedSeconds, totalTimeDiffValue) => {
    const currentTimeInsec = momentObj.duration(momentObj().format("HH:mm")).asSeconds()
    if (currentTimeInsec >= selectedSeconds) {
      clearInterval(timerHandler);
      showNotificationFn()
    }
    const currentTimeDiffValue = selectedSeconds - currentTimeInsec;
    const value = (currentTimeDiffValue / totalTimeDiffValue)
    const valueInPercent = value * 100;
    console.log('valueInPercent :', valueInPercent)
    setProgressBarValue(100 - valueInPercent)
  }

  const getVarientValue = () => {
    if (progressBarValue <= 60) {
      return "info"
    } else if (progressBarValue > 60 && progressBarValue < 80) {
      return "warning"
    } else {
      return "danger"
    }
  }

  // const resetHandler = () => {
  //   setTimeFieldValue(momentObj().format("HH:mm"))
  //   setProgressBarValue(0)
  //   clearInterval(timerHandler)
  // }

  const addIncrementsHandler = (item) => {
    showNotificationFn()
  }

  return (
    <div>
      <ProgressBar style={{ borderRadius: 0, borderBottom: 'solid rgb(100, 97, 97) 1px' }} animated variant={getVarientValue()} now={progressBarValue} max={100} key={1} className='draggable-div' />
      <div className='d-flex justify-content-center align-items-center border border-bottom'>
        <input
          style={{ display: 'none' }}
          value={timeFieldValue}
          onChange={handleChange}
          ref={timeFieldRef}
          type='time'
        />
        <b
          style={{ margin: 0, cursor: "pointer" }}
          onClick={() => {
            timeFieldRef.current.showPicker()
          }}>
          {timeFieldValue}
        </b>

        {/* <button onClick={resetHandler}>@</button> */}
      </div>

      <div className='d-flex align-items-center increment-group'>
        {preSetIncrements.map((item) => {
          return <button onClick={() => addIncrementsHandler(item)} key={item.label}>{item.label}</button>
        })}
      </div>
    </div>
  )
}
