import React, { useState, useEffect } from "react";
import Die from "./Die";

export default function App() {
      const [dices, setDices] = useState(allnewDices())
      const [tenzies, setTenzies] = useState(false)
      const [isWin, setIsWin] = useState(false)
      const [isStart, setIsStart] = useState(true)
      let [sec, setSec] = useState(window.innerWidth >= 1000 ? 30 : 20)
      let [runing, setRuning] = useState(false)
      let [wins, setWins] = useState(0)
      let [losts, setLosts] = useState(0)
      let allDiceheld;
      let allSamevlaue;
      let className = '';

      function generatorNewDice() {
            return {
                  value: Math.ceil(Math.random() * 10), isHeld: false, id: Math.ceil(Math.random() * 10000)
            }
      }

      useEffect(function () {
            allDiceheld = dices.every(dice => dice.isHeld === true)
            const firstDice = dices[0].value
            allSamevlaue = dices.every(dice => dice.value == firstDice)

            if (allDiceheld && allSamevlaue) {
                  setWins(pre => pre + 1);
                  setTenzies(true)
                  setRuning(false)
                  setIsWin(true)
                  setTimeout(() => {
                        alert('You Win! 🔥')
                  }, 50);
                  window.innerWidth >= 1000 ? setSec(30) : setSec(20)
            }
      }, [dices])

      function setRollDice() {
            setRuning(true)
            setDices(allnewDices())
            setTenzies(false)
            window.innerWidth >= 1000 ? setSec(30) : setSec(20)
            setIsWin(false)
            setIsStart(false)
      }

      function allnewDices() {
            let newDice = []
            for (let i = 1; i <= 10; i++) {
                  newDice.push(generatorNewDice())
            }
            return newDice
      }

      function rollDice() {
            setDices(oldDices => oldDices.map(dice => {
                  return dice.isHeld ? dice : generatorNewDice()
            }))
      }

      function HoldDice(id) {
            setDices(oldDices => oldDices.map(dice => {
                  return dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice
            })
            )
      }

      const dice = dices.map(dice => {
            return <Die die={dice.value}
                  click={() => HoldDice(dice.id)}
                  isheld={dice.isHeld} key={dice.id}
                  isStart={isStart}
                  sec={sec}
                  isWin={isWin}/>
      })

      if (sec === 0) {
            className = 'DiceLost'
      }

      if (isWin) {
            className = 'DiceWin'
      }

      useEffect(function () {
            if (runing) {
                  const interval = setInterval(() => {
                        setSec(pre => pre - 1)
                  }, 1000);
                  return () => clearInterval(interval)
            }
      }, [runing])

      useEffect(function () {
            if (sec == 0) {
                  setLosts(pre => pre + 1);
                  setRuning(false)
                  setTimeout(() => {
                        alert('You Lost! 😁')
                  }, 50);

            }
      }, [sec])


      return (
            <main className={className}>
                  <div className="results">
                        <div className="wins result">Wins: {wins}</div>
                        <p className="time">00:{sec < 10 ? 0 : ''}{sec}</p>
                        <div className="losts result">Fails: {losts}</div>
                  </div>
                  <div>
                        <h2>Random Match Game!</h2>
                        <p>Roll until all dices are the same.
                              Click each die to freeze it at its current value between rolls.</p>
                        <div className="dic-container">
                              {dice}
                        </div>
                  </div>
                  {tenzies || sec == 0 ?
                        <button onClick={setRollDice} className="btnroll">New Game</button> :
                        <div>
                              {isStart ?
                                    <button onClick={setRollDice} className="btnroll">Start Game</button> :
                                    <button onClick={rollDice} className="btnroll">Roll</button>
                              }
                        </div>
                  }
            </main>
      )
}