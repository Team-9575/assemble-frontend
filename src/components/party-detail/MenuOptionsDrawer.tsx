import VStack from '@components/common/stack/VStack'
import styled from '@emotion/styled'
import { IMenu } from '@hooks/query/party-detail/usePartyDetailQuery'
import { Drawer, IconButton } from '@mui/material'
import { theme } from '@styles/theme'

interface IMenuOptionsDrawerProps {
  onClose: () => void
  menu?: IMenu
  isOpen: boolean
}

const MenuOptionsDrawer = ({
  onClose,
  isOpen,
  menu,
}: IMenuOptionsDrawerProps) => {
  return (
    <Drawer
      anchor="bottom"
      open={isOpen}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          maxWidth: theme.maxWidth,
          margin: '0 auto',
          borderRadius: '10px 10px 0px 0px',
        },
      }}
    >
      <VStack alignItems="stretch">
        <Title>{menu?.name}</Title>
        <IconButton sx={{ position: 'absolute', top: '0.5rem', right: '1rem' }}>
          <span className="material-icons md-16">close</span>
        </IconButton>
        <OptionButton hasBorderBottom>메뉴 삭제하기</OptionButton>
        <OptionButton hasBorderBottom>메뉴 수정하기</OptionButton>
        <OptionButton>참여한 인원 보기</OptionButton>
      </VStack>
    </Drawer>
  )
}

const Title = styled.p`
  padding: 1rem;
  font-weight: 500;
  text-align: center;
`
const OptionButton = styled.button<{ hasBorderBottom?: boolean }>`
  border-bottom: ${({ hasBorderBottom }) =>
    hasBorderBottom && '1px solid #f5f5f5'};
  padding: 1rem;
  &:hover {
    opacity: 0.5;
    background-color: #f5f5f5;
  }
`

export default MenuOptionsDrawer
