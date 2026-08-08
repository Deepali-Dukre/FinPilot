import { forwardRef } from 'react';

const Input = forwardRef(function Input({ label, error, icon, rightElement, className = '', ...props }, ref) {
  return (
    <label className="block text-sm">
      {label && <span className="mb-1 block font-medium text-gray-700">{label}</span>}
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
            {icon}
          </span>
        )}
        <input
          ref={ref}
          className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100 ${
            icon ? 'pl-10' : ''
          } ${rightElement ? 'pr-10' : ''} ${error ? 'border-red-400' : 'border-gray-300'} ${className}`}
          {...props}
        />
        {rightElement && (
          <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">{rightElement}</span>
        )}
      </div>
      {error && <span className="mt-1 block text-xs text-red-500">{error}</span>}
    </label>
  );
});

export default Input;
