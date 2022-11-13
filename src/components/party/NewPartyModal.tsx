import BaseModal from '@components/common/BaseModal'
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

export enum Step {
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
          {currentStep === Step.Category && (
            <CategorySelect setCurrentStep={setCurrentStep} />
          )}
          {currentStep === Step.Required && (
            <RequiredInputs setCurrentStep={setCurrentStep} />
          )}
          {currentStep === Step.Optional && (
            <OptionalInputs setCurrentStep={setCurrentStep} onClose={onClose} />
          )}
        </ModalBody>
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
`
export const ModalFooter = styled.div`
  display: flex;
  gap: 0.5rem;
  position: fixed;
  padding: 1.5rem;
  width: 100%;
  max-width: ${theme.maxWidth};
  bottom: 0;
  background-color: #ffffff; // TODO: theme
`
export const Title = styled.p`
  color: black; // TODO: theme
`
export const ModalContainer = styled.div`
  font-weight: 600;
  letter-spacing: -0.2px;
  padding: 1.5rem;
`

export default NewPartyModal
