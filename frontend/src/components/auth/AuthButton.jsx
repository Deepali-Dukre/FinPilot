export default function AuthButton({ className = '', disabled, children, ...props }) {
  return (
    <button
      disabled={disabled}
      className={`w-full rounded-md border-2 border-ink bg-brand py-3.5 text-sm font-bold text-paper shadow-stamp-sm transition hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-ink)] active:translate-y-0 active:shadow-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-stamp-sm ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
