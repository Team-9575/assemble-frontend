import Button from '@components/common/button'
import { Description, ModalContainer, ModalFooter, Step, Title } from '.'
import { Dispatch, SetStateAction } from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import SelectFormik from '@components/common/formik/SelectFormk'
import {
  MaxUserCountOptions,
  MealTypeOptions,
  PartyNameOptions,
  PrivateOptions,
} from './Options'
import styled from '@emotion/styled'
import ToggleButtonFormik from '@components/common/formik/ToggleButtonFormik'
import VStack from '@components/common/stack/VStack'
import InputFormik from '@components/common/formik/InputFormik'
import { add, format } from 'date-fns'
import TimePicker from '@components/common/time-picker'

export enum MealType {
  Breakfast,
  Lunch,
  Dinner,
} // TODO: refactor

export interface IRequiredInputs {
  name: string
  customName?: string
  mealType: MealType
  gatherClosedAt: Date
  maxUserCount: number // Infinite = 0
  isPrivate: boolean
}

interface IRequiredInputsProps {
  setCurrentStep: Dispatch<SetStateAction<Step>>
  initialRequiredValues: IRequiredInputs
}

const validationSchema = Yup.object({
  customName: Yup.string().test(
    'custom name',
    'custom name is required!',
    (value, context) => context.parent.name !== '직접입력' || !!value
  ),
})

const RequiredInputs = ({
  setCurrentStep,
  initialRequiredValues,
}: IRequiredInputsProps) => {
  return (
    <Formik
      initialValues={initialRequiredValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {}}
    >
      {({ errors, touched, values, isValid, setFieldValue }) => (
        <Form>
          <ModalContainer>
            <Title>*제목을 선택해주세요.</Title>
            <VStack gap="0.5rem">
              <SelectFormik
                name="name"
                options={PartyNameOptions}
                onChange={() => {
                  setFieldValue('customName', '')
                }}
              />
              {values.name === '직접입력' && (
                <InputFormik label="제목을 입력해 주세요." name="customName" />
              )}
            </VStack>
            <Title>*식사 시간을 선택해주세요.</Title>
            <ToggleButtonFormik name="mealType" options={MealTypeOptions} />
            <Title>*모집 종료시간을 선택해주세요.</Title>
            <TimePicker
              value={values.gatherClosedAt}
              onChange={(value) => {
                setFieldValue('gatherClosedAt', value)
              }}
            />
            <Description>*모집 종료시간은 당일까지만 가능해요!</Description>
            <Title>*최대 인원을 설정해주세요.</Title>
            <MaxUserContainer>
              <SelectFormik name="maxUserCount" options={MaxUserCountOptions} />
            </MaxUserContainer>
            <Title>*공개 여부를 선택해주세요.</Title>
            <Description>
              (비공개 파티는 초대링크를 통해서만 참여 가능)
            </Description>
            <ToggleButtonFormik name="isPrivate" options={PrivateOptions} />
          </ModalContainer>
          <ModalFooter>
            <Button
              text="이전"
              variant="outlined"
              onClick={() => {
                setCurrentStep(Step.Category)
              }}
            />
            <Button
              text="다음"
              isDisabled={!isValid}
              onClick={() => {
                setCurrentStep(Step.Optional)
              }}
            />
          </ModalFooter>
        </Form>
      )}
    </Formik>
  )
}

const MaxUserContainer = styled.div`
  width: 10rem;
`
export default RequiredInputs
