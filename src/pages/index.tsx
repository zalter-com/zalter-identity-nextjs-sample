import { useContext } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { AuthContext } from '../contexts/auth-context';
import { Layout } from '../components/layout';
import { auth } from '../lib/auth';

const methods = [
  {
    type: 'email-otc',
    title: 'Email One-Time-Code',
    description: 'Simple and secure sign up and log in code sent via email.',
    href: '/sign-in/code'
  },
  {
    type: 'email-link',
    title: 'Email Magic Link',
    description: 'Simple and secure sign up and log in links sent via email.',
    href: '/sign-in/link'
  }
];

const Page: NextPage = () => {
  const { isAuthenticated } = useContext(AuthContext);

  const onSignOut = async () => {
    try {
      await auth.signOut(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="py-8 md:py-16">
      <div className="px-6 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">
          <span className="text-brand-primary">Zalter</span> Identity Demo
        </h1>
        <p className="text-xl text-center text-secondary">
          Zalter Identity is an identity and authentication provider service based on signatures. Improve security and user experience with flexible, passwordless authentication solutions.
        </p>
        {!isAuthenticated ? (
          <div className="mt-16 md:mt-32 flex flex-col md:flex-row gap-6">
            {methods.map((method) => (
              <div
                className="border rounded grow"
                key={method.type}
              >
                <div className="px-8 pt-8">
                  <h3 className="font-semibold mb-2">
                    {method.title}
                  </h3>
                  <p className="text-sm	text-secondary">
                    {method.description}
                  </p>
                </div>
                <div className="px-8 py-4">
                  <Link
                    href={method.href}
                    passHref
                  >
                    <a className="btn btn-neutral btn-lg block w-full flex justify-center align-center">
                      Try now
                      <img
                        alt=""
                        className="ml-2"
                        src="/static/icon-arrow-forward.svg"
                      />
                    </a>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-32 border rounded px-8 py-8 pb-4">
            <div className="mb-4">
              You are authenticated.&nbsp;
              <Link
                href="/dashboard"
                passHref
              >
                <a className="text-brand-secondary">
                  Go to your private page
                </a>
              </Link>
            </div>
            <button
              className="btn btn-lg btn-neutral"
              onClick={onSignOut}
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

Page.getLayout = (page) => (
  <Layout>
    {page}
  </Layout>
);

export default Page;
