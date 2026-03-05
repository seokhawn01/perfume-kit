# Perfume Kit - AI Agent 개발 규칙

## 1. 프로젝트 개요

**perfume-kit**: 착향 경험(지속력/확산력) 기반 TPO 상황 맞춤 향수 개인화 추천 서비스

- **스택**: Next.js 15.5.3 (App Router + Turbopack) / React 19 / TypeScript 5 / TailwindCSS v4 / shadcn/ui (new-york, neutral) / Supabase / React Hook Form + Zod
- **현재 상태**: Phase 0 완료 (기본 구조, 라우트, 타입, 폼 UI). **다음 목표: Phase 1 Supabase 연동 + 인증 시스템**
- **전체 명세**: `docs/PRD.md` / **개발 순서**: `docs/ROADMAP.md`

---

## 2. 디렉토리 구조 및 파일 배치 규칙

### 필수 배치 위치

| 파일 종류                | 위치                                          |
| ------------------------ | --------------------------------------------- |
| 페이지                   | `src/app/**/page.tsx`                         |
| 인증 그룹 페이지         | `src/app/(auth)/**/page.tsx`                  |
| shadcn/ui 기본 컴포넌트  | `src/components/ui/` (수정 금지)              |
| 레이아웃 컴포넌트        | `src/components/layout/`                      |
| 네비게이션 컴포넌트      | `src/components/navigation/`                  |
| 페이지 섹션 컴포넌트     | `src/components/sections/`                    |
| 폼 컴포넌트              | `src/components/` 루트 (예: `login-form.tsx`) |
| Context 프로바이더       | `src/components/providers/`                   |
| Zod 폼 스키마            | `src/lib/schemas/`                            |
| TypeScript 타입 정의     | `src/lib/types/`                              |
| 공통 유틸리티            | `src/lib/utils.ts`                            |
| 환경변수                 | `src/lib/env.ts`                              |
| Supabase 클라이언트      | `src/lib/supabase/client.ts` (브라우저)       |
| Supabase 서버 클라이언트 | `src/lib/supabase/server.ts`                  |
| Supabase 미들웨어        | `src/lib/supabase/middleware.ts`              |
| Next.js 미들웨어         | `src/middleware.ts`                           |
| DB 마이그레이션          | `supabase/migrations/*.sql`                   |
| 시드 스크립트            | `scripts/seed-perfumes.ts`                    |

### 타입 등록 규칙

- 새 타입 추가 시: `src/lib/types/` 에 파일 생성 → `src/lib/types/index.ts`에 barrel export 추가
- **`index.ts` 수정 없이 타입 파일만 추가하면 안 됨**

---

## 3. 코드 작성 규칙

### export 방식

```tsx
// ✅ 페이지 컴포넌트
export default function OnboardingPage() { ... }

// ✅ 나머지 모든 컴포넌트
export function LoginForm() { ... }
export function Header() { ... }
```

### 경로 별칭 (상대 경로 금지)

```tsx
// ✅
import { LoginForm } from '@/components/login-form'
import { env } from '@/lib/env'

// ❌
import { LoginForm } from '../../components/login-form'
```

### 환경변수 접근

```tsx
// ✅ env 객체 통해서만 접근
import { env } from '@/lib/env'
const url = env.NEXT_PUBLIC_SUPABASE_URL

// ❌ 직접 접근 금지
const url = process.env.NEXT_PUBLIC_SUPABASE_URL
```

- 새 환경변수 추가 시 **반드시 `src/lib/env.ts` Zod 스키마에 먼저 등록**

### TypeScript

- `any` 타입 사용 금지
- Props는 반드시 interface 또는 type으로 정의
- 제네릭 활용 (타입 안전성)

---

## 4. 컴포넌트 작성 규칙

### shadcn/ui 사용

```tsx
// ✅ ui 컴포넌트를 그대로 import해서 사용
import { Button } from '@/components/ui/button'

// ✅ 커스터마이징 필요 시 래핑 컴포넌트 생성
export function PrimaryButton({ children, ...props }) {
  return (
    <Button variant="default" size="lg" {...props}>
      {children}
    </Button>
  )
}

// ❌ src/components/ui/ 파일 직접 수정 금지
```

- shadcn/ui 새 컴포넌트 추가: `npx shadcn@latest add [component]`

### Server / Client 컴포넌트 원칙

- **Server Component 우선** — 데이터 패칭, SEO, 정적 렌더링
- `'use client'`는 상호작용(useState, useEffect, 이벤트 핸들러)이 필요할 때만
- 서버 컴포넌트에서 직접 Supabase 서버 클라이언트 사용 가능
- 클라이언트 컴포넌트에서는 브라우저 클라이언트 사용

### 반응형 필수

- 모바일 우선 (375px~430px 기준)
- Tailwind 반응형 prefix 사용: `sm:`, `md:`, `lg:`

---

## 5. 폼 처리 규칙

### 표준 패턴

```tsx
// 1. src/lib/schemas/[기능].ts 에 Zod 스키마 정의
export const loginSchema = z.object({ ... })
export type LoginFormValues = z.infer<typeof loginSchema>

// 2. 폼 컴포넌트: React Hook Form + zodResolver
'use client'
const form = useForm<LoginFormValues>({
  resolver: zodResolver(loginSchema),
  defaultValues: { ... }
})

// 3. 제출 핸들러는 Server Action으로 구현
const onSubmit = async (values: LoginFormValues) => {
  await serverAction(values)
}
```

- 폼 스키마 파일: `src/lib/schemas/auth.ts`, `src/lib/schemas/wear-log.ts` 등
- **기존 스키마 파일에 새 스키마를 추가하거나 새 파일 생성**
- `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormMessage` 컴포넌트 사용 필수

---

## 6. Supabase 연동 규칙 (Phase 1~)

### 클라이언트 종류

| 상황                          | 사용 클라이언트              |
| ----------------------------- | ---------------------------- |
| 브라우저 클라이언트 컴포넌트  | `src/lib/supabase/client.ts` |
| 서버 컴포넌트 / Server Action | `src/lib/supabase/server.ts` |

### Server Action 패턴

```tsx
'use server'
import { createServerClient } from '@/lib/supabase/server'

export async function loginAction(values: LoginFormValues) {
  const supabase = await createServerClient()
  const { error } = await supabase.auth.signInWithPassword(values)
  if (error) return { success: false, message: error.message }
  redirect('/')
}
```

### DB 규칙

- 테이블 변경은 `supabase/migrations/` SQL 파일로 관리
- RLS(Row Level Security) 정책 필수: 모든 테이블에 본인 데이터만 CRUD 가능
- 인덱스: `perfumes(family, brand)`, `wear_logs(user_id, created_at)`

---

## 7. 스타일링 규칙

### TailwindCSS v4

```tsx
// ✅ 유틸리티 클래스 사용
<div className="flex items-center gap-4 rounded-lg bg-card p-6 shadow-sm">

// ❌ 인라인 스타일 금지
<div style={{ display: 'flex', padding: '24px' }}>
```

- 조건부 클래스: `cn()` 유틸리티 사용 (`@/lib/utils`)
- 색상은 CSS 변수 토큰 사용: `bg-background`, `text-foreground`, `bg-primary`, `text-muted-foreground` 등
- **하드코딩 hex 색상 금지** (`bg-[#ff0000]` 형태 금지)
- 클래스 정렬: `prettier-plugin-tailwindcss`가 자동 처리 (수동 정렬 불필요)

---

## 8. 개발 워크플로우 규칙

### 작업 순서

1. `docs/ROADMAP.md`에서 현재 단계의 Task 확인
2. Task 명세에 따라 구현
3. **각 단계(Step) 완료 후 중단하고 확인 대기** — 자동으로 다음 단계 진행 금지
4. 구현 완료 후 `npm run check-all` 실행 (typecheck + lint + format:check)
5. 비즈니스 로직/API 연동 시 **Playwright MCP로 E2E 테스트 필수**
6. `docs/ROADMAP.md` 완료 상태 업데이트

### 커밋 전 필수

```bash
npm run check-all   # typecheck + lint + format:check 통합 실행
```

### 주요 명령어

```bash
npm run dev          # 개발 서버 (Turbopack)
npm run build        # 프로덕션 빌드
npm run lint:fix     # ESLint 자동 수정
npm run format       # Prettier 포맷팅
npx shadcn@latest add [component]  # shadcn/ui 컴포넌트 추가
```

---

## 9. 데이터 모델 참조

| 타입                         | 파일                          | 핵심 필드                                                    |
| ---------------------------- | ----------------------------- | ------------------------------------------------------------ |
| `User`                       | `src/lib/types/user.ts`       | id(Supabase UUID), email, nickname                           |
| `Perfume`                    | `src/lib/types/perfume.ts`    | brand, name, family, tpoTags, sillage(1~10), longevity(1~10) |
| `WearLog`                    | `src/lib/types/wear-log.ts`   | userId, perfumeId, tpoTime, tpoPlace, longevity, sillage     |
| `UserPreference`             | `src/lib/types/preference.ts` | preferredFamilies, preferredNotes, dislikedNotes             |
| `OnboardingSwipe`            | `src/lib/types/preference.ts` | perfumeId, liked(boolean)                                    |
| `OnboardingKeywordSelection` | `src/lib/types/preference.ts` | keyword, imageId                                             |

### TPO 값 (WearLog, 폼 스키마 일치 필수)

- `TpoTime`: `'아침' | '낮' | '저녁' | '밤'`
- `TpoPlace`: `'오피스' | '데이트' | '캐주얼' | '포멀'`
- `Weather`: `'맑음' | '흐림' | '비' | '눈'`

---

## 10. 다중 파일 동시 수정 규칙

| 작업                    | 함께 수정해야 할 파일                                      |
| ----------------------- | ---------------------------------------------------------- |
| 새 환경변수 추가        | `src/lib/env.ts` (Zod 스키마) + `.env`                     |
| 새 TypeScript 타입 추가 | `src/lib/types/[신규].ts` + `src/lib/types/index.ts`       |
| 새 폼 기능 추가         | `src/lib/schemas/[기능].ts` + 폼 컴포넌트 + Server Action  |
| Supabase 테이블 추가    | `supabase/migrations/[timestamp].sql` + `src/lib/types/`   |
| 새 페이지 추가          | `src/app/**/page.tsx` (metadata 포함) + `docs/ROADMAP.md`  |
| 헤더 인증 상태 변경     | `src/components/layout/header.tsx` + 관련 Server Component |

---

## 11. 금지 사항

- `process.env.*` 직접 접근 — `env` 객체 사용
- `src/components/ui/` 파일 직접 수정
- 상대 경로 import (`../`, `./`) — `@/` 별칭 사용
- `any` 타입 사용
- 인라인 스타일 (`style={{}}`) — Tailwind 클래스 사용
- 하드코딩 색상 (`#hex`, `rgb()`) — CSS 변수 토큰 사용
- 한 단계 완료 전 다음 단계 자동 진행
- E2E 테스트 없이 비즈니스 로직/API 연동 완료 처리
- `src/lib/types/index.ts` 업데이트 없이 새 타입 파일만 추가
- `any` 타입 우회를 위한 `as unknown as T` 패턴 남용
