import React from 'react';
import Sidebar from '~/Components/Sidebar';

// @ts-ignore
const Layout = ({children}):JSX.Element => {
    return (
        <div>
            <Sidebar/><div>{children}</div>
        </div>
    );
};

export default Layout;