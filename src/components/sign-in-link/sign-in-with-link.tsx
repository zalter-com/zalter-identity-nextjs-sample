import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { auth } from '../../lib/auth';

export const SignInWithLink: FC = () => {
  const [linkSent, setLinkSent] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const onEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onContinue = async (event: FormEvent) => {
    event.preventDefault();

    if (isDisabled) {
      return;
    }

    setError('');
    setIsDisabled(true);

    // When in development, this will be 'http://localhost:3000/sign-in/link/confirm'
    // Remember to configure it in your project settings
    const redirectUri = window.location.href + '/confirm';

    try {
      await auth.signInWithLink('start', {
        email,
        redirectUri
      });
      setEmail(email);
      setLinkSent(true);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Something went wrong');
    }

    setIsDisabled(false);
  };

  const onTryAgain = () => {
    setEmail('');
    setLinkSent(false);
  };

  if (linkSent) {
    return (
      <div className="border rounded">
        <div className="p-8">
          <h2 className="text-xl font-semibold mb-8">
            Continue with email magic link
          </h2>
          <div>
            An email was sent to {email}
          </div>
          <div className="mt-8">
            <button
              className="btn btn-lg btn-neutral"
              onClick={onTryAgain}
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      className="border rounded"
      onSubmit={onContinue}
    >
      <div className="p-8">
        <h2 className="text-xl font-semibold">
          Continue with email magic link
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