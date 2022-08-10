import { FC } from 'react';

export const Footer: FC = () => (
  <div className="max-w-6xl mx-auto p-6">
    <div className="elevation-8 py-2 px-4 flex items-center justify-center flex-wrap gap-6">
      <img alt="" src="/static/logo-emblem.svg" />
      <div className="text-sm text-secondary">
        This is a live demo that showcases Zalter Identity integration
      </div>
      <a
        className="btn btn-neutral"
        href="https://github.com/zalter-com/zalter-identity-nextjs-sample"
        target="_blank"
      >
        View on Github
      </a>
    </div>
  </div>
);