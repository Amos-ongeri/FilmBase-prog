const CardSkeleton = () => {
    return(
        <div className="lg:w-55 lg:h-80 md:w:45 md:h-50 sm:w-40 sm:h-60 rounded-lg space-y-2">
            <div className="w-full h-[85%] dark:bg-slate-900 bg-slate-200 rounded-lg animate-pulse [animation-delay:75ms] animation-duration-[2s]"></div>
            <div className="w-[50%] h-[5%] dark:bg-slate-900 bg-slate-200 rounded-full animate-pulse [animation-delay:150ms] animation-duration-[2s]"></div>
        </div>
    )
}

export default CardSkeleton;