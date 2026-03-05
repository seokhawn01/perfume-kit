# Perfume Kit

착향 경험(지속력/확산력) 기반 TPO 상황 맞춤 향수 개인화 추천 서비스.

## 프로젝트 개요

**목적**: 사용자가 직접 경험한 착향 데이터를 축적하고, TPO(Time/Place/Occasion) 상황에 맞는 향수를 추천받는 서비스. 타인의 리뷰가 아닌 내 착향 경험에서 출발하는 개인화 추천.

**범위**: MVP v1.0 - 온보딩, TPO 추천, 착향 일지 기록, 향수 탐색, 기본 인증/프로필 (12개 페이지)

**사용자**: 향수에 관심 있는 20~40대 한국 사용자, 향수 입문자, 향덕

## 주요 페이지

| 번호 | 페이지          | 경로               | 인증 |
| ---- | --------------- | ------------------ | ---- |
| P01  | 홈              | `/`                | 선택 |
| P02  | 로그인          | `/login`           | X    |
| P03  | 회원가입        | `/signup`          | X    |
| P04  | 온보딩          | `/onboarding`      | O    |
| P05  | TPO 추천        | `/recommend`       | O    |
| P06  | 향수 탐색       | `/explore`         | X    |
| P07  | 향수 상세       | `/perfumes/[id]`   | X    |
| P08  | 착향 일지 작성  | `/wear-log/new`    | O    |
| P09  | 착향 일지 목록  | `/wear-log`        | O    |
| P10  | 마이페이지      | `/mypage`          | O    |
| P11  | 비밀번호 찾기   | `/forgot-password` | X    |
| P12  | 비밀번호 재설정 | `/reset-password`  | X    |

## 핵심 기능

- **TPO 맞춤 추천 (F001)**: 시간대/장소/목적 선택 → 규칙 기반 추천 엔진 → 향수 최대 5개 추천
- **착향 일지 기록 (F002)**: 지속력/확산력 슬라이더, 날씨/온도/TPO 기록 → 취향 프로필 자동 갱신
- **향수 탐색 (F003)**: 브랜드/향 계열/가격대 필터 검색, 74,000+ 향수 데이터 (Fragella API)
- **콜드스타트 온보딩 (F004)**: 유경험자 카드 스와이프 / 무경험자 이미지/키워드 선택
- **기본 인증 (F010)**: 이메일/비밀번호 회원가입, Supabase Auth 이메일 인증
- **프로필 관리 (F011)**: 닉네임 변경, 프로필 이미지, 취향 프로필 확인, 회원 탈퇴

## 기술 스택

- **Framework**: Next.js 15.5.3 (App Router + Turbopack)
- **Runtime**: React 19.1.0 + TypeScript 5
- **Styling**: TailwindCSS v4 + shadcn/ui (new-york, neutral)
- **Forms**: React Hook Form + Zod + Server Actions
- **Backend**: Supabase (Auth + DB + Storage) - 연동 예정
- **향수 데이터**: Fragella API → Supabase 시드 데이터

## 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (Turbopack)
npm run dev

# 프로덕션 빌드
npm run build

# 커밋 전 검사 (typecheck + lint + format)
npm run check-all
```

## 환경변수 설정

`.env.local` 파일을 생성하고 아래 값을 설정하세요:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## 개발 상태

- 기본 프로젝트 구조 및 12개 페이지 스캐폴딩 완료
- 타입 정의 (User, Perfume, WearLog, UserPreference, OnboardingSwipe, OnboardingKeywordSelection)
- Zod 스키마 (auth, wear-log)
- 인증 폼 컴포넌트 (LoginForm, SignupForm, ForgotPasswordForm, ResetPasswordForm)
- Supabase Auth 연동 예정
- TPO 추천 엔진 구현 예정
- 착향 일지 폼 구현 예정
- 향수 탐색/상세 페이지 구현 예정
- 온보딩 플로우 구현 예정

## 문서

- [PRD 문서](./docs/PRD.md) - 기능 명세, 데이터 모델, 추천 알고리즘
- [개발 로드맵](./docs/ROADMAP.md) - Phase별 개발 계획 및 진행 상황
- [개발 가이드](./CLAUDE.md) - 아키텍처, 코딩 규칙, 주요 명령어
- [스타일링 가이드](./docs/guides/styling-guide.md)
- [컴포넌트 패턴](./docs/guides/component-patterns.md)
- [폼 처리 가이드](./docs/guides/forms-react-hook-form.md)
- [Next.js 15 패턴](./docs/guides/nextjs-15.md)
