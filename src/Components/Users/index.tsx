import React from 'react'
import { Table, Space, message, Button } from 'antd'
import 'antd/dist/antd.css'
import { StyledButton, StyledContent, StyledLayout } from './styles'
import Sidebar from '../Sidebar'
import useUsers from 'hooks/useUsers'
import Loading from 'Components/Loading'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { lang } from 'language/en'
import { url } from 'constants/constants'
const { Column } = Table

const Users = (): JSX.Element => {
  // Достает всех users
  const { error, isLoading, data } = useUsers()
  if (isLoading) return <Loading />
  if (error instanceof Error) return <h1>Error: {error.message}</h1>

  // Меняет is_block true / false
  const { REACT_APP_BASE } = process.env
  const goBlock = async (dataIndex: boolean, key: any) =>
    axios
      .put(`${REACT_APP_BASE}${url.users}${key.id}`, {
        is_block: !dataIndex,
      })
      .then(() => message.success(lang.updateStatus.success))
      .catch(() => message.error(lang.updateStatus.fail))

  return (
    <StyledLayout>
      <Sidebar />
      <StyledContent>
        <StyledButton
          type="primary"
          shape="round"
          htmlType="submit"
          size="large"
        >
          +
        </StyledButton>
        <Table dataSource={data}>
          <Column
            title={lang.userInfo.lastName}
            dataIndex="last_name"
            key="id"
          />
          <Column
            title="Action"
            key="action"
            dataIndex="id"
            render={(dataIndex) => (
              <Space size="middle">
                <Link to={`/admin/${dataIndex}`}>Edit</Link>
              </Space>
            )}
          />
          <Column
            title={lang.userInfo.userStatus}
            dataIndex="is_block"
            key="id"
            render={(dataIndex, key) => (
              <Space size="middle">
                <Button
                  onClick={() => goBlock(dataIndex, key)}
                  htmlType="submit"
                  type="link"
                >
                  {dataIndex
                    ? lang.updateStatus.block
                    : lang.updateStatus.unblock}
                </Button>
              </Space>
            )}
          />
        </Table>
      </StyledContent>
    </StyledLayout>
  )
}
export default Users
