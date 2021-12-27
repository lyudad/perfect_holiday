import { SidebarBlock, MenuBlock } from './styles';
import { lang } from 'language/en';
import { useDispatch } from 'react-redux';
import userOperation from 'Redux/users/userOperation';
import { UnorderedListOutlined, TeamOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import store from 'Redux/store';
import { Badge } from 'antd';

const Sidebar = () => {
  const dispatch = useDispatch();
  const state = store.getState();
  const role = state.person.user.role;

  return (
    <SidebarBlock>
      <MenuBlock
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        theme={'dark'}
      >
        {role != 'employee' &&
          <>
            <Badge count={'2'} offset={[-3, 10]}>
              <MenuBlock.Item key="Dashboard" icon={<UnorderedListOutlined />}>
                <a href='/dashbord'>
                  {`${lang.sidebar['dashboard']}`}
                </a>
              </MenuBlock.Item>
            </Badge>
            <MenuBlock.Item key="Users" icon={<TeamOutlined />}>
              <a href='/users'>
                {`${lang.sidebar['users']}`}
              </a>
            </MenuBlock.Item>
          </>
        }
        {role === 'employee' &&
          <MenuBlock.Item key="Profile" icon={<UserOutlined />}>
            <a href='/user'>
              {`${lang.sidebar['profile']}`}
            </a>
          </MenuBlock.Item>
        }
        <MenuBlock.Item onClick={() => dispatch(userOperation.signOut())} key="Logout" icon={<LogoutOutlined />}>
          <a href='/login'>
            {`${lang.sidebar['logout']}`}
          </a>
        </MenuBlock.Item>
      </MenuBlock>
    </SidebarBlock>
  );
};

export default Sidebar;
