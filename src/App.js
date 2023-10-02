import React from 'react'
import './App.css';
import Timer from './components/Timer';
import Notification from './components/Notification';
import constants from './utils/constants';

function App() {
  const params = new URLSearchParams(window.location.search);
  console.log('params: ', window.location)
  const windowType = params.get('windowType');
  console.log("============windowType======", windowType)
  if (windowType === constants.TIMER_TYPE) {
    return <Timer />
  } else if (windowType === constants.NOTIFICATION_TYPE) {
    return <Notification />
  }
  return <>Default</>
}

export default App;
