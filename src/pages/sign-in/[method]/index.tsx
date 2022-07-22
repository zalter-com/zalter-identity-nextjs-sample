import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Layout } from '../../../components/layout';
import { SignInWithCode } from '../../../components/sign-in-code/sign-in-with-code';
import { SignInWithLink } from '../../../components/sign-in-link/sign-in-with-link';

const Page: NextPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const method = router.query.method as string;

    if (!['code', 'link'].includes(method)) {
      router.push('/').catch(console.error);
      return;
    }

    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return null;
  }

  const method = router.query.method as string;

  return (
    <div className="py-8 md:py-16">
      <div className="px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="order-1 md:order-0 flex flex-col gap-12">
          <div>
            <div className="flex items-center mb-2">
              <img alt="" src="/static/icon-shield-check.svg" />
              <div className="font-semibold ml-1">
                Future Proof Security
              </div>
            </div>
            <div className="text-secondary">
              Bring the strongest authentication to your customers.
            </div>
          </div>
          <div>
            <div className="flex items-center mb-2">
              <img alt="" src="/static/icon-device-mobile.svg" />
              <div className="font-semibold ml-1">
                Future Proof Security
              </div>
            </div>
            <div className="text-secondary">
              Satisfied customers mean better business and customer loyalty.
            </div>
          </div>
          <div>
            <div className="flex items-center mb-2">
              <img alt="" src="/static/icon-trending-down.svg" />
              <div className="font-semibold ml-1">
                Reduce operation costs
              </div>
            </div>
            <div className="text-secondary">
              Erase the risk of account takeover while reducing operating costs.
            </div>
          </div>
        </div>
        <div className="-order-1 md:order-1">
          {method === 'code' && <SignInWithCode />}
          {method === 'link' && <SignInWithLink />}
        </div>
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