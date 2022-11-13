import Button from '@components/common/Button'
import styled from '@emotion/styled'
import { theme } from '@styles/theme'
import { Dispatch, SetStateAction } from 'react'
import { ModalContainer, ModalFooter, Step, Title } from './NewPartyModal'

interface ICategorySelectProps {
  setCurrentStep: Dispatch<SetStateAction<Step>>
}
const Icons = [
  '🍕',
  '🍣',
  '🍰',
  '🥩',
  '🍱',
  '🍙',
  '🍝',
  '🍧',
  '🍷',
  '🍻',
  '🍳',
  '🌮',
  '🥪',
  '🍲',
  '🍛',
  '🍜',
]

const CategorySelect = ({ setCurrentStep }: ICategorySelectProps) => {
  return (
    <>
      <ModalContainer>
        <Title>메뉴 카테고리를 선택해 주세요.</Title>
        <CategoryContainer>
          {Icons.map((icon, index) => (
            <Category key={`category-${index}`}>{icon}</Category>
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
  height: 3.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #dbdbdb; // TODO: theme
  border-radius: 8px;
  font-size: ${theme.fontSize.xl};
`

export default CategorySelect
