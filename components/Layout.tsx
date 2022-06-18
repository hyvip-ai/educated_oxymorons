import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

function Layout(props: LayoutProps) {
  return <div className={`layout ${props.className}`}>{props.children}</div>;
}

export default Layout;
