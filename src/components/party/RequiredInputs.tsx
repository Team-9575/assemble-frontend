import Button from '@components/common/Button'
import styled from '@emotion/styled'
import { ModalContainer, ModalFooter, Step, Title } from './NewPartyModal'
import { Dispatch, SetStateAction } from 'react'

interface IRequiredInputsProps {
  setCurrentStep: Dispatch<SetStateAction<Step>>
}

const RequiredInputs = ({ setCurrentStep }: IRequiredInputsProps) => {
  return (
    <>
      <ModalContainer>
        <Title>*제목을 선택해주세요.</Title>
        <Title>*식사 시간을 선택해주세요.</Title>
        <Title>*모집 종료시간을 선택해주세요.</Title>
        <Title>*최대 인원을 설정해주세요.</Title>
        <Title>*공개 여부를 선택해주세요.</Title>
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
          onClick={() => {
            setCurrentStep(Step.Optional)
          }}
        />
      </ModalFooter>
    </>
  )
}

export default RequiredInputs
