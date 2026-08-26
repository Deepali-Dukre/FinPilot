import { forwardRef, useState } from 'react';
import AuthField from './AuthField';
import { LockIcon, EyeIcon, EyeOffIcon } from '../ui/icons';

const AuthPasswordField = forwardRef(function AuthPasswordField(props, ref) {
  const [visible, setVisible] = useState(false);

  return (
    <AuthField
      ref={ref}
      type={visible ? 'text' : 'password'}
      icon={<LockIcon />}
      rightElement={
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setVisible((v) => !v)}
          className="pointer-events-auto transition hover:text-ink"
          aria-label={visible ? 'Hide password' : 'Show password'}
        >
          {visible ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      }
      {...props}
    />
  );
});

export default AuthPasswordField;
