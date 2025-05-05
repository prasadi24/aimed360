export function TreatmentIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none" className={className}>
            <path
                d="M100 30C61.3401 30 30 61.3401 30 100C30 138.66 61.3401 170 100 170C138.66 170 170 138.66 170 100C170 61.3401 138.66 30 100 30Z"
                fill="#E6F7FF"
            />
            <path
                d="M100 50C72.3858 50 50 72.3858 50 100C50 127.614 72.3858 150 100 150C127.614 150 150 127.614 150 100C150 72.3858 127.614 50 100 50Z"
                stroke="#1890FF"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="12 12"
            />
            <path d="M100 70V130" stroke="#1890FF" strokeWidth="3" strokeLinecap="round" />
            <path d="M70 100H130" stroke="#1890FF" strokeWidth="3" strokeLinecap="round" />
            <path d="M85 70L115 70" stroke="#1890FF" strokeWidth="3" strokeLinecap="round" />
            <path d="M85 130L115 130" stroke="#1890FF" strokeWidth="3" strokeLinecap="round" />
            <path d="M70 85L70 115" stroke="#1890FF" strokeWidth="3" strokeLinecap="round" />
            <path d="M130 85L130 115" stroke="#1890FF" strokeWidth="3" strokeLinecap="round" />
            <circle cx="100" cy="100" r="15" fill="#BAE7FF" />
            <circle cx="100" cy="100" r="8" fill="#1890FF" />
        </svg>
    )
}
