import Button from '@components/common/Button'
import styled from '@emotion/styled'
import { Dispatch, SetStateAction } from 'react'
import { ModalContainer, ModalFooter, Step, Title } from './NewPartyModal'

interface IOptionalInputsProps {
  setCurrentStep: Dispatch<SetStateAction<Step>>
  onClose: () => void
}

const OptionalInputs = ({ setCurrentStep, onClose }: IOptionalInputsProps) => {
  return (
    <>
      <ModalContainer>
        <Title>파티를 설명할 수 있는 키워드를 적어보세요!</Title>
        <Title>식당 및 메뉴 관련 링크를 입력해주세요.</Title>
      </ModalContainer>
      <ModalFooter>
        <Button
          text="이전"
          variant="outlined"
          onClick={() => {
            setCurrentStep(Step.Required)
          }}
        />
        <Button
          text="완료"
          onClick={() => {
            onClose()
          }}
        />
      </ModalFooter>
    </>
  )
}

export default OptionalInputs
