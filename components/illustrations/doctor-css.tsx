export function DoctorCSSIllustration() {
    return (
        <div className="relative w-full h-full">
            {/* Head */}
            <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-amber-200 rounded-full"></div>

            {/* Face */}
            <div className="absolute top-[30%] left-[calc(50%-5px)] w-10 h-3 bg-amber-300 rounded-full"></div>
            <div className="absolute top-[35%] left-[calc(50%-2px)] w-4 h-2 bg-amber-300 rounded-full"></div>

            {/* Eyes */}
            <div className="absolute top-[28%] left-[calc(50%-8px)] w-3 h-3 bg-gray-800 rounded-full"></div>
            <div className="absolute top-[28%] left-[calc(50%+5px)] w-3 h-3 bg-gray-800 rounded-full"></div>

            {/* Body */}
            <div className="absolute top-[45%] left-1/2 transform -translate-x-1/2 w-32 h-40 bg-blue-500 rounded-t-3xl"></div>

            {/* Stethoscope */}
            <div className="absolute top-[50%] left-[calc(50%-5px)] w-10 h-2 bg-gray-700 rounded-full"></div>
            <div className="absolute top-[52%] left-[calc(50%+5px)] w-2 h-10 bg-gray-700 rounded-full"></div>
            <div className="absolute top-[60%] left-[calc(50%+5px)] w-6 h-6 bg-gray-700 rounded-full"></div>
        </div>
    )
}
