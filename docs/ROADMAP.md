# Perfume Kit 개발 로드맵

착향 경험(지속력/확산력) 기반 TPO 상황 맞춤 향수 개인화 추천 서비스

## 개요

Perfume Kit은 향수에 관심 있는 20~40대 사용자를 위한 개인화 향수 추천 서비스로 다음 기능을 제공합니다:

- **TPO 상황별 향수 추천 (F001)**: 시간/장소/목적에 따른 규칙 기반 추천 알고리즘
- **착향 일지 기록 (F002)**: 지속력/확산력 데이터를 축적하여 추천 정확도 향상
- **콜드스타트 온보딩 (F004)**: 유경험자 스와이프 / 무경험자 키워드 선택으로 취향 파악
- **향수 검색 및 탐색 (F003)**: 브랜드, 향 계열, 가격대 기반 검색/필터링
- **기본 인증 (F010)**: 이메일/패스워드 기반 회원 시스템
- **프로필 관리 (F011)**: 닉네임, 프로필 이미지, 취향 프로필 관리

## 개발 워크플로우

1. **작업 계획**

- 기존 코드베이스를 학습하고 현재 상태를 파악
- 새로운 작업을 포함하도록 `ROADMAP.md` 업데이트
- 우선순위 작업은 마지막 완료된 작업 다음에 삽입

2. **작업 생성**

- 기존 코드베이스를 학습하고 현재 상태를 파악
- `/tasks` 디렉토리에 새 작업 파일 생성
- 명명 형식: `XXX-description.md` (예: `001-setup.md`)
- 고수준 명세서, 관련 파일, 수락 기준, 구현 단계 포함
- API/비즈니스 로직 작업 시 "## 테스트 체크리스트" 섹션 필수 포함 (Playwright MCP 테스트 시나리오 작성)
- 예시를 위해 `/tasks` 디렉토리의 마지막 완료된 작업 참조
- 초기 상태의 샘플로 `000-sample.md` 참조

3. **작업 구현**

- 작업 파일의 명세서를 따름
- 기능과 기능성 구현
- API 연동 및 비즈니스 로직 구현 시 Playwright MCP로 테스트 수행 필수
- 각 단계 후 작업 파일 내 단계 진행 상황 업데이트
- 구현 완료 후 Playwright MCP를 사용한 E2E 테스트 실행
- 테스트 통과 확인 후 다음 단계로 진행
- 각 단계 완료 후 중단하고 추가 지시를 기다림

4. **로드맵 업데이트**

- 로드맵에서 완료된 작업을 완료 표시로 갱신

---

## 개발 단계

### Phase 0: 프로젝트 초기 설정

- **Task 001: 프로젝트 구조 및 기본 설정** - 완료
  - See: 초기 커밋으로 완료
  - Next.js 15.5.3 (App Router + Turbopack) 프로젝트 생성
  - TailwindCSS v4 + shadcn/ui (new-york, neutral) 설정
  - ESLint + Prettier + Husky pre-commit hook 설정
  - `src/lib/env.ts` Zod 기반 환경변수 검증 구성
- **Task 002: 전체 라우트 구조 및 페이지 골격 생성** - 완료
  - See: 초기 커밋으로 완료
  - 12개 페이지 라우트 파일 생성 (App Router 기반)
  - `(auth)` 그룹 라우트: login, signup, forgot-password, reset-password
  - 메인 라우트: onboarding, recommend, explore, perfumes/[id], wear-log, wear-log/new, mypage
  - 각 페이지에 metadata 및 기본 레이아웃 적용
- **Task 003: TypeScript 타입 정의 및 Zod 스키마 설계** - 완료
  - See: 초기 커밋으로 완료
  - `src/lib/types/`: User, Perfume, WearLog, UserPreference, OnboardingSwipe, OnboardingKeywordSelection 인터페이스 정의
  - `src/lib/schemas/auth.ts`: 로그인, 회원가입, 비밀번호 찾기, 비밀번호 재설정 Zod 스키마
  - `src/lib/types/index.ts` barrel export 구성
- **Task 004: 공통 레이아웃 및 네비게이션 컴포넌트** - 완료
  - See: 초기 커밋으로 완료
  - Header (sticky, 반응형, 로고 + 네비게이션 + 인증 버튼 + 테마 토글)
  - Footer (서비스 정보)
  - Container (max-width 래퍼)
  - MainNav (데스크톱 네비게이션 메뉴)
  - MobileNav (Sheet 기반 모바일 메뉴)
  - ThemeProvider + ThemeToggle (다크모드 지원)
- **Task 005: 홈페이지 섹션 컴포넌트** - 완료
  - See: 초기 커밋으로 완료
  - HeroSection (서비스 소개 + CTA)
  - FeaturesSection (핵심 기능 소개 카드)
  - CTASection (회원가입/착향 일지 유도)
- **Task 006: 인증 폼 UI 컴포넌트** - 완료
  - See: 초기 커밋으로 완료
  - LoginForm (React Hook Form + Zod, 비밀번호 표시/숨김 토글)
  - SignupForm (닉네임 + 이메일 + 비밀번호 + 비밀번호 확인)
  - ForgotPasswordForm (이메일 입력)
  - ResetPasswordForm (새 비밀번호 + 확인)
  - `(auth)` 그룹 라우트 레이아웃 (중앙 정렬 카드 레이아웃)

---

### Phase 1: Supabase 연동 및 인증 시스템 (F010)

- **Task 007: Supabase 프로젝트 설정 및 클라이언트 구성** - 우선순위
  - Supabase 프로젝트 생성 및 환경변수 등록 (`env.ts` 스키마 확장)
  - `src/lib/supabase/client.ts` 브라우저 클라이언트 설정
  - `src/lib/supabase/server.ts` 서버 클라이언트 설정 (Server Components / Server Actions 용)
  - `src/lib/supabase/middleware.ts` 세션 갱신 미들웨어 구성
  - `src/middleware.ts` Next.js 미들웨어에 Supabase 세션 관리 통합
- **Task 008: 데이터베이스 스키마 생성 (Supabase Migration)**
  - `supabase/migrations/` SQL 마이그레이션 파일 작성
  - users 프로필 테이블 (Supabase Auth UUID 연결)
  - perfumes 테이블 (Fragella 데이터 구조)
  - wear_logs 테이블 (착향 일지)
  - user_preferences 테이블 (취향 프로필)
  - onboarding_swipes / onboarding_keyword_selections 테이블
  - RLS (Row Level Security) 정책 설정: 본인 데이터만 CRUD 가능
  - 인덱스 설정: perfumes(family, brand), wear_logs(user_id, created_at)
- **Task 009: 이메일/패스워드 인증 연동**
  - Supabase Auth signUp (회원가입 + 이메일 인증 발송)
  - Supabase Auth signInWithPassword (로그인)
  - Supabase Auth signOut (로그아웃)
  - 회원가입 시 users 프로필 테이블에 닉네임 자동 생성 (DB trigger 또는 Server Action)
  - 기존 LoginForm, SignupForm의 TODO를 Server Actions으로 구현
  - Playwright MCP로 회원가입 → 로그인 → 로그아웃 E2E 테스트
- **Task 010: 비밀번호 찾기/재설정 연동**
  - Supabase Auth resetPasswordForEmail (비밀번호 찾기 이메일 발송)
  - Supabase Auth updateUser (새 비밀번호 설정)
  - `/reset-password` 페이지에서 Supabase 토큰 파라미터 처리
  - 기존 ForgotPasswordForm, ResetPasswordForm의 TODO를 Server Actions으로 구현
  - Playwright MCP로 비밀번호 재설정 플로우 테스트
- **Task 011: 인증 상태 기반 UI 분기**
  - Header 컴포넌트: 로그인 상태에 따라 버튼 변경 (로그인/회원가입 vs 마이페이지/로그아웃)
  - 홈페이지: 비인증 사용자(서비스 소개 + 회원가입 CTA) vs 인증 사용자(오늘의 추천 + 최근 일지)
  - 인증 필요 페이지 접근 제어: onboarding, recommend, wear-log, mypage
  - 미인증 접근 시 `/login`으로 리다이렉트 (redirect URL 보존)
- **Task 011-1: 인증 시스템 통합 테스트**
  - Playwright MCP를 사용한 전체 인증 플로우 E2E 테스트
  - 회원가입 → 로그인 → 인증 상태 확인 → 로그아웃 시나리오
  - 미인증 사용자 보호 라우트 접근 차단 테스트
  - 에러 핸들링 테스트 (잘못된 이메일, 비밀번호 불일치 등)

---

### Phase 2: 콜드스타트 온보딩 (F004)

- **Task 012: 온보딩 플로우 UI 구현** - 우선순위
  - 온보딩 진행률 표시 (Progress 컴포넌트)
  - Step 1: 향수 경험 여부 선택 화면 (유경험자 / 무경험자 카드 선택)
  - Step 2-A 유경험자: 향수 카드 스와이프 UI (좋아요/싫어요, 최소 10개, 진행 카운터)
  - Step 2-B 무경험자: 이미지/키워드 카드 그리드 (6개 키워드: 자연/플로럴/우디/시트러스/머스크/스파이시, 3~5개 선택)
  - Step 3: 완료 화면 (취향 프로필 요약 + 홈으로 이동 버튼)
  - 더미 데이터로 스와이프 향수 카드 구현 (이미지 + 이름 + 브랜드 + 향 계열)
- **Task 013: 온보딩 비즈니스 로직 및 API 연동**
  - 유경험자 스와이프 결과 → UserPreference 변환 로직 구현
    - 좋아요 향수 family 빈도 상위 3개 → preferredFamilies
    - 좋아요 향수 top/middle 노트 빈도 상위 10개 → preferredNotes
    - 싫어요 향수 base 노트 빈도 상위 5개 → dislikedNotes
    - preferredSillage / preferredLongevity = 5 (기본 중간값)
  - 무경험자 키워드 → preferredFamilies 매핑 (자연->그린, 플로럴->플로럴 등)
  - Server Action: onboarding_swipes / onboarding_keyword_selections 저장
  - Server Action: user_preferences 생성/업데이트
  - 온보딩 완료 여부 확인 (user_preferences 존재 여부) → 미완료 시 온보딩 유도
  - Playwright MCP로 유경험자/무경험자 온보딩 완료 플로우 테스트

---

### Phase 3: 향수 탐색 및 상세 (F003)

- **Task 014: 향수 카드 및 공통 UI 컴포넌트** - 우선순위
  - PerfumeCard 컴포넌트 (이미지 + 브랜드 + 이름 + 향 계열 배지 + 지속력/확산력 바)
  - PerfumeCardSkeleton (로딩 상태)
  - SearchInput 컴포넌트 (디바운스 검색)
  - FilterBar 컴포넌트 (브랜드 / 향 계열 / 가격대 드롭다운 필터)
  - Pagination 컴포넌트
- **Task 015: 향수 탐색 페이지 기능 구현**
  - `/explore` 페이지 UI 완성 (검색 + 필터 + 향수 카드 그리드)
  - Supabase에서 향수 목록 조회 (서버 컴포넌트, 페이지네이션)
  - 검색: 향수명 / 브랜드명 부분 일치 검색 (ilike)
  - 필터: 향 계열, 브랜드, 가격대 다중 필터 적용
  - URL 검색 파라미터로 필터 상태 관리 (searchParams)
  - 빈 결과 및 에러 상태 UI
  - Playwright MCP로 검색/필터링/페이지네이션 테스트
- **Task 016: 향수 상세 페이지 구현**
  - `/perfumes/[id]` 페이지 UI 완성
  - 향수 기본 정보 (이미지, 브랜드, 이름, 농도, 향 계열)
  - 노트 피라미드 (탑/미들/베이스 노트 시각화)
  - 지속력/확산력 게이지 바
  - TPO 태그 및 계절 태그 배지 목록
  - "착향 일지 기록" 버튼 (→ `/wear-log/new?perfumeId=[id]`)
  - Supabase에서 향수 단건 조회 (서버 컴포넌트, generateMetadata)

---

### Phase 4: 착향 일지 (F002)

- **Task 017: 착향 일지 작성 페이지 UI 및 폼 구현** - 우선순위
  - `src/lib/schemas/wear-log.ts` Zod 스키마 확장 (폼 검증용)
  - 향수 선택 (검색 가능한 콤보박스 또는 URL 파라미터로 사전 선택)
  - 착향 날짜/시간 선택 (DatePicker)
  - 날씨 선택 (맑음/흐림/비/눈 아이콘 버튼)
  - 온도 입력 (숫자 입력)
  - TPO 선택: 시간대(아침/낮/저녁/밤), 장소(오피스/데이트/캐주얼/포멀), 목적(자유 입력)
  - 지속력 / 확산력 슬라이더 (1~10, 단계별 라벨 표시)
  - 메모 입력 (Textarea, 선택사항)
- **Task 018: 착향 일지 CRUD 및 목록 구현**
  - Server Action: wear_logs 테이블 INSERT (착향 일지 저장)
  - 저장 시 UserPreference.preferredSillage/preferredLongevity 재계산 트리거 (전체 WearLog 평균값)
  - `/wear-log` 목록 페이지: 날짜 내림차순 카드 리스트
  - 각 카드: 향수명, 브랜드, 착향 일시, TPO 배지, 지속력/확산력 바, 메모 미리보기
  - 착향 일지 삭제 기능 (확인 다이얼로그)
  - 빈 목록 상태 UI ("첫 착향 일지를 기록해보세요")
  - Playwright MCP로 착향 일지 작성 → 목록 확인 → 삭제 플로우 테스트

---

### Phase 5: TPO 향수 추천 (F001)

- **Task 019: TPO 선택 폼 UI 구현** - 우선순위
  - 시간대 선택 (아침/낮/저녁/밤 - 아이콘 + 텍스트 카드)
  - 장소 선택 (오피스/데이트/캐주얼/포멀 - 아이콘 + 텍스트 카드)
  - 목적 선택 (프레젠테이션/미팅/데이트/운동 등 - 태그 형태 다중 선택)
  - 선택 완료 후 "추천받기" 버튼
- **Task 020: 규칙 기반 추천 알고리즘 구현**
  - 1단계: TPO 하드 필터링 (perfumes.tpoTags와 선택 TPO 1개 이상 겹치는 향수 추출)
  - 2단계: 취향 매칭 스코어 계산
    - 선호 향 계열 일치: +3점
    - 선호 노트 포함: 노트당 +1점
    - 기피 노트 포함: 노트당 -2점
    - 선호 확산력/지속력 범위 일치: 각 +1점
  - 3단계: 착향 일지 보정 (동일 향수 같은 TPO 기록 있으면 상위 노출)
  - 4단계: 상위 5개 반환 + 추천 이유 텍스트 생성
  - Edge Case 처리: UserPreference 없음(인기 TOP 10 fallback), 결과 5개 미만(조건 순차 완화), 동점(WearLog 기록 수 우선)
  - Server Action 또는 API Route로 추천 로직 구현
  - Playwright MCP로 TPO 선택 → 추천 결과 확인 테스트
- **Task 021: 추천 결과 UI 및 홈페이지 통합**
  - 추천 결과 향수 카드 목록 (최대 5개, 추천 이유 텍스트 포함)
  - 추천 향수 카드 탭 → 향수 상세 페이지 이동
  - 홈페이지 인증 사용자 영역: "오늘의 TPO 추천" 섹션 추가
  - 홈페이지 비인증 사용자 영역: "인기 향수 TOP 10" 섹션 (WearLog 기록 수 DESC 기준)
  - 온보딩 미완료 사용자: 추천 페이지 접근 시 온보딩 유도 배너 표시
- **Task 021-1: 추천 시스템 통합 테스트**
  - Playwright MCP를 사용한 전체 추천 플로우 E2E 테스트
  - 온보딩 완료 사용자 TPO 추천 정상 동작 확인
  - 착향 일지 추가 후 추천 결과 변화 검증
  - Edge Case 시나리오 테스트 (데이터 없음, 결과 부족 등)

---

### Phase 6: 마이페이지 및 프로필 관리 (F011)

- **Task 022: 마이페이지 기능 구현** - 우선순위
  - 프로필 섹션: Avatar + 닉네임 + 이메일(읽기 전용)
  - 닉네임 수정 (인라인 편집 또는 모달 폼)
  - 프로필 이미지 업로드 (Supabase Storage 연동)
  - 취향 프로필 섹션: preferredFamilies 배지, preferredNotes 목록, dislikedNotes 목록, 지속력/확산력 수치
  - "온보딩 다시 하기" 버튼 (→ `/onboarding`, 기존 UserPreference 초기화)
  - 나의 기록 섹션: 총 착향 일지 수, 자주 사용한 향수 TOP 3
  - 계정 관리: 로그아웃 버튼, 회원 탈퇴 (확인 다이얼로그 + Supabase Auth deleteUser)
  - Playwright MCP로 프로필 수정 → 이미지 업로드 → 로그아웃 → 회원 탈퇴 테스트

---

### Phase 7: 향수 시드 데이터 수집 (Fragella API)

- **Task 023: Fragella API 연동 및 시드 스크립트 작성** - 우선순위
  - Fragella API 키 발급 및 환경변수 등록
  - `scripts/seed-perfumes.ts` 시드 수집 스크립트 작성
  - Fragella API 응답 → Perfume 테이블 구조 매핑 로직
  - sillage/longevity 텍스트 → 숫자 변환 (Intimate/Poor/Weak→2, Moderate→5, Long Lasting/Strong→7, Eternal/Enormous→9)
  - Occasion Ranking → tpoTags 매핑 (professional→오피스/포멀/비즈니스, casual→캐주얼/데일리/야외, night out→데이트/파티/이브닝)
  - Season Ranking → season 배열 + 보정 태그 매핑
  - 한국 시장 인기 브랜드 우선 필터링 (Jo Malone, Dior, Chanel, Byredo 등)
  - Free 플랜(20건)으로 샘플 수집 → 데이터 분포 확인 → 임계값 튜닝
- **Task 024: 시드 데이터 Supabase 적재 및 검증**
  - Supabase 배치 import 로직 (upsert, 중복 방지)
  - 초기 1,000개 향수 데이터 수집 및 적재 (Basic 플랜)
  - 데이터 무결성 검증 (필수 필드 누락, tpoTags/season 매핑 정확도)
  - 시드 데이터 기반 탐색/추천 기능 동작 확인
  - 재실행 가능한 idempotent 스크립트 구성

---

### Phase 8: 배포 및 최적화

- **Task 025: 성능 최적화** - 우선순위
  - 이미지 최적화 (Next.js Image 컴포넌트, Supabase Storage CDN)
  - 향수 목록 서버 컴포넌트 스트리밍 (Suspense + Skeleton)
  - 추천 결과 캐싱 전략 (revalidate 설정)
  - 페이지별 LCP 3초 이내 목표 확인
  - 향수 검색 응답 1초 이내 목표 확인 (Supabase 인덱스 최적화)
- **Task 026: Vercel 배포 및 CI/CD 구성**
  - Vercel 프로젝트 연결 및 환경변수 설정
  - Supabase 프로덕션 환경 분리 (개발/프로덕션)
  - GitHub Actions 또는 Vercel CI: 빌드 + 타입 체크 + 린트 자동 실행
  - Preview 배포 (PR별 자동 배포)
- **Task 027: 최종 QA 및 접근성 검수**
  - 모바일 우선 반응형 검증 (375px ~ 430px 기준)
  - 태블릿/데스크톱 반응형 확인
  - WCAG 2.1 AA 접근성 기준 검수 (키보드 네비게이션, 스크린 리더, 색상 대비)
  - Playwright MCP로 전체 사용자 시나리오 E2E 테스트
    - 비인증 사용자: 홈 → 탐색 → 향수 상세 → 회원가입
    - 신규 사용자: 회원가입 → 온보딩 → 추천 → 착향 일지 작성
    - 기존 사용자: 로그인 → 착향 일지 작성 → 추천 확인 → 마이페이지
  - 에러 바운더리 및 404/500 페이지 확인
  - SEO 메타데이터 검수 (각 페이지 title, description, OG 태그)

---

## 후속 개발 (v1.x) - 미정

- **F005: 소셜 공유** - 착향 일지 SNS 공유 기능
- **F006: 향수 컬렉션** - 위시리스트 및 보유 목록 관리
- **F007: 커뮤니티** - 향수 리뷰 및 댓글
- **F008: 알림** - 착향 알림, 추천 푸시 알림
- **F009: 고급 통계** - 착향 패턴 분석 차트
- **추천 엔진 업그레이드** - pgvector + 임베딩 기반 유사도 검색
