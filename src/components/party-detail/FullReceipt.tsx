import BaseModal from '@components/common/base-modal'
import Button from '@components/common/button'
import HStack from '@components/common/stack/HStack'
import VStack from '@components/common/stack/VStack'
import styled from '@emotion/styled'
import { theme } from '@styles/theme'

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

const users = [
  { name: 'Hilda Jeon', menus: receipt },
  {
    name: 'Kelly Um',
    menus: receipt,
  },
  {
    name: 'Sally Lee',
    menus: receipt,
  },
  {
    name: 'Francis Kim',
    menus: receipt,
  },
]

interface IFullReceiptProps {
  isOpen: boolean
  onClose: () => void
}

const FullReceipt = ({ onClose, isOpen }: IFullReceiptProps) => {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      width="20rem"
      height="90vh"
      borderRadius="10px"
    >
      <Container>
        <Title>영수증</Title>
        <CloseIcon className="material-icons md-16" onClick={onClose}>
          close
        </CloseIcon>
        {users.map((user) => (
          <div key={user.name}>
            <UserName>
              {user.name} <IndividualTotalPrice>9,500원</IndividualTotalPrice>
              <Chip>미정산</Chip>
            </UserName>
            <VStack alignItems="stretch" margin="1rem 0">
              {receipt.map((menu) => (
                <HStack key={menu.name} justifyContent="space-around">
                  <MenuName>{menu.name}</MenuName>
                  <MenuPrice>{menu.price.toLocaleString()}원</MenuPrice>
                </HStack>
              ))}
            </VStack>
          </div>
        ))}
        <Divider />
        <VStack gap="0.5rem">
          <HStack>
            <p>
              총 <Highlight>38,000</Highlight>원
            </p>
            <button>배달비추가</button>
          </HStack>
          <p>
            남은 정산 금액 <Highlight>배달비를 추가해주세요</Highlight>
          </p>
        </VStack>
        <HStack margin="1rem 0 0 0" gap="0.5rem">
          <Button text="계좌 복사" variant="outlined" onClick={() => {}} />
          <Button text="정산했어요" onClick={() => {}} />
        </HStack>
      </Container>
    </BaseModal>
  )
}

const Container = styled.div`
  max-height: 90vh;
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
export default FullReceipt
