import BaseModal from '@components/common/base-modal'
import Button from '@components/common/button'
import HStack from '@components/common/stack/HStack'
import VStack from '@components/common/stack/VStack'
import styled from '@emotion/styled'
import { useMyReceiptQuery } from '@hooks/query/party-detail/useMyReceiptQuery'

const receipt = [
  {
    name: '떡갈비마요',
    price: 4500,
  },
  {
    name: '야끼만두',
    price: 2000,
  },
  {
    name: '치즈범벅 해쉬감자',
    price: 3000,
  },
]

interface IMyReceiptProps {
  isOpen: boolean
  onClose: () => void
}

const MyReceipt = ({ onClose, isOpen }: IMyReceiptProps) => {
  const { data: receipt2, isLoading } = useMyReceiptQuery()
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      width="20rem"
      height="15rem"
      margin="10rem auto"
      borderRadius="10px"
    >
      <Container>
        <Title>영수증(TODO)</Title>
        <CloseIcon className="material-icons md-16" onClick={onClose}>
          close
        </CloseIcon>
        <p>
          총 <TotalPrice>9,500</TotalPrice>원을 보내주세요!
        </p>
        <VStack alignItems="stretch" margin="1rem 0">
          {receipt.map((menu) => (
            <HStack key={menu.name} justifyContent="space-around">
              <MenuName>{menu.name}</MenuName>
              <MenuPrice>{menu.price.toLocaleString()}원</MenuPrice>
            </HStack>
          ))}
        </VStack>
        <AccountInfo>Francis Kim의 계좌정보</AccountInfo>
        <p>3333 - 12341234 카카오뱅크</p>
        <HStack margin="1rem 0 0 0" gap="0.5rem">
          <Button text="계좌 복사" variant="outlined" onClick={() => {}} />
          <Button text="정산했어요" onClick={() => {}} />
        </HStack>
      </Container>
    </BaseModal>
  )
}

const Container = styled.div`
  max-height: 25rem;
  overflow-y: auto;
  position: relative;
  padding: 1rem;
  background-color: #ffffff;
  border-radius: 10px;
`
const Title = styled.p`
  font-weight: bold;
  margin: 0 auto 1.5rem;
  text-align: center;
`
const CloseIcon = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
`
const TotalPrice = styled.span`
  font-weight: bold;
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
const AccountInfo = styled.p`
  font-weight: 500;
  margin-bottom: 0.25rem;
`
export default MyReceipt
