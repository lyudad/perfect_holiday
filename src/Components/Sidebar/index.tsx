import { SidebarBlock, SidebarUl, SidebarLi } from './styled';
import { lang } from 'language/en';
import { Link } from 'react-router-dom';
import { role } from 'constants/constants';

const Sidebar = () => {
  return (
    <SidebarBlock>
      <SidebarUl>
        {role != 'employee' ? (
          <>
            <SidebarLi value="Dashboard">
              <Link to="/dashbord">{`${lang.sidebar['dashboard']}`}</Link>
            </SidebarLi>
            <SidebarLi value="Users">
              <Link to="/users">{`${lang.sidebar['users']}`}</Link>
            </SidebarLi>
          </>
        ) : null}
        {role === 'employee' ? (
          <SidebarLi value="Profile">
            <Link to="/user">{`${lang.sidebar['profile']}`}</Link>
          </SidebarLi>
        ) : null}
        <SidebarLi value="Logout">
          <Link to="/login">{`${lang.sidebar['logout']}`}</Link>
        </SidebarLi>
      </SidebarUl>
    </SidebarBlock>
  );
};
export default Sidebar;
