import { useRef, useState } from 'react';
import './App.css'
import PlayGround from './components/PlayGround'

export default function App() {

    const [level, setLevel] = useState(1);
    const [score, setScore] = useState(0);

    const tickRef = useRef(1000);

    const increaseScoreBy = (addScore) => {
        setScore(prev => prev+addScore);

        let lvl = Math.floor(score/500);
        if(lvl === 1){
            setLevel(prev => prev+1);
        }else if(lvl === 2){
            setLevel(prev => prev+1);
        }else if(lvl === 3){
            setLevel(prev => prev+1);
        }else if(lvl === 4){
            setLevel(prev => prev+1);
        }
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
                increaseScoreBy={increaseScoreBy}/>
            <div>

            </div>
        </div>
    )
}