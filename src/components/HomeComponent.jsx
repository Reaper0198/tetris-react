import { IoPlayOutline } from "react-icons/io5";
import { IoPauseOutline } from "react-icons/io5";
import { RiResetRightLine } from "react-icons/ri";

export default function HomeComponent({ handleResetGame, handleRunGame, runGame }) {
    return (
        <>
            <div className='flex flex-col pt-30 pb-10 items-center flex-1/3'>
                <div>

                <p className='font-jersey text-8xl md:text-9xl font-black bg-linear-to-b from-purple-900 to-sky-400 text-transparent bg-clip-text '>TETRIS</p>
                <div className='flex gap-2 p-1 justify-center'>
                    <div className='border-4 border-b-8 border-r-8 md:py-3 md:px-7 rounded-lg active:border-b-4 active:border-r-4 active:translate-x-2 active:translate-y-2'
                        onClick={handleRunGame}>
                        {runGame ? <IoPauseOutline size={50} /> :
                            <IoPlayOutline size={50} />}
                    </div>
                    <div className='border-4 border-b-8 border-r-8 md:py-3 md:px-7 rounded-lg active:border-b-4 active:border-r-4 active:translate-x-2 active:translate-y-2'
                        onClick={handleResetGame}>
                        <RiResetRightLine size={50} />
                    </div>
                </div>
                </div>
                <div className="m-2 gap-2 flex flex-col justify between items-left">
                    <div className="md:flex md:gap-2">
                        <div className="flex gap-2">
                            <div className=" py-1 px-3 rounded-md border-2 text-center border-b-4 border-r-4"><p>A</p></div>
                            <div className=" py-1 px-3 rounded-md border-2 text-center border-b-4 border-r-4"><p>W</p></div>
                            <div className=" py-1 px-3 rounded-md border-2 text-center border-b-4 border-r-4"><p>D</p></div>
                        </div>
                        <div><p className="md:pt-2 text-nowrap">MOVE : Left, Down, Right</p></div>
                    </div>
                    <div className="md:flex md:gap-2">
                        <div className="border-2 border-b-4 border-r-4 rounded-md text-center w-fit px-4 py-1"><p>SHIFT</p></div>
                        <div><p className="md:pt-2 text-nowrap">Hard Down</p></div>
                    </div>
                    <div className="md:flex md:gap-2">
                        <div className="border-2 border-b-4 border-r-4 rounded-md text-center w-fit px-8 py-1"><p>SPACE</p></div>
                        <div><p className="md:pt-2 text-nowrap">Rotate 90 deg. </p></div>
                    </div>

                </div>

            </div>
        </>
    )
}