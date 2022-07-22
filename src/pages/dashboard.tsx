import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { AuthGuard } from '../components/guards/auth-guard';
import { BalanceDetails } from '../components/balance-details';
import { Layout } from '../components/layout';
import { signRequest } from '../lib/sign-request';

interface Balance {
  amount: string;
  accounts: {
    usd: string;
    eur: string;
  };
}

const Page: NextPage = () => {
  const [balance, setBalance] = useState<Balance | null>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getBalance = async () => {
    // This is a simple request, where we do not have a "body".
    // In this case, the data to sign will be an empty string (equivalent to an Uint8Array(0)).
    const signedRequest = await signRequest({
      method: 'GET'
    });

    try {
      const response = await fetch('/api/check_balance', signedRequest);

      if (!response.ok) {
        let data;

        try {
          data = await response.json();
        } catch {}

        setError(data?.message || 'Something went wrong');
      } else {
        const data = await response.json();
        setBalance(data);
      }

      setIsLoading(false);
    } catch (err: any) {
      console.log(err);
      setError(err.message || 'Something went wrong');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBalance().catch(console.error);
  }, []);

  if (isLoading) {
    return null;
  }

  if (error) {
    return (
      <div className="p-8">
        {error}
      </div>
    );
  }

  return (
    <div className="py-8 md:py-16">
      <div className="px-6 max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold mb-2">
            Welcome back
          </h1>
          <p className="text-secondary">
            Here’s your dashboard stats for today
          </p>
        </div>
        <BalanceDetails balance={balance!} />
      </div>
    </div>
  );
};

Page.getLayout = (page) => (
  <Layout>
    <AuthGuard>{page}</AuthGuard>
  </Layout>
);

export default Page;
