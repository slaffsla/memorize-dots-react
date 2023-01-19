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
  let randomColor2: string, randomColor : string
  let lastColor: string

  const popThingy = () => {
    const lastThingie = stuff[stuff.length-1]
    poppedArray.push(lastThingie)
    console.log(poppedArray)
    let stuffArray = stuff
    stuffArray.pop()
    setStuff(stuffArray)
   /*  setStuff(
      stuff.map((thingy) => {(
          thingy
        //(lastThingie.itemNr !== thingy.itemNr)&&thingy
      /* stuff.map((thingy) => (
        (lastThingie.itemNr !== thingy.itemNr)&&thingy
      )) */
      }
       
/*     const undoThingie = () =>{
      const thingiesArray = () => stuff.map((thingie) => thingie)
      console.log("thingiesArray",thingiesArray)
    }
    poppedArray.push(stuff[stuff.length-1])
  } */

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const {clientX, clientY} = e
    setCount(() => (count+1) )
    let randomColor2 = fetchColor()
    do {
      randomColor = fetchColor()
    }
    while (lastColor===randomColor);
    lastColor = randomColor
    console.log(randomColor, randomColor2)
    setStuff([...stuff, {x: clientX, y: clientY, itemNr: count, size: count, color: randomColor, textColor: randomColor2}])
  }  

  return (
    <>
      <div>
          <h3>Click anywhere</h3>
        </div>
        <h2>Then you can undo the mess</h2>
        <button className='button' onClick={popThingy}>Undo</button>
        <button className='button' onClick={popThingy}>Undo</button>
      <div className="App" onClick={handleClick}>
        <div className="card">
        {/*  <button className='button' onClick={undoThingie}>Undo</button> */}
          <div className ="stuff" onClick={handleClick}>
            {stuff.map((thingy) => <div onDoubleClick={popThingy} key= {thingy.itemNr} id = "thingy" style = {{ backgroundColor:thingy.color,
            color: randomColor2,  borderRadius: count*2,
            width: thingy.size*4, height: thingy.size*4, left: thingy.x-thingy.size*2,
            top: thingy.y-thingy.size*2, }}>{thingy.itemNr}</div>)}
            {count===10&& <h1>It's going to take some time</h1>}
            {count>30&&count<=32&& <h1>You know it's going to occupy the whole screen eventually, right?</h1>}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
