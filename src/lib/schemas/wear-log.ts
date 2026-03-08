import { z } from 'zod'

// 착향 일지 작성 폼 스키마
export const wearLogSchema = z.object({
  perfumeId: z.string().min(1, '향수를 선택해 주세요.'),
  wornAt: z.date(),
  weather: z.enum(['맑음', '흐림', '비', '눈']).optional(),
  temperature: z
    .number()
    .min(-30, '온도는 -30°C 이상이어야 합니다.')
    .max(50, '온도는 50°C 이하여야 합니다.')
    .optional(),
  tpoTime: z.enum(['아침', '낮', '저녁', '밤']),
  tpoPlace: z.enum(['오피스', '데이트', '캐주얼', '포멀']),
  tpoPurpose: z.string().min(1, '목적을 입력해 주세요.'),
  longevity: z
    .number()
    .min(1, '지속력은 1 이상이어야 합니다.')
    .max(10, '지속력은 10 이하여야 합니다.'),
  sillage: z
    .number()
    .min(1, '확산력은 1 이상이어야 합니다.')
    .max(10, '확산력은 10 이하여야 합니다.'),
  memo: z.string().max(500, '메모는 500자 이내로 입력해 주세요.').optional(),
})

export type WearLogFormValues = z.infer<typeof wearLogSchema>
