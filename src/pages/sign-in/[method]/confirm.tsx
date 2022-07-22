import { useEffect, useRef, useState } from 'react';
import { NextPage } from 'next';
import Router from 'next/router';
import { auth } from '../../../lib/auth';

// This is used only for magic link authentication.
const Page: NextPage = () => {
  const processed = useRef<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const confirm = async () => {
    // Prevent double function call
    if (processed.current) {
      return;
    }

    processed.current = true;

    // Get the token from the page URL hash (without #)
    const token = window.location.hash.substring(1);

    if (!token) {
      Router.push('/').catch(console.error);
      return;
    }

    try {
      await auth.signInWithLink('finalize', { token });
      // Redirect to "/dashboard" is handled by AuthContext.
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Something went wrong');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    confirm().catch(console.error);
  }, []);

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-error text-center">
        {error}
      </div>
    );
  }

  return null;
};

export default Page;