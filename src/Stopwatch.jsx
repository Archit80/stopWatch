import React, { useState, useEffect, useRef} from "react"


function Stopwatch() {
    const[isRunning, setIsRunning] = useState(false);
    const[timeGone, setTimeGone] = useState(0);
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(0);
   
    useEffect(()=>{
      if(isRunning){
        intervalIdRef.current = setInterval(()=>{
          setTimeGone(Date.now()-startTimeRef.current)
        },1)
      }

      return ()=>{
        clearInterval(intervalIdRef.current);
      }

    },[isRunning]);

    function Start(){
      setIsRunning(true);
      startTimeRef.current = Date.now() - timeGone;
    }

    function Stop(){
      setIsRunning(false);
    }

    function Reset(){
      setTimeGone(0);
      setIsRunning(false);
    }

    function padZero(num){
      if(num<10){
        return "0"+num;
      }
      else{
        return num;
      }
    }

   
    


      let hrs = Math.floor(timeGone/(1000*60*60));
      let min = Math.floor(
        timeGone/(1000*60)
      );
      let sec = Math.floor(
        timeGone/(1000)
      );

      let mili = timeGone%1000;

      


  return (
    <div className="h-screen w-screen flex justify-center items-center text-white bg-[#EDE2CA] ">
      <div className="stopwatch border-4 p-8 rounded-3xl border-neutral w-1/2 flex justify-center items-center flex-col ">
        <div className="display  justify-center text-8xl mb-8 font-mono font-bold text-neutral flex">{padZero(hrs)}:{padZero(min)}:{padZero(sec)}:<div className= " text-8xl mb-8 font-mono bg-transparent justify-start w-40 font-bold text-neutral flex">{padZero(mili)}</div>
        </div>  

        <div className="controls flex justify-center gap-4 text-xl">
          <button className='start-button btn btn-primary px-8 text-xl' onClick={Start}>Start</button>
          <button className='stop-button btn btn-accent px-8 text-xl' onClick={Stop}>Stop</button>
          <button className='reset-button btn btn-secondary px-8 text-xl' onClick={Reset}>Reset</button>
        </div>
      </div>
    </div>
  
  )
}

export default Stopwatch