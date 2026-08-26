export default function Logo({ light = false, className = '' }) {
  const mark = light ? '#F6F3EC' : '#145C42';
  const coin = light ? '#145C42' : '#F6F3EC';

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
        <rect x="1.5" y="1.5" width="31" height="31" rx="8" fill={mark} stroke={light ? 'none' : '#12201A'} strokeWidth={light ? 0 : 1.5} />
        <circle cx="15" cy="17" r="9" fill={coin} />
        <text x="15" y="21" textAnchor="middle" fontSize="11" fontWeight="700" fill={mark} fontFamily="Arial, sans-serif">₹</text>
        <path d="M26 3.5 26.85 7.15 30.5 8 26.85 8.85 26 12.5 25.15 8.85 21.5 8 25.15 7.15Z" fill="#E8A33D" />
      </svg>
      <span className={`font-display text-xl font-semibold tracking-tight ${light ? 'text-paper' : 'text-ink'}`}>
        FinPilot
      </span>
    </div>
  );
}
