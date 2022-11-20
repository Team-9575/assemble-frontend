import Button from '@components/common/button'
import styled from '@emotion/styled'
import { theme } from '@styles/theme'
import { Dispatch, SetStateAction } from 'react'
import { ModalContainer, ModalFooter, Step, Title } from './NewPartyModal'

interface ICategorySelectProps {
  setCurrentStep: Dispatch<SetStateAction<Step>>
}
const categories = [
  {
    icon: '🍟',
    name: '패스트푸드',
  },
  {
    icon: '🍝',
    name: '양식',
  },
  {
    icon: '🍣',
    name: '일식',
  },
  {
    icon: '🍕',
    name: '피자',
  },
  {
    icon: '🍗',
    name: '치킨',
  },
  {
    icon: '🍲',
    name: '찜/탕/찌개',
  },
  {
    icon: '🍜',
    name: '아시안',
  },
  {
    icon: '🍱',
    name: '도시락',
  },
  {
    icon: '🍚',
    name: '백반',
  },
  {
    icon: '🍢',
    name: '분식',
  },
  {
    icon: '🍻',
    name: '술/안주',
  },
  {
    icon: '✏️',
    name: '직접 입력',
  },
]

const CategorySelect = ({ setCurrentStep }: ICategorySelectProps) => {
  return (
    <>
      <ModalContainer>
        <Title>메뉴 카테고리를 선택해 주세요.</Title>
        <CategoryContainer>
          {categories.map((category, index) => (
            <Category key={`category-${index}`}>
              <CategoryIcon>{category.icon}</CategoryIcon>
              <CategoryName>{category.name}</CategoryName>
            </Category>
          ))}
        </CategoryContainer>
      </ModalContainer>
      <ModalFooter>
        <Button
          text="나중에 선택하기"
          onClick={() => {
            setCurrentStep(Step.Required)
          }}
        />
      </ModalFooter>
    </>
  )
}

const CategoryContainer = styled.div`
  display: grid;
  gap: 0.5rem;
  grid-template-columns: 1fr 1fr 1fr;
  margin-top: 1.75rem;
`
const Category = styled.div`
  height: 5.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #dbdbdb; // TODO: theme
  border-radius: 8px;
`
const CategoryIcon = styled.p`
  font-size: 32px;
`
const CategoryName = styled.p`
  font-size: ${theme.fontSize.sm};
  margin-top: 0.25rem;
`

export default CategorySelect
