import { Metadata } from 'next'
import { Container } from '@/components/layout/container'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

// P07: 향수 상세 - F003 (인증 X)
// 향수의 브랜드, 노트(탑/미들/베이스), 계열, TPO 태그, 지속력/확산력 표시
// 인증 사용자: 착향 일지 작성 버튼 표시

interface PerfumeDetailPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({
  params,
}: PerfumeDetailPageProps): Promise<Metadata> {
  const { id } = await params
  return {
    title: `향수 상세 - ${id}`,
    description: '향수의 노트, 계열, TPO 태그, 지속력/확산력 정보를 확인하세요',
  }
}

export default async function PerfumeDetailPage({
  params,
}: PerfumeDetailPageProps) {
  const { id } = await params

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Container className="py-12">
          <div className="mx-auto max-w-3xl">
            {/* TODO: 향수 상세 정보 표시 */}
            {/* - 향수명, 브랜드명, 농도(EDP/EDT/EDC) */}
            {/* - 향 계열 (family) 배지 */}
            {/* - 탑/미들/베이스 노트 목록 */}
            {/* - 지속력/확산력 시각화 (1~10 바) */}
            {/* - TPO 태그, 어울리는 계절 */}
            {/* - 인증 사용자: "착향 일지 기록하기" → /wear-log/new?perfumeId={id} */}
            <div className="bg-muted rounded-lg p-8 text-center">
              <p className="text-muted-foreground text-sm">향수 ID: {id}</p>
              <p className="text-muted-foreground mt-2">
                향수 상세 페이지 개발 예정
              </p>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  )
}
