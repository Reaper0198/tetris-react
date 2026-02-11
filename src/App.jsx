import { useRef, useState } from 'react';
import './App.css'
import PlayGround from './components/PlayGround'

export default function App() {

    const [level, setLevel] = useState(1);
    const [score, setScore] = useState(0);

    const tickRef = useRef(1000);

    const increaseScoreBy = (addScore) => {
        setScore(prev => {

            const newScore = prev + addScore;
            if(Math.floor((newScore / 500)) !== Math.floor((prev / 500))){
                setLevel(prev => {
                    console.log(prev+1)
                    return (prev+1)
                });
            }    

            return newScore;
        })
    }

    return (
        <div className='flex justify-evenly w-screen h-screen '>
            <div>
                score = {score}
                <br />
                level = {level}
            </div>
            <PlayGround
                tick={tickRef.current}
                increaseScoreBy={increaseScoreBy} />
            <div>

            </div>
        </div>
    )
}