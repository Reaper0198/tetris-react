export default function Block() {
    return (
        <>
        <LBlock/>
        <IBlock />
        <TBlock />
        <SBlock />
        <SBlock />
        <SBlock />
        <OBlock />
        <OBlock />
        </>
    )
}

const LBlock = () => {
    return (
        <div className="flex  z-10 flex-col w-fit">
            <div className="flex z-10 ">
                <div className="w-12 border h-12 z-0 bg-amber-600"></div>
                <div className="w-12 border h-12 z-10"></div>
                <div className="w-12 border h-12 z-10"></div>
            </div>
            <div className="flex   z-10">
                <div className="w-12 border h-12 z-0 bg-amber-600"></div>
                <div className="w-12 border h-12 z-0 bg-amber-600"></div>
                <div className="w-12 border h-12 z-0 bg-amber-600"></div>
            </div>
        </div>
    )
}

const TBlock = () => {
    return (
        <div className="flex z-10 flex-col w-fit">
            <div className="flex z-10">
                <div className="w-12 border h-12 z-10"></div>
                <div className="w-12 border h-12 z-0 bg-pink-600"></div>
                <div className="w-12 border h-12 z-10"></div>

            </div>
            <div className="flex z-10 ">
                <div className="w-12 border h-12 z-0 bg-pink-600"></div>
                <div className="w-12 border h-12 z-0 bg-pink-600"></div>
                <div className="w-12 border h-12 z-0 bg-pink-600"></div>
            </div>
        </div>
    )
}

const SBlock = () => {
    return (
        <div className="flex flex-col w-fit">
            <div className="flex">
                <div className="w-12 border h-12 z-0 bg-indigo-600"></div>
                <div className="w-12 border h-12 z-0 bg-indigo-600"></div>
                <div className="w-12 border h-12 z-10"></div>

            </div>
            <div className="flex ">
                <div className="w-12 border h-12 z-10"></div>
                <div className="w-12 border h-12 z-0 bg-indigo-600"></div>
                <div className="w-12 border h-12 z-0 bg-indigo-600"></div>
            </div>
        </div>
    )
}

const IBlock = () => {
    return (
        <div className="flex flex-col">
            <div className="w-12 border h-12 z-0 bg-yellow-300"></div>
            <div className="w-12 border h-12 z-0 bg-yellow-300"></div>
            <div className="w-12 border h-12 z-0 bg-yellow-300"></div>
            <div className="w-12 border h-12 z-0 bg-yellow-300"></div>
        </div>
    )
}

const OBlock = () => {
    return (
        <div className="flex flex-col w-fit">
            <div className="flex">
                <div className="w-12 border h-12 z-0 bg-green-500"></div>
                <div className="w-12 border h-12 z-0 bg-green-500"></div>
            </div>
            <div className="flex ">
                <div className="w-12 border h-12 z-0 bg-green-500"></div>
                <div className="w-12 border h-12 z-0 bg-green-500"></div>
            </div>
        </div>
    )
}

