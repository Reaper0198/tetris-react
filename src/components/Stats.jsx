import { useEffect, useState } from "react"

export default function Stats({ score, level }) {

    return (
        <>
<div className='flex flex-col items-center justify-center md:py-12 px-2 gap-4 md:min-h-screen flex-1 '>
                <div className='text-center'>
                    <p className='font-jersey text-5xl md:text-8xl bg-linear-to-b from-purple-900 to-sky-400 text-transparent bg-clip-text'>SCORE</p>
                    <div className='border-3 p-2 rounded-lg text-center text-2xl mx-4'>{score}</div>
                </div>
                <div className='text-center'>
                    <p className='font-jersey text-5xl md:text-8xl bg-linear-to-b from-purple-900 to-sky-400 text-transparent bg-clip-text'>LEVEL</p>
                    <div className='border-3 p-2 rounded-lg text-center text-2xl mx-4'>{level}</div>
                </div>
            </div>
        </>
    )
}