// PRD 4. 데이터 모델 - UserPreference, OnboardingSwipe, OnboardingKeywordSelection

// 취향 프로필 (온보딩 완료 후 생성, 착향 일지 누적으로 갱신)
export interface UserPreference {
  id: string
  userId: string
  preferredFamilies: string[] // 선호 향 계열
  preferredNotes: string[] // 선호 노트
  dislikedNotes: string[] // 기피 노트
  preferredSillage: number // 선호 확산력 (1~10)
  preferredLongevity: number // 선호 지속력 (1~10)
  updatedAt: Date
}

// 유경험자 온보딩 스와이프 기록 (좋아요/싫어요)
export interface OnboardingSwipe {
  id: string
  userId: string
  perfumeId: string
  liked: boolean // true: 좋아요, false: 싫어요
  createdAt: Date
}

// 무경험자 온보딩 키워드 선택 기록
// 키워드 → 향 계열 매핑:
//   자연 → 그린 | 플로럴 → 플로럴 | 우디 → 우디
//   시트러스 → 시트러스 | 머스크 → 머스크 | 스파이시 → 오리엔탈
export interface OnboardingKeywordSelection {
  id: string
  userId: string
  keyword: string // 선택한 키워드 (자연/플로럴/우디/시트러스/머스크 등)
  imageId: string // 연결된 이미지 식별자
  createdAt: Date
}
