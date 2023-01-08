import styled from '@emotion/styled'
import { Modal } from '@mui/material'
import useTheme from '@hooks/context/useTheme'

interface BaseModalProps {
  isOpen: boolean
  onClose: () => void
  children: JSX.Element
  width?: string
  height?: string
  margin?: string
  borderRadius?: string
}

// TODO: change default width, height to alert modal size
const BaseModal = ({
  isOpen,
  onClose,
  children,
  width = '24rem',
  height = '16rem',
  borderRadius = '0px',
  margin,
}: BaseModalProps) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Container
        width={width}
        height={height}
        margin={margin}
        borderRadius={borderRadius}
      >
        {children}
      </Container>
    </Modal>
  )
}

const Container = styled.div<{
  width: string
  height: string
  margin?: string
  borderRadius: string
}>`
  background-color: white; // TODO: theme
  width: ${({ width }) => width};
  max-width: 100vw;
  height: ${({ height }) => height};
  margin: ${({ height, margin }) =>
    margin ?? `calc(50vh - ${height} / 2) auto`};
  border-radius: ${({ borderRadius }) => borderRadius};
`

export default BaseModal
