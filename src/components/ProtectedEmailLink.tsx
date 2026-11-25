import { type ReactNode, useEffect, useState } from 'react';

type ProtectedEmailLinkProps = {
  className?: string;
  children?: ReactNode;
};

export default function ProtectedEmailLink({ className, children }: ProtectedEmailLinkProps) {
  const [href, setHref] = useState<string>();

  useEffect(() => {
    setHref(['mailto:', 'contact', '@', 'forge3d.tech'].join(''));
  }, []);

  return (
    <a href={href} className={`protected-email ${className ?? ''}`}>
      {children ?? <><span>contact</span><span>@forge3d.tech</span></>}
    </a>
  );
}
