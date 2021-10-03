import React from 'react';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';

const PublicLayout = ({ children }) => {
  return (
    <div className='flex flex-col justify-between h-screen'>
      <Navbar />
      <main className='h-full overflow-y-scroll bg-blue-600'>{children}</main>
      <Footer />
    </div>
  );
};

export default PublicLayout;