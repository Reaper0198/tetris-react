import { IoPlayOutline } from "react-icons/io5";
import { IoPauseOutline } from "react-icons/io5";
import { RiResetRightLine } from "react-icons/ri";

export default function HomeComponent({ handleResetGame, handleRunGame, runGame }) {
    return (
        <>
            <div className='flex flex-col  py-30 items-center'>
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
        </>
    )
}