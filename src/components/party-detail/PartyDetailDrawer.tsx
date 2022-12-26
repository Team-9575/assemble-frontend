import styled from '@emotion/styled'
import { Drawer } from '@mui/material'
import { theme } from '@styles/theme'

interface IMenuDrawerProps {
  onClose: () => void
}

const PartyDetailDrawer = ({ onClose }: IMenuDrawerProps) => {
  return (
    <Drawer
      anchor="top"
      open
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          maxWidth: theme.maxWidth,
          margin: '0 auto',
          borderRadius: '0px 0px 10px 10px',
        },
      }}
    >
      <Container>party detail</Container>
    </Drawer>
  )
}

const Container = styled.div`
  padding: 1rem;
`
const Title = styled.p`
  font-weight: 600;
  text-align: center;
`
const OptionTitle = styled.p`
  font-size: ${theme.fontSize.sm};
`
export default PartyDetailDrawer
