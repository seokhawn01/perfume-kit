import { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/layout/container'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: '내 착향 일지',
  description: '내가 기록한 착향 일지 목록을 확인하세요',
}

// P09: 내 착향 일지 목록 - F002 (인증 O)
// 기록한 착향 일지 목록 표시 (날짜, 향수명, 지속력/확산력 요약)
// 착향 일지가 쌓일수록 TPO 추천 정확도 향상
export default function WearLogPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Container className="py-12">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">내 착향 일지</h1>
              <p className="text-muted-foreground mt-2">
                향수를 뿌린 경험을 기록하고 나만의 취향 데이터를 쌓아보세요
              </p>
            </div>
            <Link href="/wear-log/new">
              <Button>착향 일지 기록</Button>
            </Link>
          </div>

          {/* TODO: 착향 일지 카드 목록 (날짜 내림차순) */}
          {/* 각 카드: 향수명, 브랜드, 착향 일시, TPO, 지속력/확산력 요약, 메모 */}
          <div className="bg-muted rounded-lg p-8 text-center">
            <p className="text-muted-foreground">
              아직 기록된 착향 일지가 없습니다
            </p>
            <p className="text-muted-foreground mt-1 text-sm">
              첫 착향 일지를 기록해보세요
            </p>
            <Link href="/wear-log/new" className="mt-4 inline-block">
              <Button variant="outline">첫 일지 기록하기</Button>
            </Link>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  )
}
