const HomeSkeleton = () => {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-[95%] h-[95%] bg-gray-900 rounded-2xl animate-pulse [animation-delay:900ms] animation-duration-[4s]">
                <div className="w-full min-h-10 p-10 flex">
                    <div className="top-10 left-10 text-white w-[50%]">
                        <p className="bg-gray-800 rounded-2xl w-[30%] h-6 mb-5 animate-pulse [animation-delay:0ms] animation-duration-[1s]"></p>
                        <p className="bg-gray-800 rounded-2xl w-[50%] h-3 mb-2 animate-pulse [animation-delay:150ms] animation-duration-[1s]"></p>
                        <p className="bg-gray-800 rounded-2xl w-[60%] h-3 mb-2 animate-pulse [animation-delay:300ms] animation-duration-[1s]"></p>
                        <p className="bg-gray-800 rounded-2xl w-[70%] h-3 mb-2 animate-pulse [animation-delay:450ms] animation-duration-[1s]"></p>
                        <p className="bg-gray-800 rounded-2xl w-[60%] h-3 mb-2 animate-pulse [animation-delay:600ms] animation-duration-[1s]"></p>
                        <p className="bg-gray-800 rounded-2xl w-[50%] h-3 mb-5 animate-pulse [animation-delay:750ms] animation-duration-[1s]"></p>
                        <button className="w-20 h-14 bg-gray-800 rounded-2xl animate-pulse [animation-delay:900ms] animation-duration-[1s]"></button>
                    </div>
                    <div className="flex justify-between w-[50%]">
                        <div></div>
                        <div className="flex space-x-3 w-[25%]">
                            <button className="w-10 h-10 bg-gray-800 rounded-full animate-pulse [animation-delay:75ms] animation-duration-[1s]"></button>
                            <button className="w-10 h-10 bg-gray-800 rounded-full animate-pulse [animation-delay:150ms] animation-duration-[1s]"></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeSkeleton;