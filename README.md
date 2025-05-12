# 匿名短信发送网站

这是一个允许用户匿名发送短信的网站应用。使用 React、Next.js 和阿里云短信服务构建。

## 功能特点

- 美观的用户界面
- 匿名发送短信
- 手机号码验证
- 响应式设计

## 环境要求

- Node.js 14.0 或更高版本
- 阿里云账号和短信服务配置

## 安装步骤

1. 克隆仓库：
```bash
git clone [repository-url]
```

2. 安装依赖：
```bash
npm install
```

3. 创建 `.env.local` 文件并添加以下环境变量：
```
ALIYUN_ACCESS_KEY_ID=your_access_key_id
ALIYUN_ACCESS_KEY_SECRET=your_access_key_secret
ALIYUN_SMS_SIGN_NAME=your_sms_sign_name
ALIYUN_SMS_TEMPLATE_CODE=your_template_code
```

4. 启动开发服务器：
```bash
npm run dev
```

5. 访问 http://localhost:3000

## 阿里云短信服务配置说明

1. 在阿里云控制台开通短信服务
2. 创建短信签名
3. 创建短信模板（建议使用变量 ${content} 作为短信内容）
4. 获取 AccessKey ID 和 AccessKey Secret
5. 将以上信息填入环境变量文件

## 注意事项

- 请确保遵守当地法律法规
- 不要滥用该服务
- 保护好您的 API 密钥
- 遵守阿里云短信服务的使用规范 