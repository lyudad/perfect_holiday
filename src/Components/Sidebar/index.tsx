import { SidebarBlock, SidebarUl, SidebarLi } from "./styled"

const Sidebar = () => {
    return (
        <SidebarBlock>
            <SidebarUl>
                <SidebarLi value="Dashboard">Dashboard</SidebarLi>
                <SidebarLi value="Users">Users</SidebarLi>
                <SidebarLi value="Profile">Profile</SidebarLi>
                <SidebarLi value="Logout">Logout</SidebarLi>
            </SidebarUl>
        </SidebarBlock>
    )
}
export default Sidebar