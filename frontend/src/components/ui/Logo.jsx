export default function Logo({ light = false, className = '' }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="9" fill={light ? 'white' : '#7c3aed'} fillOpacity={light ? 0.15 : 1} />
        <path
          d="M9 20.5 13 15l3.5 3.5L23 11"
          stroke={light ? '#fff' : '#fff'}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M18.5 11H23v4.5" stroke={light ? '#fff' : '#fff'} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className={`text-xl font-bold ${light ? 'text-white' : 'text-gray-900'}`}>FinPilot</span>
    </div>
  );
}
