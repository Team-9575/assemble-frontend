import ConfirmModal from '@components/common/base-modal/ConfirmModal'
import HStack from '@components/common/stack/HStack'
import styled from '@emotion/styled'
import { useMenuExitMutation } from '@hooks/query/menu/MenuExitMutation'
import { useMenuJoinMutation } from '@hooks/query/menu/MenuJoinMutation'
import { PayType } from '@hooks/query/party-detail/useNewMenuMutation'
import { IMenu } from '@hooks/query/party-detail/usePartyDetailQuery'
import { IconButton, Skeleton } from '@mui/material'
import { theme } from '@styles/theme'
import { useRouter } from 'next/router'
import { useState } from 'react'
import MenuOptionsDrawer from './MenuOptionsDrawer'

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

interface IMenuCardProps {
  menu?: IMenu
  isLoading?: boolean
  isAssembler?: boolean
}

const MenuCard = ({
  menu,
  isLoading = false,
  isAssembler = false,
}: IMenuCardProps) => {
  const router = useRouter()
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false)
  const [isExitModalOpen, setIsExitModalOpen] = useState(false)
  const [isOptionsDrawerOpen, setIsOptionsDrawerOpen] = useState(false)
  const { mutateAsync: joinMenu } = useMenuJoinMutation()
  const { mutateAsync: exitMenu } = useMenuExitMutation()
  const payload = {
    partyId: Number(router.query.partyId?.toString()),
    menuId: menu?.id || 0,
  }

  return (
    <>
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
            {!isLoading && (
              <IconButton
                onClick={() => {
                  setIsOptionsDrawerOpen(true)
                }}
              >
                <MoreIcon className="material-icons md-20">more_vert</MoreIcon>
              </IconButton>
            )}
            {(menu?.payType === PayType.Individual ||
              (menu?.payType === PayType.Group && isAssembler)) && (
              <Counter>
                <CounterButton
                  onClick={() => {
                    alert('TODO')
                  }}
                >
                  +
                </CounterButton>
                <Quantity>1</Quantity>
                <CounterButton
                  onClick={() => {
                    alert('TODO')
                  }}
                >
                  -
                </CounterButton>
              </Counter>
            )}
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
          {menu?.payType !== PayType.All && (
            <JoinButton
              color={getPayTypeInfo(menu?.payType).color}
              onClick={() => {
                if (menu?.isJoined) {
                  setIsExitModalOpen(true)
                } else {
                  setIsJoinModalOpen(true)
                }
              }}
            >
              {menu?.isJoined ? '빠지기' : '참여'}
            </JoinButton>
          )}
        </MenuContainer>
      </Container>
      <ConfirmModal
        isOpen={isJoinModalOpen}
        onClose={() => {
          setIsJoinModalOpen(false)
        }}
        onConfirm={async () => {
          await joinMenu(payload)
        }}
        title="메뉴 참여"
        description={`"${menu?.name}"에 참여하시겠습니까?`}
      />
      <ConfirmModal
        isOpen={isExitModalOpen}
        onClose={() => {
          setIsExitModalOpen(false)
        }}
        onConfirm={async () => {
          await exitMenu(payload)
        }}
        title="참여한 메뉴에서 빠지기"
        description={`"${menu?.name}"에서 빠지시겠습니까?`}
      />
      <MenuOptionsDrawer
        isOpen={isOptionsDrawerOpen}
        menu={menu}
        onClose={() => {
          setIsOptionsDrawerOpen(false)
        }}
      />
    </>
  )
}

const Container = styled.div`
  background-color: #ffffff;
  width: 100%;
  border-radius: 10px;
  letter-spacing: -0.03px;
  overflow: hidden;
  position: relative;
`
const MenuContainer = styled.div`
  padding: 0.75rem 0.5rem;
`
const Chip = styled.div<{ color: string }>`
  background-color: ${({ color }) => `${color}30`};
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  color: ${({ color }) => color};
  font-size: ${theme.fontSize.xs};
  border-radius: 6px;
`
const MoreIcon = styled.span`
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
const JoinButton = styled.button<{ color: string }>`
  background-color: ${({ color }) => color};
  color: #ffffff;
  position: absolute;
  padding: 6px 12px;
  font-size: ${theme.fontSize.sm};
  border-radius: 6px;
  font-weight: 600;
  right: 1rem;
  bottom: 0.75rem;
`
const Counter = styled.div`
  position: absolute;
  right: 3rem;
  height: 1.5rem;
  display: flex;
  border: 1px solid #f5f5f5;
`
const CounterButton = styled.button`
  color: #757575;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 0.1rem;
  &:hover {
    background-color: #f5f5f5;
  }
`
const Quantity = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${theme.fontSize.xs};
`

export default MenuCard
