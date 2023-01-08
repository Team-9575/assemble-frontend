import Button from '@components/common/button'
import InputFormik from '@components/common/formik/InputFormik'
import styled from '@emotion/styled'
import { theme } from '@styles/theme'
import { Form, Formik, yupToFormErrors } from 'formik'
import { Dispatch, SetStateAction, useState } from 'react'
import { ModalContainer, ModalFooter, Step, Title } from '.'
import * as Yup from 'yup'

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
const initialCategory = {
  category: '', // TODO: fetch api
  customCategory: '',
}

const validationSchema = Yup.object({
  category: Yup.string(),
  customCategory: Yup.string(),
})

const CategorySelect = ({ setCurrentStep }: ICategorySelectProps) => {
  const [selectedCategory, setSelectedCategory] = useState('')

  return (
    <Formik
      initialValues={initialCategory}
      validationSchema={validationSchema}
      onSubmit={(values) => {}}
    >
      {({ errors, touched, values, isValid, setFieldValue }) => (
        <Form>
          <ModalContainer>
            <Title>메뉴 카테고리를 선택해 주세요.</Title>
            <CategoryContainer>
              {categories.map((category, index) => (
                <Category
                  key={`category-${index}`}
                  type="button"
                  hasSelectedCategory={!!selectedCategory}
                  onClick={() => {
                    setSelectedCategory(
                      selectedCategory === category.name ? '' : category.name
                    )
                  }}
                  isSelected={selectedCategory === category.name}
                >
                  <CategoryIcon>{category.icon}</CategoryIcon>
                  <CategoryName>{category.name}</CategoryName>
                </Category>
              ))}
            </CategoryContainer>
            {selectedCategory === '직접 입력' && (
              <InputFormik
                label="직접 카테고리를 입력해주세요."
                name="customCategory"
              />
            )}
          </ModalContainer>
          <ModalFooter>
            <Button
              text="나중에 선택하기"
              onClick={() => {
                setCurrentStep(Step.Required)
              }}
            />
          </ModalFooter>
        </Form>
      )}
    </Formik>
  )
}

const CategoryContainer = styled.div`
  display: grid;
  gap: 0.5rem;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 1.75rem 0 0.5rem 0;
`
const Category = styled.button<{
  hasSelectedCategory: boolean
  isSelected: boolean
}>`
  height: 5.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: ${({ isSelected }) =>
    isSelected ? '1px solid #424242' : '1px solid #dbdbdb'};
  border-radius: 8px;
  box-shadow: ${({ isSelected }) =>
    isSelected && '0px 0px 8px rgba(0, 0, 0, 0.16)'};
  opacity: ${({ hasSelectedCategory, isSelected }) =>
    hasSelectedCategory && !isSelected ? 0.5 : 1};
`
const CategoryIcon = styled.p`
  font-size: 32px;
`
const CategoryName = styled.p`
  font-size: ${theme.fontSize.sm};
  margin-top: 0.25rem;
`

export default CategorySelect
