import { useEffect, useRef, useState } from 'react';
import './App.css'
import PlayGround from './components/PlayGround'

export default function App() {

    const [level, setLevel] = useState(1);
    const [score, setScore] = useState(0);

    const tickRef = useRef(1000);

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

    useEffect(() => {
        console.log(level);
    }, [level])

    return (
        <div className='flex justify-evenly w-screen h-screen '>
            <div className='flex flex-col flex-1 py-40 items-center'> 

                <p className='font-doto text-8xl font-black'>TETRIS</p>


            </div>
            <div>
                <PlayGround
                    level={level}
                    increaseScoreBy={increaseScoreBy} />
            </div>
            <div className='flex flex-col items-center flex-1'>
                score = {score}
                <br />
                level = {level}
                <br />
                tick lenght = {tickRef.current}
            </div>
        </div>
    )
}