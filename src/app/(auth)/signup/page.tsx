import { Metadata } from 'next'
import { SignupForm } from '@/components/signup-form'

export const metadata: Metadata = {
  title: '회원가입',
  description: '새 계정을 만들고 나만의 향수 취향을 찾아보세요',
}

export default function SignupPage() {
  return <SignupForm />
}
