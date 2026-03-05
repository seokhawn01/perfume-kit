import Link from 'next/link'
import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-32">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-6">
            내 착향 경험 기반 향수 추천
          </Badge>

          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            오늘의 상황에 맞는
            <span className="text-primary mt-2 block">향수를 찾아드립니다</span>
          </h1>

          <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg">
            착향 경험(지속력/확산력) 데이터와 TPO(Time/Place/Occasion) 상황을
            결합해 나에게 딱 맞는 향수를 추천받으세요. 타인의 리뷰가 아닌 내
            경험에서 출발합니다.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/signup">
              <Button size="lg" className="px-8 text-base">
                지금 취향 찾기
              </Button>
            </Link>
            <Link href="/explore">
              <Button size="lg" variant="outline" className="px-8 text-base">
                향수 탐색하기
              </Button>
            </Link>
          </div>

          {/* 핵심 수치 */}
          <div className="mt-16 grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">74,000+</div>
              <div className="text-muted-foreground text-sm">향수 데이터</div>
            </div>
            <div>
              <div className="text-2xl font-bold">TPO</div>
              <div className="text-muted-foreground text-sm">상황별 추천</div>
            </div>
            <div>
              <div className="text-2xl font-bold">1:1</div>
              <div className="text-muted-foreground text-sm">개인화 추천</div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
