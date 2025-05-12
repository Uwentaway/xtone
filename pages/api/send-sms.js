import Core from '@alicloud/pop-core'

const client = new Core({
  accessKeyId: process.env.ALIYUN_ACCESS_KEY_ID,
  accessKeySecret: process.env.ALIYUN_ACCESS_KEY_SECRET,
  endpoint: 'https://dysmsapi.aliyuncs.com',
  apiVersion: '2017-05-25'
})

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: '只允许 POST 请求' })
  }

  const { to, message } = req.body

  if (!to || !message) {
    return res.status(400).json({ message: '手机号码和消息内容都是必需的' })
  }

  // 验证中国手机号码格式
  const phoneRegex = /^1[3-9]\d{9}$/
  if (!phoneRegex.test(to)) {
    return res.status(400).json({ message: '无效的手机号码格式' })
  }

  const params = {
    RegionId: "cn-hangzhou",
    PhoneNumbers: to,
    SignName: process.env.ALIYUN_SMS_SIGN_NAME,
    TemplateCode: process.env.ALIYUN_SMS_TEMPLATE_CODE,
    TemplateParam: JSON.stringify({
      content: message
    })
  }

  try {
    const result = await client.request('SendSms', params, {
      method: 'POST'
    })

    if (result.Code === 'OK') {
      return res.status(200).json({
        success: true,
        messageId: result.RequestId
      })
    } else {
      throw new Error(result.Message || '发送失败')
    }
  } catch (error) {
    console.error('Aliyun SMS Error:', error)
    return res.status(500).json({
      message: '发送短信时出错',
      error: error.message
    })
  }
} 