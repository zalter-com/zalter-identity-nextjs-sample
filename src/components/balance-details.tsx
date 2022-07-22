import { FC, useState } from 'react';
import { signRequest } from '../lib/sign-request';

interface BalanceDetailsProps {
  balance: {
    amount: string;
    accounts: {
      usd: string;
      eur: string;
    };
  };
}

export const BalanceDetails: FC<BalanceDetailsProps> = (props) => {
  const { balance } = props;
  const [isDisabled, setIsDisabled] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const onWithdraw = async () => {
    // This is an example where we have a "body" to sign.

    setIsDisabled(true);

    const signedRequest = await signRequest({
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        amount: 1000
      })
    });

    try {
      const response = await fetch('/api/withdraw', signedRequest);

      if (!response.ok) {
        let data;

        try {
          data = await response.json();
        } catch {}

        setError(data?.message || 'Something went wrong');
      } else {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 5000);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Something went wrong');
    }

    setIsDisabled(false);
  };

  return (
    <div className="border rounded">
      <div className="flex flex-col p-8 gap-5">
        <div>
          <div className="text-sm text-secondary">
            Your balance
          </div>
          <div className="text-4xl font-bold">
            {balance.amount}
          </div>
        </div>
        <div>
          <div className="text-sm text-secondary">
            USD Account
          </div>
          <div>
            {balance.accounts.usd}
          </div>
        </div>
        <div>
          <div className="text-sm text-secondary">
            EUR Account
          </div>
          <div>
            {balance.accounts.eur}
          </div>
        </div>
      </div>
      <div className="px-8 py-4 border-t">
        {error && (
          <div className="text-sm text-error mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="text-sm text-success mb-4">
            Request signed and authorized successfully
          </div>
        )}
        <button
          className="btn btn-lg btn-secondary"
          disabled={isDisabled}
          onClick={onWithdraw}
        >
          Withdraw
        </button>
      </div>
    </div>
  );
};