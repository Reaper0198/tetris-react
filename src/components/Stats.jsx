export default function Stats({ score, level }) {
    return (
        <>
<div className='flex flex-col items-center py-8 px-2 gap-4 min-h-screen'>
                <div className='text-center'>
                    <p className='font-jersey text-6xl font-'>SCORE</p>
                    <div className='border-3 p-2 rounded-lg text-center text-2xl mx-4'>{score}</div>
                </div>
                <div className='text-center'>
                    <p className='font-jersey text-6xl font-'>LEVEL</p>
                    <div className='border-3 p-2 rounded-lg text-center text-2xl mx-4'>{level}</div>
                </div>
                <div className='h-fit w-[80%] border-2 rounded-lg p-2'>
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
        </>
    )
}