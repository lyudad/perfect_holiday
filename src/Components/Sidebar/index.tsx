import { SidebarBlock, SidebarUl, SidebarLi } from './styled'
import { lang } from 'language/en'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <SidebarBlock>
      <SidebarUl>
        <SidebarLi value="Dashboard">
          {`${lang.sidebar['dashboard']}`}
        </SidebarLi>
        <SidebarLi value="Users">
          <Link to="/users">{`${lang.sidebar['users']}`}</Link>
        </SidebarLi>
        <SidebarLi value="Profile">{`${lang.sidebar['profile']}`}</SidebarLi>
        <SidebarLi value="Logout">{`${lang.sidebar['logout']}`}</SidebarLi>
      </SidebarUl>
    </SidebarBlock>
  )
}
export default Sidebar
