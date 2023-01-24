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
/* type TDot = {
  x:number,
  y:number
} */
function App() {
  const [count, setCount] = useState(1)
  const[stuff, setStuff] = useState<Thingy[]>([])
  const[popped, setPopped] = useState<Thingy[]>([])

  const colors: string[] = [ "#faa6ff", "#7353ba", "#2f195f", "#0f1020", "#efc3f5", "#ADBCA5", "#E8B9AB", "#E09891", "#8C5F66", "#D9BBF9", "#CCA7A2", "#AA9FB1", "#7871AA", "#4E5283", "#668586", "#A7ACD9", "#9E8FB2", "#82AEB1", "#5F5980" ]
  
  const fetchColor = () => colors[Math.floor(Math.random()*colors.length)]
  let randomColor2: string, randomColor : string, lastColor: string

  const popThingy = () => {
    // if (count<=1) return
    const tempStuff = [...stuff]
    const lastThingie = tempStuff.pop()
    if(!lastThingie) return
    setPopped([...popped, lastThingie])
    setStuff(tempStuff)
    setCount(() => (count-1) )
  }

  const placeThingy = (e: React.MouseEvent<HTMLDivElement>) => {
    const {clientX, clientY} = e
    setCount(() => (count+1) )
    let randomColor2 = fetchColor()
    do {
      randomColor = fetchColor()
      console.log("colors:", randomColor, randomColor2)
      lastColor==randomColor && console.log(lastColor==randomColor)
    } while (lastColor==randomColor);
    lastColor = randomColor
    const tempPopped = [...popped]
    tempPopped.pop()
    setPopped(tempPopped)
    setStuff([...stuff, {x: clientX, y: clientY, itemNr: count, size: count, color: randomColor, textColor: randomColor2}])
  }  

  const redoThingy = () => {
    if (!popped[0]) return
    const poppedThingie = popped[popped.length-1]
    setStuff([...stuff, poppedThingie])
    let poppedArray = [...popped]
    poppedArray.pop()
    setPopped(poppedArray)
    setCount(() => (count+1) )
  }

  const clearAll = () => {
  setStuff([])
  setPopped([])
  setCount(1)
  }

  return (
    <>
      <div className='top-section'>
        <div className='buttons'>
          <button className='button' onClick={clearAll}>Clear</button>
          <button className='button' onClick={popThingy} disabled = {count <=1}>Undo</button>
          <button className='button' onClick={redoThingy} disabled = {popped.length===0}>Redo</button>
        </div>
        <h3>Click anywhere</h3>
        <h5>Then you can undo the mess</h5>
      </div>
    
      <div className="App" onClick={placeThingy}>
        <div className="card">
          <div className ="stuff" onClick={placeThingy} style = {{zIndex:"10"}}>
            {stuff.map((thingy) => <div key= {thingy.itemNr}  id = "thingy" style = {{ backgroundColor: thingy.color,
            color: randomColor2,  borderRadius: 5+count*2,
            width: 10+thingy.size*4, height: 10+thingy.size*4, left: thingy.x-thingy.size*2,
            top: thingy.y-thingy.size*2, }}>{thingy.itemNr}</div>)}
            {count===10&& <h1 style={{marginTop:"0px"}} >It's going to take some time</h1>}
            {count>30&&count<=32&& <h1>You know it's going to occupy the whole screen eventually, right?</h1>}
          </div>
        </div>
      </div>
    </>
  )
}

export default App