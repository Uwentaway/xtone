import { useEffect, useState } from 'react'
import {
  Card,
  Table,
  Tag,
  Typography,
  Space,
  Button,
  Popconfirm,
  message,
} from 'antd'
import { DeleteOutlined, ReloadOutlined } from '@ant-design/icons'
import styled from '@emotion/styled'
import { getHistory, deleteHistory } from '@/services/api'
import type { SMSRecord } from '@/types'

const { Title } = Typography

const StyledCard = styled(Card)`
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`

function History() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<SMSRecord[]>([])

  const fetchHistory = async () => {
    try {
      setLoading(true)
      const history = await getHistory()
      setData(history)
    } catch (error) {
      message.error('获取历史记录失败：' + (error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteHistory(id)
      message.success('删除成功')
      fetchHistory()
    } catch (error) {
      message.error('删除失败：' + (error as Error).message)
    }
  }

  useEffect(() => {
    fetchHistory()
  }, [])

  const columns = [
    {
      title: '发送时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: string) => new Date(text).toLocaleString(),
    },
    {
      title: '接收号码',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      render: (text: string) => text.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'),
    },
    {
      title: '短信内容',
      dataIndex: 'message',
      key: 'message',
      ellipsis: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'success' ? 'success' : 'error'}>
          {status === 'success' ? '发送成功' : '发送失败'}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: SMSRecord) => (
        <Popconfirm
          title="确定要删除这条记录吗？"
          onConfirm={() => handleDelete(record.id)}
          okText="确定"
          cancelText="取消"
        >
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
          >
            删除
          </Button>
        </Popconfirm>
      ),
    },
  ]

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Space style={{ justifyContent: 'space-between', width: '100%' }}>
        <Title level={2}>发送历史</Title>
        <Button
          type="primary"
          icon={<ReloadOutlined />}
          onClick={fetchHistory}
          loading={loading}
        >
          刷新
        </Button>
      </Space>

      <StyledCard>
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          loading={loading}
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条记录`,
          }}
        />
      </StyledCard>
    </Space>
  )
}

export default History 