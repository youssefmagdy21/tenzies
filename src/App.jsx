import { useEffect, useState } from "react";
import Dice from "./components/Dice";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
// import { useWindowSize } from "react-use";

export default function App() {
  // const { width, height } = useWindowSize();
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function allNewDice() {
    const arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push({
        value: getRandomNumber(1, 6),
        isHeld: false,
        id: nanoid(),
      });
    }
    return arr;
  }
  function generateNewDice() {
    setDice((prevDice) => {
      return prevDice.map((ele) => {
        return ele.isHeld
          ? { ...ele }
          : {
              value: getRandomNumber(1, 6),
              isHeld: false,
              id: nanoid(),
            };
      });
    });
  }
  function holdDice(id) {
    setDice((prevDice) => {
      return prevDice.map((ele) => {
        return ele.id === id ? { ...ele, isHeld: !ele.isHeld } : { ...ele };
      });
    });
  }
  function resetGame() {
    setTenzies(false);
    setDice(allNewDice());
  }
  const [dice, setDice] = useState(allNewDice());
  const diceElements = dice.map((ele) => {
    return (
      <Dice
        key={ele.id}
        value={ele.value}
        isHeld={ele.isHeld}
        id={ele.id}
        holdDice={holdDice}
      />
    );
  });

  const [tenzies, setTenzies] = useState(false);
  useEffect(() => {
    const isWon = dice.every((ele, index, arr) => {
      return ele.isHeld && ele.value === arr[(index + 1) % arr.length].value;
    });
    if (isWon) {
      setTenzies(true);
    }
  }, [dice]);

  return (
    <main className=" bg-primary w-full min-h-screen flex items-center justify-center font-bold">
      {tenzies ? <Confetti /> : null}
      <div className=" bg-secondary w-80 h-80 rounded-xl flex items-center justify-evenly flex-col">
        <h1 className="text-2xl text-primaryFont">Tenzies</h1>
        <p className=" text-secondaryFont text-sm text-center font-inter font-normal max-w-[15rem]">
          {tenzies
            ? "🥳🥳 YOU WON!! 🥳🥳"
            : "Roll until all dice are the same. Click each die to freeze it at its current value between rolls."}
        </p>
        <div className="grid grid-cols-5 gap-5">{diceElements}</div>
        <button
          className=" bg-[#5035FF] text-white text-center w-24 h-9 rounded shadow-md"
          onClick={tenzies ? resetGame : generateNewDice}
        >
          {tenzies ? "New Game" : "Roll"}
        </button>
      </div>
    </main>
  );
}
