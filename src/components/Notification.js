import React from 'react';


function Notification() {

  const clearNotification = () =>{
    window?.electronAPI?.clearNotification()
  }


  return (
    <div className='d-flex flex-column justify-content-around align-items-center bg-dark'>
      <img src='images/alarm.gif' alt='ssss' height="80px" className=' draggable-div' />
      <button className='border' style={{
        border: 'none',
        width: '100%',
        backgroundColor: 'grey'
      }} onClick={clearNotification}>OK</button>
    </div>
  )
}

export default Notification