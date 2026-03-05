// PRD 4. 데이터 모델 - Perfume
export interface Perfume {
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

// Fragella sillage/longevity 텍스트 → 숫자 변환 매핑
// - Intimate / Poor / Weak → 2
// - Moderate → 5
// - Long Lasting / Strong → 7
// - Eternal / Enormous → 9
