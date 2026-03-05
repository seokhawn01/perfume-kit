/**
 * Fragella API → Supabase 향수 데이터 시드 스크립트
 *
 * 사용법:
 *   npx tsx scripts/seed-perfumes.ts
 *
 * 환경변수 (.env.local):
 *   FRAGELLA_API_KEY=your_api_key
 *   NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
 *   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
 *
 * 참고:
 *   - Fragella API: https://api.fragella.com
 *   - Free 플랜: 월 20건 (개발/데모용)
 *   - Basic 플랜: 월 5,000건 ($12/월) - 초기 시드 수집에 적합
 */

// TODO: Fragella API 스펙 확인 후 아래 타입 정확히 정의
interface FragellaOccasion {
  professional: number // 0~3 소수점
  casual: number
  night_out: number
}

interface FragellaSeason {
  spring: number // 0~3 소수점
  summer: number
  fall: number
  winter: number
}

interface FragellaPerfume {
  id: string
  name: string
  brand: string
  concentration?: string
  family?: string
  top_notes?: string[]
  middle_notes?: string[]
  base_notes?: string[]
  longevity?: string // 텍스트: "Moderate" / "Long Lasting" 등
  sillage?: string // 텍스트: "Moderate" / "Strong" 등
  occasion?: FragellaOccasion
  season?: FragellaSeason
  gender?: string
  image_url?: string
  description?: string
}

// Fragella longevity/sillage 텍스트 → 숫자 변환
// PRD 4. 데이터 모델 Perfume 참조
function convertRatingToNumber(text: string | undefined): number {
  if (!text) return 5 // 기본값: 중간

  const lowerText = text.toLowerCase()

  if (
    lowerText.includes('intimate') ||
    lowerText.includes('poor') ||
    lowerText.includes('weak')
  ) {
    return 2
  }
  if (lowerText.includes('moderate')) {
    return 5
  }
  if (lowerText.includes('long lasting') || lowerText.includes('strong')) {
    return 7
  }
  if (lowerText.includes('eternal') || lowerText.includes('enormous')) {
    return 9
  }

  return 5 // 알 수 없는 값: 기본값
}

// Fragella Occasion/Season → TPO 태그 변환
// PRD 5. 기술 스택 - Fragella Occasion → tpoTags 매핑 규칙 참조
function convertToTpoTags(
  occasion?: FragellaOccasion,
  season?: FragellaSeason
): string[] {
  const tags: string[] = []

  if (!occasion) return tags

  // Occasion 매핑 (임계값 1.5 - 초기 샘플 수집 후 튜닝 필요)
  if (occasion.professional > 1.5) {
    tags.push('오피스', '포멀', '비즈니스')
  }
  if (occasion.casual > 1.5) {
    tags.push('캐주얼', '데일리', '야외')
  }
  if (occasion.night_out > 1.5) {
    tags.push('데이트', '파티', '이브닝')
  }

  // Season 보정 (임계값 2.0 - 초기 샘플 수집 후 튜닝 필요)
  if (season) {
    if (season.spring > 2.0) tags.push('봄나들이', '피크닉')
    if (season.summer > 2.0) tags.push('스포츠', '해변')
    if (season.fall > 2.0) tags.push('데이트', '문화생활')
    if (season.winter > 2.0) tags.push('포멀', '홀리데이')
  }

  // 중복 제거
  return [...new Set(tags)]
}

// Season 배열 변환
function convertToSeasons(season?: FragellaSeason): string[] {
  if (!season) return []

  const seasons: string[] = []
  // 임계값 1.5 - 초기 샘플 수집 후 튜닝 필요
  if (season.spring > 1.5) seasons.push('봄')
  if (season.summer > 1.5) seasons.push('여름')
  if (season.fall > 1.5) seasons.push('가을')
  if (season.winter > 1.5) seasons.push('겨울')

  return seasons
}

// TODO: 실제 Fragella API 호출 구현
async function fetchFragellaPerfumes(
  _page: number,
  _pageSize: number
): Promise<FragellaPerfume[]> {
  // TODO: Fragella API 엔드포인트 및 파라미터 확인 후 구현
  // const apiKey = process.env.FRAGELLA_API_KEY
  // const response = await fetch(`https://api.fragella.com/perfumes?page=${page}&size=${pageSize}`, {
  //   headers: { Authorization: `Bearer ${apiKey}` }
  // })
  // return response.json()
  throw new Error('Fragella API 연동 미구현 - API 문서 확인 후 구현 필요')
}

// TODO: Supabase에 향수 데이터 배치 저장
async function upsertPerfumesToSupabase(
  _perfumes: ReturnType<typeof transformPerfume>[]
): Promise<void> {
  // TODO: Supabase 클라이언트 초기화 후 구현
  // const supabase = createClient(
  //   process.env.NEXT_PUBLIC_SUPABASE_URL!,
  //   process.env.SUPABASE_SERVICE_ROLE_KEY!
  // )
  // const { error } = await supabase.from('perfumes').upsert(perfumes)
  // if (error) throw error
  throw new Error('Supabase 연동 미구현')
}

// Fragella 데이터 → Supabase perfumes 테이블 형식 변환
function transformPerfume(raw: FragellaPerfume) {
  return {
    id: raw.id,
    brand: raw.brand,
    name: raw.name,
    concentration: raw.concentration ?? 'EDP',
    top_notes: raw.top_notes ?? [],
    middle_notes: raw.middle_notes ?? [],
    base_notes: raw.base_notes ?? [],
    family: raw.family ?? '미분류',
    tpo_tags: convertToTpoTags(raw.occasion, raw.season),
    gender: raw.gender,
    season: convertToSeasons(raw.season),
    sillage: convertRatingToNumber(raw.sillage),
    longevity: convertRatingToNumber(raw.longevity),
    image_url: raw.image_url,
    description: raw.description,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
}

async function main() {
  // 한국 시장 인기 브랜드 우선 수집 (PRD 5. 기술 스택 참조)
  const targetBrands = [
    'Jo Malone',
    'Dior',
    'Chanel',
    'Byredo',
    'Le Labo',
    'Maison Margiela',
    'Tom Ford',
    'Guerlain',
    'Hermès',
    'Acqua di Parma',
  ]

  console.info('향수 시드 데이터 수집 시작')
  console.info(`타겟 브랜드: ${targetBrands.join(', ')}`)

  // TODO: 실제 수집 로직 구현
  // 1. Fragella API로 브랜드별 향수 수집
  // 2. transformPerfume으로 데이터 변환
  // 3. upsertPerfumesToSupabase로 Supabase에 저장

  const _fetchFragellaPerfumes = fetchFragellaPerfumes
  const _upsertPerfumesToSupabase = upsertPerfumesToSupabase
  const _transformPerfume = transformPerfume

  console.info('시드 스크립트 구현 대기 중 - Fragella API 키 발급 후 진행')
}

main().catch(err => {
  console.error('시드 스크립트 실패:', err)
  process.exit(1)
})
