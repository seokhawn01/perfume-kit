// 인증 페이지 공통 레이아웃 (로그인, 회원가입, 비밀번호 관련)
// 헤더/푸터 없이 중앙 정렬 레이아웃 적용
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">{children}</div>
    </div>
  )
}
