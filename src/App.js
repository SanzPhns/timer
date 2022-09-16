import './App.css';
import React, { useEffect, useState } from 'react';

function App(){
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);

  useEffect(()=>{
    let interval = null;
    console.log('mounting');

    if (isActive && isPaused === false){
      interval = setInterval(()=>{
        setTime(time => time + 10)
      },10);
    }else{
      clearInterval(interval)
    }
    return ()=>{
      console.log('unmounting');
      clearInterval(interval)
    }
  }, [isActive, isPaused]);
 
  const handleStart = ()=>{
     setIsActive(true)
     setIsPaused(false)
  }
  const handleStartStop = ()=>{
     setIsPaused(!isPaused)
  }
  const handleReset = ()=>{
     setTime(0)
     setIsActive(false)
  }
  return(
    <div className='wrapper'>
       <Timer time = {time}/>
       <ControlButtons 
         isActive = {isActive}
         isPaused = {isPaused}
         handleStart = {handleStart}
         handleStartStop = {handleStartStop}
         handleReset = {handleReset}
       />
    </div>
  );
}

const Timer = (props)=>{

 function padZero(t){
   return t < 10 ? '0'+t : ''+t;
 }

 let milliSeconds = props.time;
 let newTime = new Date(milliSeconds);

 let totalSeconds = Math.floor(milliSeconds/1000);
 let minutes = padZero(Math.floor(totalSeconds/60));
 milliSeconds = padZero(newTime.getMilliseconds()/10 | 0);
 let seconds = padZero(newTime.getSeconds());

 let output = `${minutes}:${seconds}:${milliSeconds}`;

 return(
   <div className='displayTime'>
     {output}
   </div>
 );
}

const ControlButtons = (props)=>{
 
  const staticButton = 
    <>
      <button onClick={props.handleStart} className='startButton'>
        Start
      </button>
      <button onClick={props.handleReset} disabled>
        Reset
      </button>
    </>
  
  const activeButton =
  <>
    {props.isPaused? 
      <button onClick={props.handleStartStop} className='startButton'>
      Start
      </button>
      :<button onClick={props.handleStartStop} className='stopButton'>
      Stop
      </button>
    }
    <button onClick={props.handleReset}>
        Reset
    </button>
    </>
    
  return(
   <div className='controlButtons'>
     {props.isActive? activeButton: staticButton}
   </div>
 );
}

export default App;