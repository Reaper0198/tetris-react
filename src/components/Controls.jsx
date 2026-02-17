import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { FaAnglesDown } from "react-icons/fa6";
import { AiOutlineRotateRight } from "react-icons/ai";

export default function Controls({ handleControl }) {
    return (
        <div className="md:hidden w-full flex flex-col pt-4 p-10 gap-2">
            <div className="flex justify-between">
                <div className="flex gap-5 items-center">
                    <div className="border-3 p-1 rounded-xl h-fit px-2"
                        onClick={handleControl("a")}><FaArrowLeft size={40}/></div>
                    <div className="border-3 p-1 rounded-xl h-fit px-2" 
                        onClick={handleControl("d")}><FaArrowRight size={40}/></div>
                </div>
                <div className="border-3 p-1 rounded-4xl" 
                    onClick={handleControl("s")}><AiOutlineRotateRight size={50}/></div>
            </div>
            <div className="flex justify-between px-10 items-center">
                <div className="border-3 p-1 rounded-xl h-fit px-2" 
                    onClick={handleControl("Shift")}><FaArrowDown size={40}/></div>
                <div className="border-3 p-1 rounded-4xl" 
                    onClick={handleControl(" ")}><FaAnglesDown size={50}/></div>
            </div>
        </div>
    )
}