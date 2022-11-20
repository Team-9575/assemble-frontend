import { ISelectOption } from '@components/common/input/Select'
import { IToggleButton } from '@components/common/input/ToggleButton'

export const PartyNameOptions: ISelectOption[] = [
  { name: '같이 점심 드실 분?', value: '같이 점심 드실 분?' },
  { name: '같이 저녁 드실 분?', value: '같이 저녁 드실 분?' },
  { name: '제목', value: '제목' },
  { name: '제목2', value: '제목2' },
  { name: '직접입력', value: '직접입력' },
]

export const GatherClosedOptions: ISelectOption[] = [
  { name: '1시간 뒤', value: '1시간 뒤' },
  { name: '2시간 뒤', value: '2시간 뒤' },
  { name: '3시간 뒤', value: '3시간 뒤' },
  { name: '4시간 뒤', value: '4시간 뒤' },
  { name: '직접입력', value: '직접입력' },
]

export const MaxUserCountOptions: ISelectOption[] = [
  { name: '제한없음', value: 0 },
  ...Array.from(Array(100), (_, index) => {
    return { name: (index + 1).toString(), value: index + 1 }
  }),
]

export enum MealType {
  Breakfast,
  Lunch,
  Dinner,
} // TODO: refactor

export const MealTypeOptions: IToggleButton[] = [
  { name: '점심', value: MealType.Lunch },
  { name: '저녁', value: MealType.Dinner },
]

export const PrivateOptions: IToggleButton[] = [
  { name: '공개', value: false },
  { name: '비공개', value: true },
]
