import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

function Layout(props: LayoutProps) {
  return <div className='layout'>{props.children}</div>;
}

export default Layout;
