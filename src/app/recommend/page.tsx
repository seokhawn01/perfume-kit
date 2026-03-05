import { Metadata } from 'next'
import { Container } from '@/components/layout/container'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export const metadata: Metadata = {
  title: 'TPO 향수 추천',
  description: '오늘의 시간/장소/목적에 맞는 향수를 추천받으세요',
}

// P05: TPO 추천 - F001 (인증 O)
// 사용자가 시간대/장소/목적을 선택하면 규칙 기반 추천 엔진이 향수를 추천
// 추천 스코어 = TPO 매칭점수 + 취향 매칭점수 + 착향일지 보정점수
export default function RecommendPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Container className="py-12">
          <div className="mx-auto max-w-2xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold">오늘의 TPO 향수 추천</h1>
              <p className="text-muted-foreground mt-2">
                현재 상황을 선택하면 가장 어울리는 향수를 추천해드립니다
              </p>
            </div>

            {/* TODO: TPO 선택 폼 구현 */}
            {/* 시간대: 아침 / 낮 / 저녁 / 밤 */}
            {/* 장소: 오피스 / 데이트 / 캐주얼 / 포멀 */}
            {/* 목적: 자유 입력 또는 선택 */}
            <div className="space-y-4">
              <div className="bg-muted rounded-lg p-6">
                <h2 className="mb-4 text-lg font-semibold">1단계: 상황 선택</h2>
                <p className="text-muted-foreground text-sm">
                  TPO 선택 UI 개발 예정
                </p>
              </div>

              {/* TODO: 추천 결과 향수 카드 목록 표시 (최대 5개) */}
              <div className="bg-muted rounded-lg p-6">
                <h2 className="mb-4 text-lg font-semibold">추천 결과</h2>
                <p className="text-muted-foreground text-sm">
                  추천 결과 카드 개발 예정
                </p>
              </div>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  )
}
