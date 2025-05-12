import { useState } from 'react'
import {
  Box,
  Container,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useToast,
  VStack,
  Text,
  Alert,
  AlertIcon,
} from '@chakra-ui/react'
import Head from 'next/head'

export default function Home() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/send-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: phoneNumber,
          message,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: '发送成功',
          description: '短信已成功发送',
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
        setPhoneNumber('')
        setMessage('')
      } else {
        throw new Error(data.message || '发送失败')
      }
    } catch (error) {
      toast({
        title: '发送失败',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>匿名短信发送</title>
        <meta name="description" content="安全匿名地发送短信" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxW="container.md" py={10}>
        <VStack spacing={8}>
          <Heading>匿名短信发送</Heading>
          
          <Alert status="info">
            <AlertIcon />
            请注意：该服务仅供合法用途使用，禁止骚扰他人或发送违法内容。
          </Alert>

          <Box as="form" onSubmit={handleSubmit} width="100%">
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>接收手机号码</FormLabel>
                <Input
                  type="tel"
                  placeholder="请输入手机号码"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>短信内容</FormLabel>
                <Textarea
                  placeholder="请输入要发送的内容"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                />
              </FormControl>

              <Button
                type="submit"
                colorScheme="blue"
                isLoading={loading}
                width="100%"
              >
                发送短信
              </Button>
            </VStack>
          </Box>

          <Text fontSize="sm" color="gray.500">
            发送短信前请确保遵守相关法律法规
          </Text>
        </VStack>
      </Container>
    </>
  )
} 