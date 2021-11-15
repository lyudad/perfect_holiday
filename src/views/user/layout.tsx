import React from 'react';

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
