export function LabTestIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none" className={className}>
            <path d="M80 40H120V80L140 120V160H60V120L80 80V40Z" fill="#E6F7FF" />
            <path
                d="M80 40H120V80L140 120V160H60V120L80 80V40Z"
                stroke="#1890FF"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path d="M80 80H120" stroke="#1890FF" strokeWidth="3" strokeLinecap="round" />
            <path d="M70 120H130" stroke="#1890FF" strokeWidth="3" strokeLinecap="round" />
            <path d="M90 100L110 140" stroke="#1890FF" strokeWidth="3" strokeLinecap="round" />
            <path d="M110 100L90 140" stroke="#1890FF" strokeWidth="3" strokeLinecap="round" />
            <circle cx="100" cy="120" r="10" fill="#BAE7FF" />
            <path d="M80 50H120" stroke="#1890FF" strokeWidth="3" strokeLinecap="round" />
            <path d="M80 60H120" stroke="#1890FF" strokeWidth="3" strokeLinecap="round" />
            <path d="M80 70H120" stroke="#1890FF" strokeWidth="3" strokeLinecap="round" />
        </svg>
    )
}
