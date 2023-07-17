import React, { useState } from 'react'
import { Form, ProgressBar } from 'react-bootstrap'
import moment from 'moment';

let timerHandler = null;
const momentObj = moment;

export default function Timer() {
  const [timeFieldValue, setTimeFieldValue] = useState(momentObj().format("HH:mm"));
  const [progressBarValue, setProgressBarValue] = useState(0);

  const handleChange = (event) => {
    setTimeFieldValue(event.currentTarget.value)
    console.log('event.currentTarget.value', event.currentTarget.value)
    const selectedSeconds = momentObj.duration(event.currentTarget.value).asSeconds()
    const currentTimeInsec = momentObj.duration(momentObj().format("HH:mm")).asSeconds()
    const totalTimeDiffValue = selectedSeconds - currentTimeInsec;
    updateTimer(selectedSeconds, totalTimeDiffValue)
  }

  const updateTimer = (selectedSeconds, totalTimeDiffValue) => {
    console.log('timerHandler==>', timerHandler)
    if (timerHandler) {
      clearInterval(timerHandler)
    };

    timerHandler = setInterval(() => {
      const currentTimeInsec = momentObj.duration(momentObj().format("HH:mm")).asSeconds()
      const currentTimeDiffValue = selectedSeconds - currentTimeInsec;
      const value = (currentTimeDiffValue / totalTimeDiffValue)
      const valueInPercent = value * 100;
      setProgressBarValue(100 - valueInPercent)
      if (valueInPercent <= 0) {
        clearInterval(timerHandler)
      }
    }, 2000)
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

  return (
    <div>
      <ProgressBar style={{ borderRadius: 0 }} animated variant={getVarientValue()} now={progressBarValue} max={100} key={1} />
      <Form>
        <Form.Control
          value={timeFieldValue}
          type="time"
          required
          onChange={handleChange} />
      </Form>
    </div>
  )
}
