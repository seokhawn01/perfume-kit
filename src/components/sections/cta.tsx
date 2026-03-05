import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/layout/container'

export function CTASection() {
  return (
    <section className="py-20">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold">
            지금 나만의 향수 취향을 찾아보세요
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            착향 일지를 기록할수록 추천이 정확해집니다. 오늘의 향수를 기록하고,
            상황에 맞는 추천을 받아보세요.
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/signup">
              <Button size="lg" className="px-8 text-base">
                무료로 시작하기
              </Button>
            </Link>
            <Link href="/explore">
              <Button size="lg" variant="outline" className="px-8 text-base">
                향수 탐색하기
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
