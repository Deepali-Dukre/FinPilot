import { forwardRef, useState } from 'react';
import Input from './Input';
import { LockIcon, EyeIcon, EyeOffIcon } from './icons';

const PasswordInput = forwardRef(function PasswordInput(props, ref) {
  const [visible, setVisible] = useState(false);

  return (
    <Input
      ref={ref}
      type={visible ? 'text' : 'password'}
      icon={<LockIcon />}
      rightElement={
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setVisible((v) => !v)}
          className="pointer-events-auto hover:text-gray-600"
          aria-label={visible ? 'Hide password' : 'Show password'}
        >
          {visible ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      }
      {...props}
    />
  );
});

export default PasswordInput;
