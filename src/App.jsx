import { useEffect, useRef, useState } from 'react';
import './App.css'
import PlayGround from './components/PlayGround';

import { IoPlayOutline } from "react-icons/io5";
import { IoPauseOutline } from "react-icons/io5";
import { RiResetRightLine } from "react-icons/ri";

export default function App() {

    const [level, setLevel] = useState(1);
    const [score, setScore] = useState(0);
    const [runGame, setRunGame] = useState(false);
    const [resetGame, setResetGame] = useState(false);

    const increaseScoreBy = (addScore) => {
        setScore(prev => {
            const newScore = prev + addScore;

            if (Math.floor((newScore / 500)) !== Math.floor((prev / 500))) {
                setLevel(prev => {
                    console.log(prev + 1)
                    return (prev + 1)
                });
            }

            return newScore;
        })
    }

    const handleRunGame = () => {
        setRunGame(prev => !prev);
    }

    const handleResetGame = () => {
        setResetGame(prev => !prev);
        setScore(0);
        setLevel(1);
    }

    return (
        <div className='flex justify-evenly w-screen h-screen '>
            <div className='flex flex-col flex-1 py-40 items-center'> 

                <p className='font-doto text-8xl font-black'>TETRIS</p>
                <div className='flex gap-2'>
                    <div className='border-4 py-3 px-7 rounded-lg'
                        onClick={handleRunGame}>
                        {runGame ? <IoPauseOutline  size={50}/> :
                        <IoPlayOutline size={50}/> }
                    </div>
                    <div className='border-4 py-3 px-7 rounded-lg'
                        onClick={handleResetGame}>
                        <RiResetRightLine size={50}/>
                    </div>
                </div>


            </div>
            <div>
                <PlayGround
                    resetGame={resetGame}
                    runGame={runGame}
                    level={level}
                    increaseScoreBy={increaseScoreBy} />
            </div>
            <div className='flex flex-col items-center flex-1'>
                score = {score}
                <br />
                level = {level}
            </div>
        </div>
    )
}