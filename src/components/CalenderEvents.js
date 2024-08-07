import React, { useEffect, useState } from 'react'
import constants from '../utils/constants';
import moment from 'moment';
import { truncateString } from '../helper';

let timerControl = null;

function CalenderEvents() {
  const [currentEvent, setCurrentEvent] = useState('')
  const [nextEvent, setNextEvent] = useState('')

  /*
    1. call the api get the events list
    2. Calculate the current event
    3. Calculate the next event
  */

  const calculateEvents = (events = []) => {
    let currentEventValue = ''
    let nextEventValue = ''
    const currentTime = moment()

    for (let i = 0; i < events.length; i++) {
      const start = moment(events[i].start);
      const end = moment(events[i].end);

      if (currentTime.isBetween(start, end)) {
        currentEventValue = events[i];

        if (i + 1 < events.length) {
          nextEventValue = events[i + 1];
        }
        break;
      } else if (currentTime.isBefore(start)) {
        nextEventValue = events[i];
        break;
      }
    }
    setCurrentEvent(currentEventValue)
    setNextEvent(nextEventValue)
  }

  const getEvents = () => {
    const path = 'http://localhost:37109'
    return fetch(path)
      .then(resp => resp.json())
      .then(events => {
        console.log('events==>', events)
        calculateEvents(events)
      })
  }

  useEffect(() => {
    const fiveMinutes = 5 * 60 * 1000;
    getEvents()
    if (timerControl) clearInterval(timerControl)
    timerControl = setInterval(() => {
      getEvents()
    }, fiveMinutes)
    return () => {
      if (timerControl) clearInterval(timerControl)
      return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])




  const displayCurrentEvent = () => {
    if (currentEvent) {
      const currentEventStart = moment(currentEvent.start).format("hh:mm A")
      const currentEventEnd = moment(currentEvent.end).format("hh:mm A")
      const currentEventSubject = currentEvent.subject
      return <div style={{ backgroundColor: '#d1ebd2', height: '15px', overflow: 'hidden' }}>
        {currentEventStart}-{currentEventSubject}
      </div>
    }
    return <div>No current event</div>
  }


  const displayNextEvent = () => {
    if (nextEvent) {
      const nextEventStart = moment(nextEvent.start).format("hh:mm A")
      const nextEventEnd = moment(nextEvent.end).format("hh:mm A")
      const nextEventSubject = nextEvent.subject
      return <div style={{ backgroundColor: 'lightyellow', height: '15px', overflow: 'hidden' }}>
        {nextEventStart}-{nextEventSubject}
      </div>
    }
    return <div>No next event</div>
  }

  return (
    <div style={{ fontSize: '8px', fontWeight: '900' }}>
      {displayCurrentEvent()}
      {displayNextEvent()}
    </div>
  )
}

export default CalenderEvents