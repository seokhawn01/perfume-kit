import { Metadata } from 'next'
import { Container } from '@/components/layout/container'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export const metadata: Metadata = {
  title: '마이페이지',
  description: '프로필 정보와 취향 프로필을 관리하세요',
}

// P10: 마이페이지 - F011 (인증 O)
// 닉네임 변경, 프로필 이미지 업로드, 취향 프로필 확인, 회원 탈퇴
export default function MyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Container className="py-12">
          <div className="mx-auto max-w-2xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold">마이페이지</h1>
              <p className="text-muted-foreground mt-2">
                프로필 정보와 나의 취향 프로필을 관리하세요
              </p>
            </div>

            <div className="space-y-6">
              {/* TODO: 프로필 섹션 */}
              {/* - 프로필 이미지 (Avatar) + 업로드 버튼 (Supabase Storage) */}
              {/* - 닉네임 표시 + 수정 버튼 */}
              {/* - 이메일 (읽기 전용) */}
              <div className="bg-muted rounded-lg p-6">
                <h2 className="mb-4 text-lg font-semibold">내 프로필</h2>
                <p className="text-muted-foreground text-sm">
                  프로필 관리 기능 개발 예정
                </p>
              </div>

              {/* TODO: 취향 프로필 섹션 */}
              {/* - 선호 향 계열 (preferredFamilies) 배지 목록 */}
              {/* - 선호 노트 (preferredNotes) 목록 */}
              {/* - 기피 노트 (dislikedNotes) 목록 */}
              {/* - 선호 지속력/확산력 수치 */}
              {/* - "온보딩 다시 하기" 버튼 → /onboarding */}
              <div className="bg-muted rounded-lg p-6">
                <h2 className="mb-4 text-lg font-semibold">취향 프로필</h2>
                <p className="text-muted-foreground text-sm">
                  온보딩을 완료하면 취향 프로필이 표시됩니다
                </p>
              </div>

              {/* TODO: 통계 섹션 */}
              {/* - 총 착향 일지 수 */}
              {/* - 자주 사용한 향수 TOP 3 */}
              <div className="bg-muted rounded-lg p-6">
                <h2 className="mb-4 text-lg font-semibold">나의 기록</h2>
                <p className="text-muted-foreground text-sm">
                  착향 일지 통계 개발 예정
                </p>
              </div>

              {/* TODO: 계정 관리 섹션 */}
              {/* - 로그아웃 버튼 */}
              {/* - 회원 탈퇴 (위험 영역, Destructive 스타일) */}
              <div className="bg-muted rounded-lg p-6">
                <h2 className="mb-4 text-lg font-semibold">계정 관리</h2>
                <p className="text-muted-foreground text-sm">
                  계정 관리 기능 개발 예정
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
