import React, { useEffect, useRef, useState } from 'react'
import { ProgressBar } from 'react-bootstrap'
import moment from 'moment';

let timerHandler = null;
const momentObj = moment;

const preSetIncrements = [
  {
    label: '+1',
    value: 1
  },
  {
    label: '+5',
    value: 5
  },
  {
    label: '+20',
    value: 20
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


  useEffect(() => {
    if (timeFieldValue) {
      updateTimer()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeFieldValue])

  const handleChange = (event) => {
    console.log('event.currentTarget.value', event.currentTarget.value)
    setTimeFieldValue(event.currentTarget.value)
  }

  const updateTimer = () => {
    const selectedSeconds = momentObj.duration(timeFieldValue).asSeconds()
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

  const updateProgressBar = (selectedSeconds, totalTimeDiffValue) => {
    const currentTimeInsec = momentObj.duration(momentObj().format("HH:mm")).asSeconds()
    if (currentTimeInsec >= selectedSeconds) {
      clearInterval(timerHandler)

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

  const resetHandler = () => {
    setTimeFieldValue(momentObj().format("HH:mm"))
    setProgressBarValue(0)
    clearInterval(timerHandler)
  }

  const addIncrementsHandler = (item) => {

  }

  return (
    <div>
      <ProgressBar style={{ borderRadius: 0, border: 'solid black 1px' }} animated variant={getVarientValue()} now={progressBarValue} max={100} key={1} />
      <div className='d-flex justify-content-center align-items-center'>
        <input
          style={{ display: 'none' }}
          value={timeFieldValue}
          onChange={handleChange}
          ref={timeFieldRef}
          type='time'
        />
        <p
          className='flex-grow-1 bg-light h-100'
          style={{ margin: 0, cursor: "pointer" }}
          onClick={() => {
            timeFieldRef.current.showPicker()
          }}>{timeFieldValue}</p>

        <button onClick={resetHandler}>@</button>
      </div>
      <div className='d-flex align-items-center increment-group'>
        {preSetIncrements.map((item) => {
          return <button onClick={() => addIncrementsHandler(item)} key={item.label}>{item.label}</button>
        })}
      </div>
    </div>
  )
}
