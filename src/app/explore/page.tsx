import { Metadata } from 'next'
import { Container } from '@/components/layout/container'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export const metadata: Metadata = {
  title: '향수 탐색',
  description: '브랜드, 향 계열, 가격대로 향수를 검색하고 탐색하세요',
}

// P06: 향수 탐색 - F003 (인증 X)
// 향수 이름, 브랜드, 향 계열로 검색하고 필터링
// 결과: 향수 카드 목록 (페이지네이션)
export default function ExplorePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Container className="py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">향수 탐색</h1>
            <p className="text-muted-foreground mt-2">
              74,000개 이상의 향수 데이터에서 원하는 향수를 찾아보세요
            </p>
          </div>

          {/* TODO: 검색 입력 + 필터 UI 구현 */}
          {/* 필터: 브랜드 / 향 계열 / 가격대 */}
          <div className="bg-muted mb-6 rounded-lg p-4">
            <p className="text-muted-foreground text-sm">
              검색 및 필터 UI 개발 예정
            </p>
          </div>

          {/* TODO: 향수 카드 그리드 + 페이지네이션 */}
          <div className="bg-muted rounded-lg p-8 text-center">
            <p className="text-muted-foreground">향수 목록 개발 예정</p>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  )
}
