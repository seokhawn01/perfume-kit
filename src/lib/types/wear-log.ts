// PRD 4. 데이터 모델 - WearLog (착향 일지)

// TPO 시간대
export type TpoTime = '아침' | '낮' | '저녁' | '밤'

// TPO 장소
export type TpoPlace = '오피스' | '데이트' | '캐주얼' | '포멀'

// 날씨
export type Weather = '맑음' | '흐림' | '비' | '눈'

export interface WearLog {
  id: string
  userId: string
  perfumeId: string
  wornAt: Date // 착향 일시
  weather?: Weather // 날씨
  temperature?: number // 온도 (°C)
  tpoTime: TpoTime // 시간대
  tpoPlace: TpoPlace // 장소
  tpoPurpose: string // 목적
  longevity: number // 지속력 1~10
  sillage: number // 확산력 1~10
  memo?: string
  createdAt: Date
}
