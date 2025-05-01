import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { ReactNode } from 'react';
import './Layout.css';

interface Props {
  children: ReactNode;
}

export default function DefaultLayout({ children }: Props) {
  return (
    <div className="layout-container">
      <Sidebar />
      <main className="main-content">
        <Header />
        {children}
      </main>
    </div>
  );
}
