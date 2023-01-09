import Button from '@components/common/button'
import HStack from '@components/common/stack/HStack'
import { Form, Formik } from 'formik'
import { Dispatch, SetStateAction } from 'react'
import { Description, ModalContainer, ModalFooter, Step, Title } from '.'
import * as Yup from 'yup'
import InputFormik from '@components/common/formik/InputFormik'
import regex from 'src/constants/regex'

export interface IOptionalInputs {
  keyword1: string
  keyword2: string
  restaurantLink: string
}

interface IOptionalInputsProps {
  setCurrentStep: Dispatch<SetStateAction<Step>>
  initialOptionalValues: IOptionalInputs
  setOptionalValues: Dispatch<SetStateAction<IOptionalInputs>>
  handleComplete: (values: IOptionalInputs) => void
}

const OptionalInputs = ({
  setCurrentStep,
  initialOptionalValues,
  setOptionalValues,
  handleComplete,
}: IOptionalInputsProps) => {
  return (
    <Formik
      initialValues={initialOptionalValues}
      validationSchema={Yup.object({
        restaurantLink: Yup.string().matches(regex.url, 'url을 입력해주세요.'),
      })}
      onSubmit={(values) => {}}
    >
      {({ errors, touched, values }) => (
        <Form>
          <ModalContainer>
            <Title>파티를 설명할 수 있는 키워드를 적어보세요!</Title>
            <Description>(최대 2개, 각 최대 7자)</Description>
            <HStack gap="0.5rem">
              <InputFormik name="keyword1" />
              <InputFormik name="keyword2" />
            </HStack>
            <Title>식당 및 메뉴 관련 링크를 입력해주세요.</Title>
            <Description>(네이버지도, 배민 등)</Description>
            <InputFormik name="restaurantLink" hasErrorMessage />
          </ModalContainer>
          <ModalFooter>
            <Button
              text="이전"
              variant="outlined"
              onClick={() => {
                setCurrentStep(Step.Required)
                setOptionalValues(values)
              }}
            />
            <Button
              text="완료"
              type="submit"
              isDisabled={!!errors.restaurantLink}
              onClick={() => {
                handleComplete(values)
              }}
            />
          </ModalFooter>
        </Form>
      )}
    </Formik>
  )
}

export default OptionalInputs
