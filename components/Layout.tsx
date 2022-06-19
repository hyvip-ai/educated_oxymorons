import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

function Layout(props: LayoutProps) {
  return <main className={`layout ${props.className}`}>{props.children}</main>;
}

export default Layout;
