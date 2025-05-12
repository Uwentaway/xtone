import { Routes, Route } from 'react-router-dom'
import { Layout } from 'antd'
import styled from '@emotion/styled'
import Sidebar from '@/components/Sidebar'
import SendSMS from '@/pages/SendSMS'
import History from '@/pages/History'

const { Content } = Layout

const StyledLayout = styled(Layout)`
  min-height: 100vh;
`

const StyledContent = styled(Content)`
  padding: 24px;
  background: #fff;
`

function App() {
  return (
    <StyledLayout>
      <Sidebar />
      <StyledContent>
        <Routes>
          <Route path="/" element={<SendSMS />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </StyledContent>
    </StyledLayout>
  )
}

export default App 