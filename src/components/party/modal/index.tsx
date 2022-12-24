import BaseModal from '@components/common/base-modal'
import styled from '@emotion/styled'
import { useNewPartyMutation } from '@hooks/query/party/useNewPartyMutations'
import { theme } from '@styles/theme'
import { add, endOfDay, format } from 'date-fns'
import { useState } from 'react'
import CategorySelect from './CategorySelect'
import OptionalInputs, { IOptionalInputs } from './OptionalInputs'
import { PartyNameOptions } from './Options'
import RequiredInputs, { IRequiredInputs, MealType } from './RequiredInputs'

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
  const afterOneHour = add(new Date(), { hours: 1 })
  const endOfToday = endOfDay(new Date())
  const [currentStep, setCurrentStep] = useState<Step>(Step.Category)
  const { mutateAsync } = useNewPartyMutation()
  const [requiredValues, setRequiredValues] = useState<IRequiredInputs>({
    name: PartyNameOptions[0].value as string,
    customName: '',
    mealType: MealType.Lunch,
    gatherClosedAt: afterOneHour > endOfToday ? endOfToday : afterOneHour,
    maxUserCount: 0, // Infinite = 0
    isPrivate: false,
  })

  const [optionalValues, setOptionalValues] = useState<IOptionalInputs>({
    keyword1: '',
    keyword2: '',
    restaurantLink: '',
  })

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
            <RequiredInputs
              setCurrentStep={setCurrentStep}
              initialRequiredValues={requiredValues}
              setRequiredValues={setRequiredValues}
            />
          )}
          {currentStep === Step.Optional && (
            <OptionalInputs
              initialOptionalValues={optionalValues}
              setCurrentStep={setCurrentStep}
              setOptionalValues={setOptionalValues}
              handleComplete={async (values) => {
                const {
                  name,
                  customName,
                  maxUserCount,
                  mealType,
                  gatherClosedAt,
                  isPrivate,
                } = requiredValues
                const { restaurantLink, keyword1, keyword2 } = values
                const tags = []
                if (!!keyword1) tags.push(keyword1)
                if (!!keyword2) tags.push(keyword2)
                const payload = {
                  name:
                    name === '직접입력' ? customName?.toString() || '' : name,
                  maxUserCount,
                  mealType,
                  gatherClosedAt: format(gatherClosedAt, 'yyyy-MM-dd*kk:mm:ss')
                    .split('*')
                    .join('T'),
                  restaurantLink,
                  tags,
                  isPrivate,
                }
                await mutateAsync(payload)
                onClose()
              }}
            />
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
  margin: 1.5rem 0 0.5rem 0;
`
export const Description = styled.p`
  color: #757575; // TODO: theme
  font-size: ${theme.fontSize.sm};
  margin: 0.5rem 0;
`
export const ModalContainer = styled.div`
  font-weight: 600;
  letter-spacing: -0.2px;
  padding: 0 1.5rem;
  position: relative;
  margin-bottom: 8rem;
`

export default NewPartyModal
