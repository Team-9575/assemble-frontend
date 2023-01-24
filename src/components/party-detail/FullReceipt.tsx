import BaseModal from '@components/common/base-modal'
import Button from '@components/common/button'
import HStack from '@components/common/stack/HStack'
import VStack from '@components/common/stack/VStack'
import styled from '@emotion/styled'
import { useFullReceiptQuery } from '@hooks/query/party-detail/useFullReceiptQuery'
import {
  IPartyDetail,
  PartyStatus,
} from '@hooks/query/party-detail/usePartyDetailQuery'
import { Skeleton } from '@mui/material'
import { theme } from '@styles/theme'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import route from 'src/constants/route'

interface IFullReceiptProps {
  isOpen: boolean
  onClose: () => void
  party?: IPartyDetail
}

const FullReceipt = ({ onClose, isOpen, party }: IFullReceiptProps) => {
  const router = useRouter()
  const { data: fullReceipt, isLoading } = useFullReceiptQuery()
  const filteredReceipt = useMemo(() => {
    // TODO: remove here after api is fixed
    return (
      fullReceipt?.receipts.filter((receipt) => !!receipt.joinedMenus.length) ||
      []
    )
  }, [fullReceipt])
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      width="20rem"
      height="80vh"
      borderRadius="10px"
    >
      <Container>
        <Title>영수증</Title>
        <CloseIcon className="material-icons md-16" onClick={onClose}>
          close
        </CloseIcon>
        <Receipt>
          {isLoading &&
            [1, 2, 3].map((_, index) => (
              <VStack
                key={`skeleton-${index}`}
                alignItems="stretch"
                margin="0.5rem 0"
              >
                <Skeleton width="10rem" height="2rem" />
                <HStack justifyContent="space-between">
                  <Skeleton width="5rem" height="1.5rem" />
                  <Skeleton width="5rem" height="1.5rem" />
                </HStack>
                <HStack justifyContent="space-between">
                  <Skeleton width="5rem" height="1.5rem" />
                  <Skeleton width="5rem" height="1.5rem" />
                </HStack>
                <HStack justifyContent="space-between">
                  <Skeleton width="5rem" height="1.5rem" />
                  <Skeleton width="5rem" height="1.5rem" />
                </HStack>
              </VStack>
            ))}
          {!isLoading &&
            filteredReceipt?.map((receipt, index) => (
              <UserMenuContainer
                key={receipt.id}
                hasBorderBottom={index !== filteredReceipt.length - 1}
              >
                <UserName>
                  {receipt.fullName}{' '}
                  <IndividualTotalPrice>
                    {receipt.totalPrice}원
                  </IndividualTotalPrice>
                  <Chip>미정산</Chip>
                </UserName>
                {receipt.joinedMenus.map((menu) => (
                  <VStack
                    alignItems="stretch"
                    margin="0.5rem 0"
                    key={`${receipt?.id}-${menu?.id}`}
                  >
                    <HStack justifyContent="space-around">
                      <MenuName>{menu.name}</MenuName>
                      <MenuPrice>{menu.price.toLocaleString()}원</MenuPrice>
                    </HStack>
                  </VStack>
                ))}
              </UserMenuContainer>
            ))}
          {!isLoading && (
            <>
              <Divider />
              <VStack gap="0.5rem" alignItems="stretch">
                <HStack justifyContent="space-between">
                  <p>
                    총{' '}
                    <Highlight>
                      {fullReceipt?.totalPrice.toLocaleString()}
                    </Highlight>
                    원
                  </p>
                  <DeliveryFeeButton>배달비추가</DeliveryFeeButton>
                </HStack>
                <p>
                  남은 정산 금액 <Highlight>배달비를 추가해주세요</Highlight>
                </p>
              </VStack>
            </>
          )}
        </Receipt>
        {/* FIXME: 정산 완료 시 footer 버튼? */}
        {party?.status === PartyStatus.SettlementCompleted ? (
          <FooterText>정산이 완료되었습니다.</FooterText>
        ) : (
          <HStack margin="1rem 0 0 0" gap="0.5rem" padding="0 1rem">
            <Button
              text="내 계좌 관리"
              variant="outlined"
              onClick={() => {
                router.push(route.myBankAccount)
              }}
            />
            {party?.status === PartyStatus.PartyClosed ? (
              <Button
                text="확정하기"
                onClick={() => {
                  alert('TODO')
                }}
              />
            ) : (
              <Button
                text="미정산 팀즈 알림"
                onClick={() => {
                  alert('TODO')
                }}
              />
            )}
          </HStack>
        )}
      </Container>
    </BaseModal>
  )
}

const Container = styled.div`
  position: relative;
`

const Receipt = styled.div`
  min-height: calc(80vh - 9rem);
  max-height: calc(80vh - 9rem);
  overflow-y: auto;
  position: relative;
  padding: 0 1rem 1rem;
  background-color: #ffffff;
  border-radius: 10px;
`
const Title = styled.p`
  font-weight: bold;
  margin: 0 auto 1.5rem;
  padding: 1rem 0 0 0;
  text-align: center;
`
const CloseIcon = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
`
const Chip = styled.span`
  background-color: #d12121;
  color: #ffffff;
  padding: 0.25rem;
  border-radius: 6px;
  margin-left: 0.5rem;
  font-size: ${theme.fontSize.sm};
`
const IndividualTotalPrice = styled.span`
  font-weight: bold;
`
const UserMenuContainer = styled.div<{ hasBorderBottom?: boolean }>`
  border-bottom: ${({ hasBorderBottom }) =>
    hasBorderBottom && '1px solid #dbdbdb'};
  margin-bottom: 0.5rem;
  padding: 0.25rem 0;
`
const UserName = styled.div`
  font-weight: 500;
`
const MenuName = styled.p`
  width: 70%;
  text-align: left;
  color: #757575;
`
const MenuPrice = styled.p`
  text-align: right;
  width: 30%;
  color: #757575;
`
const Highlight = styled.span`
  font-weight: bold;
`
const Divider = styled.hr`
  height: 1px;
  margin-bottom: 1rem;
  background-color: #757575;
`
const DeliveryFeeButton = styled.button`
  background-color: #f5f5f5;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
`
const FooterText = styled.p`
  font-weight: bold;
  text-align: center;
  padding: 1rem;
  background-color: yellow;
`
export default FullReceipt
