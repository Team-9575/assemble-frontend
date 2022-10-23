import BaseModal from '@components/common/BaseModal'
import { theme } from '@styles/theme'

interface NewPartyModalProps {
  isOpen: boolean
  onClose: () => void
}

const NewPartyModal = ({ isOpen, onClose }: NewPartyModalProps) => {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      width={theme.maxWidth}
      height="100vh"
    >
      <div>modal</div>
    </BaseModal>
  )
}

export default NewPartyModal
