export function TelemedicineIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none" className={className}>
            <rect x="30" y="50" width="140" height="100" rx="8" fill="#E6F7FF" />
            <rect x="40" y="60" width="120" height="70" rx="4" fill="#BAE7FF" />
            <circle cx="100" cy="95" r="25" fill="#1890FF" />
            <path d="M90 95L115 95" stroke="white" strokeWidth="3" strokeLinecap="round" />
            <path d="M100 85L100 105" stroke="white" strokeWidth="3" strokeLinecap="round" />
            <path d="M70 140H130" stroke="#1890FF" strokeWidth="3" strokeLinecap="round" />
            <path d="M85 140V150" stroke="#1890FF" strokeWidth="3" strokeLinecap="round" />
            <path d="M115 140V150" stroke="#1890FF" strokeWidth="3" strokeLinecap="round" />
            <path d="M75 150H125" stroke="#1890FF" strokeWidth="3" strokeLinecap="round" />
            <path d="M40 70L40 80M40 90L40 100M40 110L40 120" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <path d="M160 70L160 80M160 90L160 100M160 110L160 120" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
    )
}
