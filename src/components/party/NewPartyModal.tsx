import BaseModal from '@components/common/BaseModal'
import Button from '@components/common/Button'
import styled from '@emotion/styled'
import { theme } from '@styles/theme'
import { useState } from 'react'
import CategorySelect from './CategorySelect'
import OptionalInputs from './OptionalInputs'
import RequiredInputs from './RequiredInputs'

interface NewPartyModalProps {
  isOpen: boolean
  onClose: () => void
}

enum Step {
  Category,
  Required,
  Optional,
}

const NewPartyModal = ({ isOpen, onClose }: NewPartyModalProps) => {
  const [currentStep, setCurrentStep] = useState<Step>(Step.Category)

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      width={theme.maxWidth}
      height="100vh"
    >
      <Container>
        <ModalHeader>
          <span>파티 만들기</span>
          <CloseButton className="material-icons md-20" onClick={onClose}>
            close
          </CloseButton>
        </ModalHeader>
        <ModalBody>
          {currentStep === Step.Category && <CategorySelect />}
          {currentStep === Step.Required && <RequiredInputs />}
          {currentStep === Step.Optional && <OptionalInputs />}
        </ModalBody>
        <ModalFooter>
          {currentStep > 0 && <Button text="이전" onClick={() => {}} />}
          {currentStep === Step.Category && (
            <Button
              text="건너뛰기"
              onClick={() => {
                setCurrentStep(Step.Required)
              }}
            />
          )}
          {currentStep === Step.Required && (
            <Button
              text="다음"
              onClick={() => {
                setCurrentStep(Step.Optional)
              }}
            />
          )}
          {currentStep === Step.Optional && (
            <Button
              text="완료"
              onClick={() => {
                onClose()
              }}
            />
          )}
        </ModalFooter>
      </Container>
    </BaseModal>
  )
}

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`

const ModalHeader = styled.div`
  min-height: 3.25rem;
  font-weight: 600;
  letter-spacing: -0.3px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #f5f5f5; //TODO: theme
`
const CloseButton = styled.button`
  color: black; // TODO: theme
  position: absolute;
  right: 1rem;
  top: 1rem;
`
const ModalBody = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 1.5rem 1rem;
`
const ModalFooter = styled.div`
  min-height: 6rem;
  display: flex;
  gap: 0.5rem;
  padding: 1.5rem 1rem;
  position: fixed;
  width: 100%;
  max-width: ${theme.maxWidth};
  bottom: 0;
`
export const Title = styled.p`
  color: black; // TODO: theme
`

export default NewPartyModal
