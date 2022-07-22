import { FC, ReactNode } from 'react';
import { Footer } from './footer';
import { Topbar } from './topbar';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = (props) => {
  const { children } = props;

  return (
    <>
      <Topbar />
      <div className="grow flex flex-col">
        {children}
      </div>
      <Footer />
    </>
  );
};