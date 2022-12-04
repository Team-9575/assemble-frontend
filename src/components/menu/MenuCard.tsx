import HStack from '@components/common/stack/HStack'
import styled from '@emotion/styled'

const MenuCard = () => {
  return (
    <Container>
      <HStack alignItems="center" justifyContent="space-between">
        <Chip>개인</Chip>
        <MoreButton className="material-icons md-16">more_vert</MoreButton>
      </HStack>
    </Container>
  )
}

const Container = styled.div`
  background-color: #ffffff;
  width: 100%;
  padding: 1rem;
`
const Chip = styled.div`
  background-color: #3f774c;
  border-radius: 6px;
  color: #ffffff;
`
const MoreButton = styled.button`
  color: #757575;
`

export default MenuCard
