import HStack from '@components/common/stack/HStack'
import styled from '@emotion/styled'
import { theme } from '@styles/theme'

const MenuCard = () => {
  return (
    <Container>
      <MenuContainer>
        <HStack justifyContent="space-between" alignItems="center">
          <Chip>개인</Chip>
          <MoreButton className="material-icons md-20">more_vert</MoreButton>
        </HStack>
        <MenuName>막국수</MenuName>
        <Price>10,000원</Price>
      </MenuContainer>
      <JoinButton>참여</JoinButton>
    </Container>
  )
}

const Container = styled.div`
  background-color: #ffffff;
  width: 100%;
  border-radius: 10px;
  letter-spacing: -0.03px;
  overflow: hidden;
`
const MenuContainer = styled.div`
  padding: 0.5rem;
`
const Chip = styled.div`
  background-color: #3f774c;
  padding: 0.25rem 0.5rem;
  color: #ffffff;
  border-radius: 6px;
`
const MoreButton = styled.button`
  color: #757575;
`
const MenuName = styled.p`
  margin: 0.5rem 0 0.25rem;
`
const Price = styled.p`
  font-weight: 600;
  font-size: ${theme.fontSize.lg};
  text-align: right;
`
const JoinButton = styled.button`
  background-color: #3f774c;
  width: 100%;
  height: 2.25rem;
  margin-top: 0.75rem;
  color: #ffffff;
  font-weight: 600;
`
export default MenuCard
