import { FC, ReactNode, useContext, useEffect, useRef, useState } from 'react';
import Router from 'next/router';
import { AuthContext } from '../../contexts/auth-context';

interface GuestGuardProps {
  children: ReactNode;
}

/**
 * Guest Guard is a component to protect a route from being rendered
 * if the user is authenticated.
 *
 * Currently, this is not used.
 */
export const GuestGuard: FC<GuestGuardProps> = (props) => {
  const { children } = props;
  const { isAuthenticated } = useContext(AuthContext);
  const processed = useRef<boolean>(false);
  const [checkedGuard, setCheckedGuard] = useState(false);

  useEffect(() => {
    if (processed.current) {
      return;
    }

    processed.current = true;

    if (isAuthenticated) {
      Router.push('/').catch(console.error);
      return;
    }

    setCheckedGuard(true);
  }, [isAuthenticated]);

  if (!checkedGuard) {
    return null;
  }

  return <>{children}</>;
};