import BaseModal from '@components/common/base-modal'
import Button from '@components/common/button'
import styled from '@emotion/styled'
import HStack from '../stack/HStack'
import VStack from '../stack/VStack'

interface IConfirmModalProps {
  isOpen: boolean
  title?: string
  description?: string
  confirmText?: string
  onClose: () => void
  onConfirm: () => void
}

const ConfirmModal = ({
  isOpen,
  confirmText = '확인',
  title = '',
  description = '',
  onClose,
  onConfirm,
}: IConfirmModalProps) => {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      width="20rem"
      height="12rem"
      borderRadius="10px"
    >
      <Container>
        <VStack alignItems="stretch" justifyContent="space-between">
          <VStack gap="0.5rem" margin="0.5rem 0 0 0">
            <Title>{title}</Title>
            <Description>{description}</Description>
          </VStack>
          <HStack gap="0.5rem" margin="2rem 0 0 0">
            <Button text="취소" onClick={onClose} variant="outlined" />
            <Button
              text={confirmText}
              onClick={() => {
                onConfirm()
                onClose()
              }}
            />
          </HStack>
        </VStack>
      </Container>
    </BaseModal>
  )
}

const Container = styled.div`
  position: relative;
  padding: 1rem;
  height: 12rem;
`

const Title = styled.p`
  font-weight: 500;
  margin: 0 auto;
`

const Description = styled.p`
  margin: 0 auto;
  color: #424242;
`

export default ConfirmModal
