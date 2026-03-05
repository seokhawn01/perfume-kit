import { Container } from '@/components/layout/container'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Sparkles, BookOpen, Search, Heart } from 'lucide-react'

const features = [
  {
    icon: Sparkles,
    title: 'TPO 맞춤 추천',
    description:
      '오피스, 데이트, 캐주얼 등 오늘의 상황을 선택하면 딱 맞는 향수를 추천해드립니다. 내 착향 데이터가 쌓일수록 추천이 더 정확해집니다.',
  },
  {
    icon: BookOpen,
    title: '착향 일지 기록',
    description:
      '향수를 뿌린 후 지속력과 확산력을 기록하세요. 날씨, 온도, 상황 데이터가 쌓여 나만의 향수 취향 프로필이 만들어집니다.',
  },
  {
    icon: Search,
    title: '향수 탐색',
    description:
      '브랜드, 향 계열, 가격대로 74,000개 이상의 향수를 검색하고 탐색하세요. 탑/미들/베이스 노트 정보와 계절 어울림도 확인할 수 있습니다.',
  },
  {
    icon: Heart,
    title: '취향 온보딩',
    description:
      '처음 시작하는 분도 걱정 없어요. 향수 카드 스와이프 또는 이미지 선택으로 내 취향을 빠르게 파악하고 첫 추천을 받을 수 있습니다.',
  },
]

export function FeaturesSection() {
  return (
    <section className="bg-muted/50 py-20">
      <Container>
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold">핵심 기능</h2>
          <p className="text-muted-foreground mx-auto max-w-2xl">
            내 착향 경험에서 출발하는 향수 추천 서비스. 타인의 리뷰가 아닌 나의
            데이터로 더 정확한 추천을 받으세요.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {features.map(feature => (
            <Card
              key={feature.title}
              className="bg-background border-0 shadow-none"
            >
              <CardHeader>
                <feature.icon className="text-primary mb-2 h-10 w-10" />
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}
