import React from 'react';



// @ts-ignore
const Layout = ({children}):JSX.Element => {
    return (
        <div>
            <div>{children}</div>
        </div>
    );
};

export default Layout;