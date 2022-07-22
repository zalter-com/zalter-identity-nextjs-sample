import { FC } from 'react';
import Link from 'next/link';

export const Topbar: FC = () => (
  <div className="elevation-2">
    <div className="max-w-6xl mx-auto h-[64px] px-6 flex items-center">
      <Link
        href="/"
        passHref
      >
        <a>
          <span className="hidden md:flex items-center">
            <img alt="" src="/static/logo.svg" />
            <span className="mx-2">
              +
            </span>
            <img alt="" src="/static/logo-next-js.svg" />
          </span>
          <span className="md:hidden">
            <img alt="" src="/static/logo-emblem.svg" />
          </span>
        </a>
      </Link>
      <span className="grow" />
      <a
        className="btn btn-neutral"
        target="_blank"
        href="https://zalter.com"
      >
        zalter.com
      </a>
      <a
        className="btn btn-primary ml-4"
        target="_blank"
        href="https://developer.zalter.com"
      >
        Read the docs
      </a>
    </div>
  </div>
);