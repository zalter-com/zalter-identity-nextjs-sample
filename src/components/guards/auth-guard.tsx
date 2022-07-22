import { FC, ReactNode, useContext, useEffect, useRef, useState } from 'react';
import Router from 'next/router';
import { AuthContext } from '../../contexts/auth-context';

interface AuthGuardProps {
  children: ReactNode;
}

/**
 * Auth Guard is a component to protect a route from being rendered
 * if the user is not authenticated.
 */
export const AuthGuard: FC<AuthGuardProps> = (props) => {
  const { children } = props;
  const { isAuthenticated } = useContext(AuthContext);
  const processed = useRef<boolean>(false);
  const [checkedGuard, setCheckedGuard] = useState<boolean>(false);

  useEffect(() => {
    if (processed.current) {
      return;
    }

    processed.current = true;

    if (!isAuthenticated) {
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