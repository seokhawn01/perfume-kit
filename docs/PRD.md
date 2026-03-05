# 향수 추천 서비스 PRD (Product Requirements Document)

**버전**: 1.4.0
**작성일**: 2026-03-05
**상태**: MVP 개발 중

---

## 1. 프로젝트 개요

### 1.1 서비스 목적

착향 경험(지속력/확산력) 데이터와 TPO(Time/Place/Occasion) 상황을 결합한 AI 기반 향수 개인화 추천 서비스.

사용자가 직접 경험한 착향 데이터를 축적하고, 이를 기반으로 상황에 맞는 향수를 추천받을 수 있다.

### 1.2 핵심 가치 제안

- **개인화**: 타인의 리뷰가 아닌 내 착향 경험 기반 추천
- **상황 맞춤**: TPO에 따른 실용적인 향수 선택 지원
- **진입 장벽 낮춤**: 입문자도 이미지 선택으로 취향 파악 가능

### 1.3 타겟 사용자

| 구분        | 설명                                          |
| ----------- | --------------------------------------------- |
| 주 타겟     | 향수에 관심 있는 20~40대 한국 사용자          |
| 서브 타겟 1 | 향수 입문자 (콜드스타트 온보딩으로 진입 지원) |
| 서브 타겟 2 | 향덕 (착향 일지로 체계적 기록/분석)           |

---

## 2. 핵심 기능 명세 (MVP)

### F001. TPO 상황별 향수 추천

**설명**: 사용자가 현재 상황(시간/장소/목적)을 입력하면 적합한 향수 목록을 추천한다.

**사용자 시나리오**:

1. 홈 화면에서 "오늘의 추천" 또는 "TPO 추천" 진입
2. 시간대 / 장소 / 목적 선택 (예: 오후 / 오피스 / 프레젠테이션)
3. 규칙 기반 추천 엔진이 향수 목록 필터링 및 스코어링
4. 향수 카드 탭 → 상세 페이지 이동

**입력**: TPO 선택값 (시간대, 장소, 목적)
**출력**: 추천 향수 목록 (최대 5개), 추천 이유
**우선순위**: P0 (MVP 핵심)

**추천 알고리즘 (규칙 기반 - MVP)**

MVP에서는 외부 AI API 의존 없이 규칙 기반으로 구현한다. v1.x에서 벡터 기반으로 업그레이드 예정.

```
추천 스코어 = TPO_매칭점수 + 취향_매칭점수 + 착향일지_보정점수

1단계: TPO 하드 필터링
   - 향수의 tpoTags가 선택한 TPO와 1개 이상 겹치는 향수만 추출

2단계: 취향 매칭 스코어 계산
   - 선호 향 계열 일치: +3점
   - 선호 노트 포함: 노트당 +1점
   - 기피 노트 포함: 노트당 -2점
   - 선호 확산력 범위 일치 (±2): +1점
   - 선호 지속력 범위 일치 (±2): +1점

3단계: 착향 일지 보정 (누적 데이터 있을 경우)
   - 동일 향수를 같은 TPO에서 기록한 지속력 평균 반영
   - 이미 착향한 향수는 상위 노출 (경험 기반 신뢰도)
   - UserPreference.preferredSillage/Longevity 갱신 트리거:
     착향 일지 저장 시 즉시 재계산 (전체 WearLog 평균값으로 업데이트)

4단계: 상위 5개 반환 + 추천 이유 텍스트 생성
   - "당신의 선호 향 계열(플로럴)과 오피스 TPO에 적합한 향수입니다"
```

**Edge Case 처리 (M3)**

| 케이스                              | 처리 방식                                                                            |
| ----------------------------------- | ------------------------------------------------------------------------------------ |
| UserPreference 없음 (온보딩 미완료) | "인기 향수 TOP 10" fallback (WearLog 기록 수 DESC 기준) → 온보딩 유도 배너 표시      |
| TPO 필터 결과 5개 미만              | 조건 순차 완화: ① TPO 필터 제거 → ② 선호 계열만 필터 → ③ 전체 인기순으로 부족분 채움 |
| 동점 향수 다수 발생                 | WearLog 기록 수 많은 향수 우선 → 이후 createdAt DESC 정렬                            |

**v1.x 업그레이드 계획**: pgvector + 임베딩 기반 유사도 검색으로 전환

---

### F002. 착향 일지 기록 (지속력/확산력)

**설명**: 향수를 뿌린 후 시간 경과에 따른 지속력과 확산력을 기록한다.

**사용자 시나리오**:

1. "착향 일지 작성" 진입
2. 향수 선택 (검색 또는 목록)
3. 착향 날짜/시간, 날씨/온도, TPO 상황 입력
4. 지속력 (1~10) / 확산력 (1~10) 슬라이더 입력
5. 메모 입력 (선택사항)
6. 저장 → 내 착향 일지 목록에 추가

**입력**: 향수 ID, 착향 일시, 날씨, TPO, 지속력, 확산력, 메모
**출력**: 저장된 WearLog 데이터
**우선순위**: P0 (MVP 핵심)

---

### F003. 향수 검색 및 탐색

**설명**: 향수 이름, 브랜드, 향 계열로 검색하고 필터링한다.

**사용자 시나리오**:

1. 탐색 페이지 진입
2. 검색어 입력 또는 필터 선택 (브랜드 / 향 계열 / 가격대)
3. 결과 목록에서 향수 카드 확인
4. 카드 탭 → 향수 상세 페이지 이동

**입력**: 검색어, 필터 조건
**출력**: 향수 목록 (페이지네이션)
**우선순위**: P1

---

### F004. 콜드스타트 온보딩

**설명**: 신규 가입 사용자의 취향을 파악하기 위한 초기 온보딩 플로우.

| 사용자 유형 | 방식                                       |
| ----------- | ------------------------------------------ |
| 유경험자    | 향수 카드 스와이프 (좋아요/싫어요)         |
| 무경험자    | 이미지/키워드 선택 (자연, 플로럴, 우디 등) |

**사용자 시나리오**:

1. 회원가입 완료 후 온보딩 진입
2. 향수 경험 여부 선택
3. 유경험자: 최소 10개 향수 카드 스와이프
4. 무경험자: 이미지 카드 중 끌리는 것 3~5개 선택
5. 취향 프로필 초기화 완료 → 홈으로 이동

**입력**: 스와이프 결과 또는 이미지 선택값
**출력**: UserPreference 초기 데이터
**우선순위**: P0 (첫 추천 품질 직결)

**온보딩 → UserPreference 변환 로직 (M2)**

유경험자 (스와이프 결과 기반):

```
1. 좋아요한 향수들의 family를 빈도순 집계 → 상위 3개를 preferredFamilies로 설정
2. 좋아요한 향수들의 top/middle 노트를 빈도순 집계 → 상위 10개를 preferredNotes로 설정
3. 싫어요한 향수들의 base 노트를 빈도순 집계 → 상위 5개를 dislikedNotes로 설정
4. preferredSillage / preferredLongevity = 5 (기본 중간값, 착향 일지 쌓이며 갱신)
```

무경험자 (키워드 선택 기반):

```
키워드 → 향 계열 매핑 테이블
  자연    → 그린
  플로럴  → 플로럴
  우디    → 우디
  시트러스 → 시트러스
  머스크  → 머스크
  스파이시 → 오리엔탈

선택한 키워드를 preferredFamilies로 직접 매핑
preferredNotes / dislikedNotes = [] (착향 일지 누적 후 자동 보강)
preferredSillage / preferredLongevity = 5 (기본값)
```

---

### F010. 기본 인증

**설명**: 이메일/패스워드 기반 회원가입, 로그인, 로그아웃.

**기능 목록**:

- 이메일 + 비밀번호 회원가입
- 이메일 인증 (Supabase Auth)
- 로그인 / 로그아웃
- 비밀번호 찾기 (이메일 발송)

**우선순위**: P0 (서비스 진입 필수)

---

### F011. 기본 프로필 관리

**설명**: 사용자 프로필 정보 조회 및 수정.

**기능 목록**:

- 닉네임 변경
- 프로필 이미지 업로드
- 취향 프로필 확인 (온보딩 결과)
- 회원 탈퇴

**우선순위**: P1

---

## 3. 페이지 목록

| 번호 | 페이지명          | 경로               | 연관 기능 | 인증 필요 |
| ---- | ----------------- | ------------------ | --------- | --------- |
| P01  | 홈                | `/`                | F001      | 선택      |
| P02  | 로그인            | `/login`           | F010      | X         |
| P03  | 회원가입          | `/signup`          | F010      | X         |
| P04  | 온보딩            | `/onboarding`      | F004      | O         |
| P05  | TPO 추천          | `/recommend`       | F001      | O         |
| P06  | 향수 탐색         | `/explore`         | F003      | X         |
| P07  | 향수 상세         | `/perfumes/[id]`   | F003      | X         |
| P08  | 착향 일지 작성    | `/wear-log/new`    | F002      | O         |
| P09  | 내 착향 일지 목록 | `/wear-log`        | F002      | O         |
| P10  | 마이페이지        | `/mypage`          | F011      | O         |
| P11  | 비밀번호 찾기     | `/forgot-password` | F010      | X         |
| P12  | 비밀번호 재설정   | `/reset-password`  | F010      | X         |

### 홈 페이지 비인증 사용자 경험

비인증 사용자도 홈에 접근 가능하며, 인증 여부에 따라 다른 콘텐츠를 표시한다.

| 영역        | 비인증 사용자              | 인증 사용자                      |
| ----------- | -------------------------- | -------------------------------- |
| 히어로 섹션 | 서비스 소개 + 회원가입 CTA | 오늘의 TPO 추천 바로가기         |
| 향수 추천   | 인기 향수 TOP 10 (정적)    | 개인화 추천 5개                  |
| 탐색 섹션   | 향수 탐색 페이지 링크      | 최근 착향 일지 요약              |
| 하단 CTA    | "지금 취향 찾기" → /signup | "착향 일지 기록" → /wear-log/new |

---

## 4. 데이터 모델

### User

```typescript
interface User {
  id: string // Supabase Auth UUID
  email: string
  nickname: string
  avatarUrl?: string
  createdAt: Date
  updatedAt: Date
}
```

### Perfume

```typescript
interface Perfume {
  id: string
  brand: string // 브랜드명
  name: string // 향수명
  concentration: string // EDP / EDT / EDC 등
  topNotes: string[] // 탑 노트
  middleNotes: string[] // 미들 노트
  baseNotes: string[] // 베이스 노트
  family: string // 향 계열 (플로럴, 우디, 시트러스 등)
  tpoTags: string[] // TPO 태그 (오피스/데이트/캐주얼/스포츠 등) - F001 추천용
  gender?: string // 성별 타겟 (남성/여성/공용)
  priceRange?: string // 가격대 (저가/중가/고가/럭셔리) - F003 필터용
  season?: string[] // 어울리는 계절 (봄/여름/가을/겨울)
  sillage: number // 확산력 1~10 (Fragella 텍스트 → 숫자 변환)
  longevity: number // 지속력 1~10 (Fragella 텍스트 → 숫자 변환)
  imageUrl?: string
  description?: string
  createdAt: Date
  updatedAt: Date
}
```

**Fragella sillage/longevity 텍스트 → 숫자 변환 테이블**

| Fragella 텍스트        | longevity 값 | sillage 값 |
| ---------------------- | ------------ | ---------- |
| Intimate / Poor / Weak | 2            | 2          |
| Moderate               | 5            | 5          |
| Long Lasting / Strong  | 7            | 7          |
| Eternal / Enormous     | 9            | 9          |

※ 정확한 Fragella 디스크립터 목록은 시드 수집 시 실제 응답으로 확인 후 확정

### WearLog (착향 일지)

```typescript
interface WearLog {
  id: string
  userId: string
  perfumeId: string
  wornAt: Date // 착향 일시
  weather?: string // 날씨 (맑음/흐림/비/눈)
  temperature?: number // 온도 (°C)
  tpoTime: string // 시간대 (아침/낮/저녁/밤)
  tpoPlace: string // 장소 (오피스/데이트/캐주얼/포멀)
  tpoPurpose: string // 목적
  longevity: number // 지속력 1~10
  sillage: number // 확산력 1~10
  memo?: string
  createdAt: Date
}
```

### UserPreference (취향 프로필)

```typescript
interface UserPreference {
  id: string
  userId: string
  preferredFamilies: string[] // 선호 향 계열
  preferredNotes: string[] // 선호 노트
  dislikedNotes: string[] // 기피 노트
  preferredSillage: number // 선호 확산력 (1~10)
  preferredLongevity: number // 선호 지속력 (1~10)
  updatedAt: Date
}
```

### OnboardingSwipe (유경험자 스와이프 기록)

```typescript
interface OnboardingSwipe {
  id: string
  userId: string
  perfumeId: string
  liked: boolean // true: 좋아요, false: 싫어요
  createdAt: Date
}
```

### OnboardingKeywordSelection (무경험자 키워드 선택 기록)

```typescript
interface OnboardingKeywordSelection {
  id: string
  userId: string
  keyword: string // 선택한 키워드 (자연/플로럴/우디/시트러스/머스크 등)
  imageId: string // 연결된 이미지 식별자
  createdAt: Date
}
```

---

## 5. 기술 스택

| 영역        | 기술                                                   |
| ----------- | ------------------------------------------------------ |
| Framework   | Next.js 15.5.3 (App Router)                            |
| Runtime     | React 19.1.0 + TypeScript 5                            |
| Styling     | TailwindCSS v4 + shadcn/ui (new-york)                  |
| Forms       | React Hook Form + Zod                                  |
| Backend     | Supabase (Auth + DB + Storage)                         |
| 추천 엔진   | 규칙 기반 (MVP) → pgvector 벡터 검색 (v1.x)            |
| 향수 데이터 | Fragella API (74,000+ 향수, 노트/지속력/계절/TPO 포함) |
| 배포        | Vercel                                                 |

### 향수 시드 데이터 전략

> **PERFUMIST API 검토 결과**: 공개 API 미제공 (소비자용 앱만 운영) — 사용 불가

**채택: Fragella API** (api.fragella.com)

- 74,000+ 향수 데이터 (노트, 계열, 지속력, 확산력, 계절, 이미지 포함)
- TPO/Occasion 데이터 내장 → tpoTags 직접 매핑 가능
- JSON 구조화 데이터 → Supabase import 자동화 가능

**데이터 수집 계획**:

1. Fragella API로 초기 1,000개 향수 데이터 수집
2. 한국 시장 인기 브랜드 우선 필터링 (Jo Malone, Dior, Chanel, Byredo 등)
3. `tpoTags`, `season` 필드 Fragella의 occasion/season 데이터로 매핑
4. Supabase 배치 import 스크립트 작성 (scripts/seed-perfumes.ts)

**Fragella API 플랜 및 비용**

| 플랜          | 월 비용               | 월 요청 한도 |
| ------------- | --------------------- | ------------ |
| Free          | $0                    | 20건         |
| Basic         | $12 ($9.83 연납)      | 5,000건      |
| **Pro**       | **$49 ($40.17 연납)** | **20,000건** |
| Pay As You Go | $2 + $0.005/건        | 무제한       |

**전략**: 초기 시드 수집(1,000개)은 Basic 1개월($12)로 충분. 서비스 운영 중 검색 트래픽에 따라 Pro 플랜으로 업그레이드.

**Fragella Occasion → tpoTags 매핑 규칙 (M1)**

Fragella API의 Occasion Ranking(`professional / casual / night out`)을 PRD의 세분화된 TPO 태그로 변환:

```
※ Fragella API Occasion/Season score 범위: 0~3 소수점 (예: 2.636, 1.145, 0)

professional (score > 1.5) → ["오피스", "포멀", "비즈니스"]
casual       (score > 1.5) → ["캐주얼", "데일리", "야외"]
night out    (score > 1.5) → ["데이트", "파티", "이브닝"]

Season Ranking 보정 (score > 2.0인 계절에 추가 태그):
  spring → ["봄나들이", "피크닉"]
  summer → ["스포츠", "해변"]
  fall   → ["데이트", "문화생활"]
  winter → ["포멀", "홀리데이"]

※ 정확한 임계값은 시드 수집 초기 샘플(Free 플랜 20건)로 분포 확인 후 튜닝
```

시드 수집 스크립트(`scripts/seed-perfumes.ts`)에서 수집 시 자동 변환 적용.

**Fragella API 이용 정책**

- **현재 단계 (개발/데모)**: Free 플랜(월 20건)으로 개발 및 개인 포트폴리오 시연 가능
- **외부 공개 시**: 서비스를 외부에 공개할 경우 상업적 이용 약관 재확인 필요
  - 공개 서비스 여부, 데이터 재배포 여부에 따라 유료 플랜(Basic 이상) 및 라이센스 구매 필요할 수 있음
- **시드 데이터 수집 후**: Supabase 자체 DB에 데이터 저장 → 이후 API 호출 없이 자체 운영 가능

---

## 6. 비기능 요구사항

### 성능

- 페이지 초기 로딩: 3초 이내 (LCP)
- 향수 검색 응답: 1초 이내
- 추천 생성: 3초 이내

### 접근성 / 반응형

- 모바일 우선 (375px ~ 430px 기준)
- 태블릿/데스크톱 반응형 지원
- WCAG 2.1 AA 수준 접근성

### 보안

- Supabase RLS (Row Level Security) 적용
- 인증 토큰 안전 관리
- 입력값 검증 (Zod 스키마)

---

## 7. 개발 범위 (MVP vs 후속)

### MVP (v1.0)

- F001, F002, F003, F004, F010, F011
- 12개 페이지 구현
- Supabase 연동 (Auth + DB)

### 후속 개발 (v1.x)

- F005: 소셜 공유 (착향 일지 공유)
- F006: 향수 컬렉션 (위시리스트/보유 목록)
- F007: 커뮤니티 (향수 리뷰 및 댓글)
- F008: 알림 (착향 알림, 추천 푸시)
- F009: 고급 통계 (착향 패턴 분석 차트)

---

## 8. 성공 지표 (KPI)

| 지표              | 목표 (3개월)         |
| ----------------- | -------------------- |
| MAU               | 1,000명              |
| 착향 일지 작성 수 | 사용자당 월 5건 이상 |
| 온보딩 완료율     | 80% 이상             |
| D7 리텐션         | 30% 이상             |
| 추천 클릭률       | 40% 이상             |
