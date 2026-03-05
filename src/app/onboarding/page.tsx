import { Metadata } from 'next'
import { Container } from '@/components/layout/container'

export const metadata: Metadata = {
  title: '취향 온보딩',
  description: '나의 향수 취향을 알아보고 맞춤 추천을 받아보세요',
}

// P04: 온보딩 - F004 (인증 O)
// 신규 가입자의 취향 파악을 위한 온보딩 플로우
// 유경험자: 향수 카드 스와이프 (좋아요/싫어요)
// 무경험자: 이미지/키워드 선택 (자연, 플로럴, 우디 등)
export default function OnboardingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <Container className="py-12">
          <div className="mx-auto max-w-2xl">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold">나의 향수 취향 찾기</h1>
              <p className="text-muted-foreground mt-2">
                몇 가지 질문으로 취향을 파악하고 맞춤 향수 추천을 받아보세요
              </p>
            </div>

            {/* TODO: OnboardingFlow 컴포넌트 구현 */}
            {/* 단계 1: 향수 경험 여부 선택 */}
            {/* 단계 2-A: 유경험자 → 향수 카드 스와이프 (최소 10개) */}
            {/* 단계 2-B: 무경험자 → 이미지/키워드 선택 (3~5개) */}
            {/* 단계 3: UserPreference 생성 완료 → 홈으로 이동 */}
            <div className="bg-muted rounded-lg p-8 text-center">
              <p className="text-muted-foreground">온보딩 플로우 개발 예정</p>
            </div>
          </div>
        </Container>
      </main>
    </div>
  )
}
