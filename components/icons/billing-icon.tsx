export function BillingIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none" className={className}>
            <rect x="40" y="30" width="120" height="140" rx="8" fill="#E6F7FF" />
            <rect x="55" y="50" width="90" height="10" rx="2" fill="#BAE7FF" />
            <rect x="55" y="70" width="90" height="10" rx="2" fill="#BAE7FF" />
            <rect x="55" y="90" width="60" height="10" rx="2" fill="#BAE7FF" />
            <rect x="55" y="120" width="90" height="30" rx="4" fill="#1890FF" />
            <path d="M85 135H115M100 120V150" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <path d="M140 50L160 50M140 70L160 70M140 90L160 90" stroke="#1890FF" strokeWidth="2" strokeLinecap="round" />
            <path
                d="M40 160L40 180L160 180L160 160"
                stroke="#1890FF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <circle cx="140" cy="140" r="25" fill="#F0F5FF" stroke="#1890FF" strokeWidth="2" />
            <path d="M130 140H150M140 130V150" stroke="#1890FF" strokeWidth="2" strokeLinecap="round" />
        </svg>
    )
}
