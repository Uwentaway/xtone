import { Layout, Menu } from 'antd'
import { MessageOutlined, HistoryOutlined } from '@ant-design/icons'
import { useNavigate, useLocation } from 'react-router-dom'
import styled from '@emotion/styled'

const { Sider } = Layout

const StyledSider = styled(Sider)`
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`

const Logo = styled.div`
  height: 64px;
  padding: 16px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: #1677ff;
  border-bottom: 1px solid #f0f0f0;
`

const menuItems = [
  {
    key: '/',
    icon: <MessageOutlined />,
    label: '发送短信',
  },
  {
    key: '/history',
    icon: <HistoryOutlined />,
    label: '发送历史',
  },
]

function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <StyledSider width={200}>
      <Logo>匿名短信</Logo>
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={({ key }) => navigate(key)}
        style={{ height: '100%' }}
      />
    </StyledSider>
  )
}

export default Sidebar 