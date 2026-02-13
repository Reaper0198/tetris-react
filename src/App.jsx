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
            <div className='flex flex-col flex-1 py-30 items-center'>

                <p className='font-jersey text-9xl font-black'>TETRIS</p>
                <div className='flex gap-2'>
                    <div className='border-4 py-3 px-7 rounded-lg'
                        onClick={handleRunGame}>
                        {runGame ? <IoPauseOutline size={50} /> :
                            <IoPlayOutline size={50} />}
                    </div>
                    <div className='border-4 py-3 px-7 rounded-lg'
                        onClick={handleResetGame}>
                        <RiResetRightLine size={50} />
                    </div>
                </div>


            </div>
            <div>
                <PlayGround
                    score={score}
                    resetGame={resetGame}
                    runGame={runGame}
                    level={level}
                    increaseScoreBy={increaseScoreBy} />
            </div>
            <div className='flex flex-col items-center flex-1 py-8 px-2 gap-4'>
                <div className='text-center'>
                    <p className='font-jersey text-6xl font-'>SCORE</p>
                    <div className='border-3 p-2 rounded-lg text-center text-2xl mx-4'>{score}</div>
                </div>
                <div className='text-center'>
                    <p className='font-jersey text-6xl font-'>LEVEL</p>
                    <div className='border-3 p-2 rounded-lg text-center text-2xl mx-4'>{level}</div>
                </div>
                <div className='h-full w-[80%] border-2 rounded-lg p-2'>
                    <div className='flex justify-between px-8 py-1 text-xl'>
                        <p>Date</p>
                        <p>Name</p>
                        <p>Score</p>
                    </div>
                    <div className='bg-amber-600 w-full rounded-md h-[9%]'></div>
                    <div className='bg-amber-300 w-full rounded-md h-[9%]'></div>
                    <div className='bg-amber-600 w-full rounded-md h-[9%]'></div>
                    <div className='bg-amber-300 w-full rounded-md h-[9%]'></div>
                    <div className='bg-amber-600 w-full rounded-md h-[9%]'></div>
                    <div className='bg-amber-300 w-full rounded-md h-[9%]'></div>
                    <div className='bg-amber-600 w-full rounded-md h-[9%]'></div>
                    <div className='bg-amber-300 w-full rounded-md h-[9%]'></div>
                    <div className='bg-amber-600 w-full rounded-md h-[9%]'></div>
                    <div className='bg-amber-300 w-full rounded-md h-[9%]'></div>
                </div>
            </div>
        </div>
    )
}