# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

**perfume-kit**은 착향 경험(지속력/확산력) 기반 TPO 상황 맞춤 향수 개인화 추천 서비스입니다.
요구사항 전체는 `docs/PRD.md`, 개발 로드맵은 `docs/ROADMAP.md`를 참조하세요.

## 기술 스택

- **Framework**: Next.js 15.5.3 (App Router + Turbopack)
- **Runtime**: React 19.1.0 + TypeScript 5
- **Styling**: TailwindCSS v4 + shadcn/ui (new-york, base color: neutral)
- **Forms**: React Hook Form + Zod + Server Actions
- **Backend**: Supabase (Auth + DB + Storage) — 연동 예정
- **향수 데이터**: Fragella API → Supabase 시드 데이터로 수집

## 주요 명령어

```bash
npm run dev          # 개발 서버 (Turbopack)
npm run check-all    # typecheck + lint + format:check 통합 실행 (커밋 전 필수)
npm run build        # 프로덕션 빌드
npm run lint:fix     # ESLint 자동 수정
npm run format       # Prettier 포맷팅
npx shadcn@latest add [component]  # shadcn/ui 컴포넌트 추가
```

> Husky pre-commit hook이 설정되어 있어 커밋 시 lint-staged가 자동 실행됩니다.

## 아키텍처

### 디렉토리 구조

```
src/
├── app/                  # Next.js App Router 페이지
│   ├── layout.tsx        # 루트 레이아웃 (ThemeProvider, Toaster 포함)
│   ├── page.tsx          # 홈 (/)
│   ├── login/page.tsx    # 로그인
│   └── signup/page.tsx   # 회원가입
├── components/
│   ├── ui/               # shadcn/ui 기반 기본 컴포넌트 (수정 금지)
│   ├── layout/           # Header, Footer, Container
│   ├── navigation/       # MainNav, MobileNav
│   ├── sections/         # 페이지 섹션 (Hero, Features, CTA)
│   └── providers/        # ThemeProvider 등 Context 프로바이더
└── lib/
    ├── utils.ts           # cn() 등 공통 유틸리티
    └── env.ts             # Zod 기반 환경변수 검증
```

### 핵심 패턴

**환경변수 접근**: 환경변수는 반드시 `src/lib/env.ts`의 `env` 객체를 통해 접근합니다. `process.env`를 직접 사용하지 않습니다. 새 환경변수 추가 시 Zod 스키마에 먼저 등록합니다.

**경로 별칭**: 상대 경로 대신 항상 경로 별칭을 사용합니다.

- `@/components`, `@/lib`, `@/hooks`, `@/ui`

**컴포넌트 export 규칙**:

- 페이지 컴포넌트 (`app/**/page.tsx`) → `export default`
- 나머지 컴포넌트 → `export function` (named export)

**shadcn/ui 컴포넌트**: `src/components/ui/`에 위치하며 직접 수정하지 않습니다. 커스터마이징이 필요하면 래핑 컴포넌트를 만듭니다.

**폼 패턴**: React Hook Form + Zod 스키마 + Server Actions 조합. 폼 스키마는 `src/lib/schemas/`에 분리 정의합니다.

### 계획된 확장 구조 (개발 예정)

```
src/
├── app/
│   ├── (auth)/           # 인증 그룹 라우트
│   ├── onboarding/       # 콜드스타트 온보딩
│   ├── recommend/        # TPO 추천
│   ├── explore/          # 향수 탐색
│   ├── perfumes/[id]/    # 향수 상세
│   ├── wear-log/         # 착향 일지 목록/작성
│   └── mypage/           # 마이페이지
├── lib/
│   ├── supabase/         # Supabase 클라이언트 설정
│   ├── schemas/          # Zod 스키마
│   └── types/            # TypeScript 타입 정의
└── scripts/
    └── seed-perfumes.ts  # Fragella API → Supabase 데이터 수집
```

## 개발 가이드 문서

- `docs/PRD.md` — 기능 명세, 데이터 모델, 추천 알고리즘
- `docs/guides/styling-guide.md` — TailwindCSS v4 스타일링 규칙
- `docs/guides/component-patterns.md` — 컴포넌트 작성 패턴
- `docs/guides/forms-react-hook-form.md` — 폼 처리 가이드
- `docs/guides/nextjs-15.md` — Next.js 15 App Router 패턴
