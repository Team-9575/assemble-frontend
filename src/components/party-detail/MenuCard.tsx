import HStack from '@components/common/stack/HStack'
import styled from '@emotion/styled'
import { PayType } from '@hooks/query/party-detail/useNewMenuMutation'
import { IMenu } from '@hooks/query/party-detail/usePartyDetailQuery'
import { Skeleton } from '@mui/material'
import { theme } from '@styles/theme'

const getPayTypeInfo = (payType?: PayType) => {
  switch (payType) {
    case PayType.Individual:
      return { color: '#3F774C', text: '개인' }
    case PayType.All:
      return { color: '#3036BD', text: '전체' }
    case PayType.Group:
      return { color: '#0B74C0', text: '그룹' }
    default:
      return { color: '#fff', text: '' }
  }
}

const MenuCard = ({
  menu,
  isLoading = false,
}: {
  menu?: IMenu
  isLoading?: boolean
}) => {
  return (
    <Container>
      <MenuContainer>
        <HStack justifyContent="space-between" alignItems="center">
          {isLoading ? (
            <Skeleton width="2.25rem" height="1.5rem" />
          ) : (
            <Chip color={getPayTypeInfo(menu?.payType).color}>
              {getPayTypeInfo(menu?.payType).text}
            </Chip>
          )}
          <MoreButton className="material-icons md-20">more_vert</MoreButton>
        </HStack>
        {isLoading ? (
          <Skeleton width="7rem" />
        ) : (
          <MenuName>{menu?.name}</MenuName>
        )}
        {isLoading ? (
          <Skeleton width="7rem" />
        ) : (
          <Price>{menu?.price.toLocaleString()}원</Price>
        )}
      </MenuContainer>
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
const Chip = styled.div<{ color: string }>`
  background-color: ${({ color }) => `${color}30`};
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  color: ${({ color }) => color};
  font-size: ${theme.fontSize.xs};
  border-radius: 6px;
`
const MoreButton = styled.button`
  color: #757575;
`
const MenuName = styled.p`
  margin: 0.5rem 0 0.25rem;
  font-size: ${theme.fontSize.sm};
`
const Price = styled.p`
  font-weight: 600;
  font-size: ${theme.fontSize.sm};
`

export default MenuCard
