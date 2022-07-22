import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { auth } from '../../lib/auth';

interface Props {
  email: string;
  setCodeSent?: (sent: boolean) => void;
  setError?: (error: string) => void;
}

export const CodeFinalizeForm: FC<Props> = (props) => {
  const { email, setCodeSent, setError } = props;
  const [code, setCode] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const onCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
  };

  const onContinue = async (event: FormEvent) => {
    event.preventDefault();

    if (isDisabled) {
      return;
    }

    setIsDisabled(true);

    try {
      await auth.signInWithCode('finalize', { code });
      // Redirect to "/dashboard" is handled by AuthContext.
    } catch (err: any) {
      console.error(err);
      setIsDisabled(false);

      // Zalter only allows 1 try per code, so we need to resend it.
      setError?.(err.message || 'Something went wrong');
      setCodeSent?.(false);
    }
  };

  const onTryAgain = () => {
    setCodeSent?.(false);
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
          An email was sent to {email}
        </div>
        <div className="mt-4">
          <label
            className="label"
            htmlFor="code"
          >
            Code
          </label>
          <input
            className="input block w-full"
            name="code"
            onChange={onCodeChange}
            type="text"
            value={code}
          />
        </div>
        <div className="text-secondary text-sm mt-2">
          Didn&apos;t receive it?&nbsp;
          <span
            className="underline text-primary cursor-pointer"
            onClick={onTryAgain}
          >
            Try again
          </span>
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