// PRD 4. 데이터 모델 - User
export interface User {
  id: string // Supabase Auth UUID
  email: string
  nickname: string
  avatarUrl?: string
  createdAt: Date
  updatedAt: Date
}
