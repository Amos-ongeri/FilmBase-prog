const VideoSkeleton = () => {
    return (
        <div className="w-full h-fit grid grid-cols-1 place-items-center py-5 ">
            <div className="w-[95%] h-full space-y-3">
                <div className="w-full h-70 pt-5 bg-slate-900 rounded-lg animate-pulse [animation-delay:0ms]"></div>
                <div className="w-[20%] h-5 bg-slate-900 rounded-full animate-pulse [animation-delay:150ms]"></div>
                <section className="flex space-x-3 lg:w-[20%] w-full">
                    <div className="w-[20%] h-5 bg-slate-900 rounded-full animate-pulse [animation-delay:300ms]"></div>
                    <div className="w-[30%] h-5 bg-slate-900 rounded-full animate-pulse [animation-delay:450ms]"></div>
                    <div className="w-[30%] h-5 bg-slate-900 rounded-full animate-pulse [animation-delay:600ms]"></div>
                    <div className="w-[20%] h-5 bg-slate-900 rounded-full animate-pulse [animation-delay:750ms]"></div>
                </section>
                <div className="w-[50%] h-3 bg-slate-900 rounded-full animate-pulse [animation-delay:900ms]"></div>
                <section className="flex space-x-3 w-full">
                    <div className="w-[40%] h-3 bg-slate-900 rounded-full animate-pulse [animation-delay:1050ms]"></div>
                    <div className="w-[20%] h-3 bg-slate-900 rounded-full animate-pulse [animation-delay:1200ms]"></div>
                    <div className="w-[20%] h-3 bg-slate-900 rounded-full animate-pulse [animation-delay:1350ms]"></div>
                </section>
            </div>
        </div>
    )
}

export default VideoSkeleton;