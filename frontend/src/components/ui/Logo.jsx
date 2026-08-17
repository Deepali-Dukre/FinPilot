export default function Logo({ light = false, className = '' }) {
  const mark = light ? '#F6F3EC' : '#145C42';
  const stroke = light ? '#12201A' : '#F6F3EC';

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
        <rect x="1.5" y="1.5" width="31" height="31" rx="8" fill={mark} stroke={light ? 'none' : '#12201A'} strokeWidth={light ? 0 : 1.5} />
        <path d="M8 21.5 13.5 15l4 4.5L26 10" stroke={stroke} strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="26" cy="10" r="2.1" fill="#E8A33D" />
      </svg>
      <span className={`font-display text-xl font-semibold tracking-tight ${light ? 'text-paper' : 'text-ink'}`}>
        FinPilot
      </span>
    </div>
  );
}
