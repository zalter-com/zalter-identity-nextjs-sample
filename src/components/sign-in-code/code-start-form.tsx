import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { auth } from '../../lib/auth';

interface Props {
  email: string;
  error?: string;
  setCodeSent?: (sent: boolean) => void;
  setEmail?: (email: string) => void;
  setError?: (error: string) => void;
}

export const CodeStartForm: FC<Props> = (props) => {
  const { email, error, setCodeSent, setEmail, setError } = props;
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const onEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail?.(event.target.value);
  };

  const onContinue = async (event: FormEvent) => {
    event.preventDefault();

    if (isDisabled) {
      return;
    }

    setError?.('');
    setIsDisabled(true);

    try {
      await auth.signInWithCode('start', { email });
      setIsDisabled(false);
      setEmail?.(email);
      setCodeSent?.(true);
    } catch (err: any) {
      console.error(err);
      setIsDisabled(false);
      setError?.(err.message || 'Something went wrong');
    }
  };

  return (
    <form
      className="border rounded"
      onSubmit={onContinue}
    >
      <div className="p-8">
        <h2 className="text-xl font-semibold">
          Continue with email one-time-code
        </h2>
      </div>
      <div className="py-4 px-8">
        <div>
          <label
            className="label"
            htmlFor="email"
          >
            Email address
          </label>
          <input
            className="input block w-full"
            name="email"
            onChange={onEmailChange}
            type="email"
            value={email}
          />
        </div>
        {error && (
          <div className="text-sm text-error mt-2 mb-4">
            {error}
          </div>
        )}
        <div className="text-disabled text-xs mt-2">
          By clicking Continue you agree to Terms of Service and I understand that an account will be created if a matching email does not exist.
        </div>
        <button
          className="btn btn-lg btn-secondary block w-full mt-4"
          disabled={isDisabled}
          type="submit"
        >
          Continue
        </button>
      </div>
    </form>
  );
};