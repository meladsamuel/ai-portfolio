import { ReactNode, FC } from 'react';
import Prompt from '@/components/Prompt';

interface MainLayoutProps {
  children: ReactNode;
}



export default function MainLayout({children}: MainLayoutProps) {
  return (
    <>
      {children}
      <Prompt />
    </>
  );
}
