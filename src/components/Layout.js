// src/components/Layout.js

import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </>
  );
};

export default Layout;
