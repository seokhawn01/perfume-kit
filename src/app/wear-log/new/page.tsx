import { Metadata } from 'next'
import { Container } from '@/components/layout/container'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export const metadata: Metadata = {
  title: '착향 일지 작성',
  description: '오늘 뿌린 향수의 지속력과 확산력을 기록하세요',
}

// P08: 착향 일지 작성 - F002 (인증 O)
// 향수 선택 → 착향 날짜/시간 → 날씨/온도 → TPO → 지속력/확산력 → 메모 입력
// 저장 시 UserPreference.preferredSillage/Longevity 재계산 트리거
export default function WearLogNewPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Container className="py-12">
          <div className="mx-auto max-w-2xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold">착향 일지 작성</h1>
              <p className="text-muted-foreground mt-2">
                오늘 사용한 향수의 착향 경험을 기록하세요
              </p>
            </div>

            {/* TODO: WearLogForm 컴포넌트 구현 */}
            {/* 1단계: 향수 선택 (검색 또는 /explore 연동) */}
            {/* 2단계: 착향 날짜/시간 입력 */}
            {/* 3단계: 날씨/온도 입력 (선택) */}
            {/* 4단계: TPO 선택 (시간대/장소/목적) */}
            {/* 5단계: 지속력/확산력 슬라이더 (1~10) */}
            {/* 6단계: 메모 입력 (선택, 최대 500자) */}
            {/* 저장: Server Action → Supabase insert */}
            <div className="bg-muted rounded-lg p-8 text-center">
              <p className="text-muted-foreground">
                착향 일지 작성 폼 개발 예정
              </p>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  )
}
