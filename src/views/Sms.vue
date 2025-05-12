<template>
  <div class="sms-page">
    <div class="brand">
      <img src="/logo.png" class="logo" v-if="logoExist" />
      <div class="brand-title">信通 XTone</div>
      <div class="brand-desc">安全 · 极速 · 匿名</div>
    </div>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="phone"
          name="phone"
          label="手机号"
          placeholder="请输入对方手机号"
          type="tel"
          maxlength="11"
          :rules="[{ required: true, message: '请输入手机号' }, { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' }]"
        />
        <van-field
          v-model="message"
          name="message"
          label="内容"
          type="textarea"
          maxlength="200"
          rows="3"
          autosize
          placeholder="请输入要发送的内容"
          :rules="[{ required: true, message: '请输入内容' }]"
        />
      </van-cell-group>
      <div style="margin: 32px 16px 0 16px;">
        <van-button
          round
          block
          type="primary"
          :loading="loading"
          native-type="submit"
        >{{ loading ? '发送中...' : '发送短信' }}</van-button>
      </div>
    </van-form>
    <van-toast id="xtone-toast" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { showToast } from 'vant'

const phone = ref('')
const message = ref('')
const loading = ref(false)
const logoExist = ref(true) // 可根据实际logo情况调整

const onSubmit = () => {
  if (!/^1[3-9]\d{9}$/.test(phone.value)) {
    showToast({ message: '请输入有效手机号', type: 'fail' })
    return
  }
  if (!message.value) {
    showToast({ message: '请输入短信内容', type: 'fail' })
    return
  }
  loading.value = true
  fetch('http://api-sms.sigops.me:8081/api/send-sms', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone: phone.value, message: message.value })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        showToast({ message: '发送成功', type: 'success' })
        phone.value = ''
        message.value = ''
      } else {
        showToast({ message: data.error || '发送失败', type: 'fail' })
      }
    })
    .catch(() => {
      showToast({ message: '网络异常，请稍后再试', type: 'fail' })
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<style scoped>
.sms-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #e0e7ff 0%, #f5f7fa 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 48px;
}
.brand {
  text-align: center;
  margin-bottom: 32px;
}
.logo {
  width: 72px;
  height: 72px;
  margin-bottom: 8px;
  border-radius: 16px;
  box-shadow: 0 2px 12px 0 rgba(95,124,255,0.10);
}
.brand-title {
  font-size: 24px;
  font-weight: 700;
  color: #5f7cff;
  letter-spacing: 2px;
}
.brand-desc {
  font-size: 14px;
  color: #8b9eb7;
  margin-top: 4px;
  letter-spacing: 2px;
}
</style> 