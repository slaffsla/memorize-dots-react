import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

interface Thingy {
  x: number;
  y: number;
  itemNr: number;
  size: number;
  color: string;
  textColor: string
}

type dot = {
  x:number,
  y:number
}

function App() {
  const [count, setCount] = useState(1)

  const[stuff, setStuff] = useState<Thingy[]>([])
  let poppedArray: Thingy[] = []

  const colors: string[] = [ "#faa6ff", "#7353ba", "#2f195f", "#0f1020", "#efc3f5", "#ADBCA5", "#E8B9AB", "#E09891", "#8C5F66", "#D9BBF9", "#CCA7A2", "#AA9FB1", "#7871AA", "#4E5283", "#668586", "#A7ACD9", "#9E8FB2", "#82AEB1", "#5F5980" ]
  
  const fetchColor = () => colors[Math.floor(Math.random()*colors.length)]
  //const randomColor = fetchColor()
  let randomColor2: string, randomColor : string, lastColor: string
  let maxCount: number = 0

  const popThingy = () => {
    // if (count<=1) return
    const lastThingie = stuff[stuff.length-1]
    console.log("lastThingie: ",lastThingie)
    poppedArray.push(lastThingie)
    poppedArray.push(lastThingie)
    console.log("poppedArray:", poppedArray)
    let stuffArray = stuff
    stuffArray.pop()
    setStuff(stuffArray)
    setCount(count-1)
  }

  const redoThingy = () => {
    console.log(poppedArray)
    const lastItem = poppedArray?.pop
    //setStuff([...stuff, lastItem])
    setCount(count+1 )

  }
  const clearAll = () => {
  setStuff([])
  setCount(1)
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const {clientX, clientY} = e
    setCount(() => (count+1) )
    let randomColor2 = fetchColor()
    do {
      randomColor = fetchColor()
      console.log("colors:", randomColor, randomColor2)
    }
    while (lastColor==randomColor);
    lastColor = randomColor
    setStuff([...stuff, {x: clientX, y: clientY, itemNr: count, size: count, color: randomColor, textColor: randomColor2}])
  }  

  return (
    <>
      <div className='top-section'>
        <div className='buttons'>
          <button className='button' onClick={clearAll}>Clear</button>
          <button className='button' onClick={popThingy} disabled = {count <=1}>Undo</button>
          <button className='button' onClick={redoThingy} disabled = {count == maxCount}>Redo</button>
        </div>
        <h3>Click anywhere</h3>
        <h5>Then you can undo the mess</h5>
      </div>
    
      <div className="App" onClick={handleClick}>
        <div className="card">
          <div className ="stuff" onClick={handleClick} style = {{backgroundColor:"red"}}>
            {stuff.map((thingy) => <div key= {thingy.itemNr} onClick={e => {
              if (e.detail === 1) {popThingy}
              if (e.detail === 2) {popThingy}
            }} id = "thingy" style = {{ backgroundColor:thingy.color,
            color: randomColor2,  borderRadius: count*2,
            width: thingy.size*4, height: thingy.size*4, left: thingy.x-thingy.size*2,
            top: thingy.y-thingy.size*2, }}>{thingy.itemNr}</div>)}
            {count===10&& <h1>It's going to take some time</h1>}
            {count>30&&count<=32&& <h1>You know it's going to occupy the whole screen eventually, right?</h1>}
            <h1>{poppedArray[0]?.itemNr}</h1>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
