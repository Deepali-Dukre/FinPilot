import { forwardRef } from 'react';

const AuthField = forwardRef(function AuthField(
  { label, error, icon, rightElement, className = '', ...props },
  ref
) {
  return (
    <label className="block text-sm">
      {label && (
        <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink-soft">{label}</span>
      )}
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-ink-soft">
            {icon}
          </span>
        )}
        <input
          ref={ref}
          className={`w-full rounded-md border-2 bg-white px-3.5 py-3 text-sm text-ink outline-none transition placeholder:text-ink-soft/60 focus:ring-4 focus:ring-brand/15 ${
            icon ? 'pl-10' : ''
          } ${rightElement ? 'pr-10' : ''} ${error ? 'border-red-500' : 'border-ink/15 focus:border-brand'} ${className}`}
          {...props}
        />
        {rightElement && (
          <span className="absolute inset-y-0 right-3.5 flex items-center text-ink-soft">{rightElement}</span>
        )}
      </div>
      {error && <span className="mt-1.5 block text-xs font-medium text-red-600">{error}</span>}
    </label>
  );
});

export default AuthField;
