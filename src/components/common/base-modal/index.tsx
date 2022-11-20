import styled from '@emotion/styled'
import { Modal } from '@mui/material'
import useTheme from '@hooks/context/useTheme'

interface BaseModalProps {
  isOpen: boolean
  onClose: () => void
  children: JSX.Element
  width?: string
  height?: string
}

// TODO: change default width, height to alert modal size
const BaseModal = ({
  isOpen,
  onClose,
  children,
  width = '24rem',
  height = '16rem',
}: BaseModalProps) => {
  const { themeName } = useTheme()
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Container width={width} height={height}>
        {children}
      </Container>
    </Modal>
  )
}

const Container = styled.div<{ width: string; height: string }>`
  background-color: white; // TODO: theme
  width: ${({ width }) => width};
  max-width: 100vw;
  height: ${({ height }) => height};
  margin: ${({ height }) => `calc(50vh - ${height} / 2) auto`};
`

export default BaseModal
