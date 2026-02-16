import { useEffect, useRef, useState } from 'react';
import './App.css'
import PlayGround from './components/PlayGround';
import Stats from './components/Stats';
import HomeComponent from './components/HomeComponent';

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
        if(runGame){
            handleRunGame();
        }
    }

    return (
        <div className='flex max-sm:flex-col md:flex w-screen h-screen'>
            <HomeComponent 
                runGame={runGame}
                handleResetGame={handleResetGame}
                handleRunGame={handleRunGame}/>
            <div className='flex flex-2/3 content-center'>

            <PlayGround
                score={score}
                level={level}
                resetGame={resetGame}
                runGame={runGame}
                increaseScoreBy={increaseScoreBy} />
            <Stats
                level={level}
                score={score} />
                </div>
        </div>
    )
}