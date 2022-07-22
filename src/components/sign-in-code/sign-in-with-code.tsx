import { FC, useState } from 'react';
import { CodeStartForm } from './code-start-form';
import { CodeFinalizeForm } from './code-finalize-form';

export const SignInWithCode: FC = () => {
  const [codeSent, setCodeSent] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');

  return !codeSent ? (
    <CodeStartForm
      email={email}
      error={error}
      setCodeSent={setCodeSent}
      setEmail={setEmail}
      setError={setError}
    />
  ) : (
    <CodeFinalizeForm
      email={email}
      setCodeSent={setCodeSent}
      setError={setError}
    />
  );
};