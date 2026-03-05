import { z } from 'zod'

// 로그인 폼 스키마
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, '이메일을 입력해 주세요.')
    .email('올바른 이메일 주소를 입력해 주세요.'),
  password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다.'),
})

export type LoginFormValues = z.infer<typeof loginSchema>

// 회원가입 폼 스키마
export const signupSchema = z
  .object({
    nickname: z
      .string()
      .min(2, '닉네임은 최소 2자 이상이어야 합니다.')
      .max(20, '닉네임은 최대 20자까지 가능합니다.'),
    email: z
      .string()
      .min(1, '이메일을 입력해 주세요.')
      .email('올바른 이메일 주소를 입력해 주세요.'),
    password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다.'),
    confirmPassword: z.string().min(1, '비밀번호 확인을 입력해 주세요.'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  })

export type SignupFormValues = z.infer<typeof signupSchema>

// 비밀번호 찾기 폼 스키마
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, '이메일을 입력해 주세요.')
    .email('올바른 이메일 주소를 입력해 주세요.'),
})

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>

// 비밀번호 재설정 폼 스키마
export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다.'),
    confirmPassword: z.string().min(1, '비밀번호 확인을 입력해 주세요.'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  })

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>
