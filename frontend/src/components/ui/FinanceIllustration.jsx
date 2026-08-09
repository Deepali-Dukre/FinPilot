export default function FinanceIllustration() {
  return (
    <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-md">
      <rect x="40" y="40" width="320" height="220" rx="20" fill="white" fillOpacity="0.08" />
      <rect x="40" y="40" width="320" height="220" rx="20" stroke="white" strokeOpacity="0.15" />

      <rect x="64" y="66" width="140" height="16" rx="8" fill="white" fillOpacity="0.35" />
      <rect x="64" y="90" width="90" height="10" rx="5" fill="white" fillOpacity="0.2" />

      <rect x="272" y="64" width="64" height="36" rx="10" fill="white" fillOpacity="0.18" />
      <path d="M292 86l6-8 5 6 9-12" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />

      <g>
        <rect x="64" y="150" width="34" height="72" rx="6" fill="white" fillOpacity="0.25" />
        <rect x="108" y="120" width="34" height="102" rx="6" fill="white" fillOpacity="0.4" />
        <rect x="152" y="165" width="34" height="57" rx="6" fill="white" fillOpacity="0.25" />
        <rect x="196" y="100" width="34" height="122" rx="6" fill="white" fillOpacity="0.55" />
      </g>

      <g>
        <circle cx="290" cy="175" r="46" fill="white" fillOpacity="0.12" />
        <path
          d="M270 178c4-14 12-22 20-22s16 8 20 22"
          stroke="white"
          strokeOpacity="0.6"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <circle cx="290" cy="168" r="10" fill="white" fillOpacity="0.55" />
      </g>

      <rect x="64" y="238" width="272" height="1" fill="white" fillOpacity="0.15" />
    </svg>
  );
}
