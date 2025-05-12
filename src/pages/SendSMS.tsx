import { useState } from 'react'
import {
  Card,
  Form,
  Input,
  Button,
  Alert,
  Typography,
  Space,
  message,
} from 'antd'
import { SendOutlined, SafetyOutlined } from '@ant-design/icons'
import styled from '@emotion/styled'
import { sendSMS } from '@/services/api'

const { TextArea } = Input
const { Title, Text } = Typography

const StyledCard = styled(Card)`
  max-width: 800px;
  margin: 0 auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`

const InfoCard = styled(Card)`
  margin-bottom: 24px;
  background: #f0f7ff;
  border: 1px solid #bae0ff;
`

interface SMSForm {
  phoneNumber: string
  message: string
}

function SendSMS() {
  const [form] = Form.useForm<SMSForm>()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (values: SMSForm) => {
    try {
      setLoading(true)
      await sendSMS(values.phoneNumber, values.message)
      message.success('短信发送成功！')
      form.resetFields()
    } catch (error) {
      message.error('发送失败：' + (error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Title level={2}>发送匿名短信</Title>
      
      <InfoCard bordered={false}>
        <Space>
          <SafetyOutlined style={{ color: '#1677ff', fontSize: 20 }} />
          <Text>
            我们承诺保护您的隐私，所有发送记录都经过加密处理。请勿发送违法或骚扰信息。
          </Text>
        </Space>
      </InfoCard>

      <StyledCard>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          requiredMark="optional"
        >
          <Form.Item
            label="接收手机号码"
            name="phoneNumber"
            rules={[
              { required: true, message: '请输入手机号码' },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: '请输入有效的手机号码',
              },
            ]}
          >
            <Input
              prefix={<SendOutlined />}
              placeholder="请输入接收者的手机号码"
              maxLength={11}
            />
          </Form.Item>

          <Form.Item
            label="短信内容"
            name="message"
            rules={[
              { required: true, message: '请输入短信内容' },
              { max: 70, message: '短信内容不能超过70个字符' },
            ]}
          >
            <TextArea
              placeholder="请输入要发送的短信内容"
              autoSize={{ minRows: 4, maxRows: 6 }}
              showCount
              maxLength={70}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              size="large"
            >
              发送短信
            </Button>
          </Form.Item>
        </Form>
      </StyledCard>
    </Space>
  )
}

export default SendSMS 