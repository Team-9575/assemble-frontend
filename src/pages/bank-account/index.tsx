import BaseLayout from '@components/common/base-layout'
import Button from '@components/common/button'
import styled from '@emotion/styled'
import { useUserQuery } from '@hooks/query/user/useUserQuery'
import { theme } from '@styles/theme'
import { useState } from 'react'
import AccountEditModal from './AccountEditModal'

const MyBankAccountPage = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const { data: userInfo, isFetched } = useUserQuery()
  return (
    <BaseLayout title="나의 계좌">
      <div>
        <Container hasFooter={!userInfo?.bankAccount}>
          {!!userInfo?.bankAccount ? (
            <>
              <AccountText>현재 등록된 계좌</AccountText>
              <BankAccount>토스 1234512345 name</BankAccount>
              <Footer>
                <Button
                  text="계좌 변경하기"
                  onClick={() => {
                    setIsEditModalOpen(true)
                  }}
                />
              </Footer>
            </>
          ) : (
            <>
              <EmptyText>
                {isFetched ? '등록된 계좌가 없습니다!' : 'Loading...'}
              </EmptyText>
              {isFetched && (
                <Button
                  text="계좌 등록하기"
                  onClick={() => {
                    setIsEditModalOpen(true)
                  }}
                />
              )}
            </>
          )}
        </Container>
        {isEditModalOpen && (
          <AccountEditModal
            isOpen={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false)
            }}
          />
        )}
      </div>
    </BaseLayout>
  )
}
const Container = styled.div<{ hasFooter?: boolean }>`
  height: calc(100vh - 3.5rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ hasFooter }) => (hasFooter ? '1rem 1rem 9rem' : '1rem')};
  background-color: #ffffff;
`
const EmptyText = styled.p`
  font-weight: 600;
  padding: 1rem;
`
const AccountText = styled.p`
  color: #757575;
  font-size: ${theme.fontSize.sm};
  padding: 0.25rem;
`
const BankAccount = styled.div`
  background-color: #f5f5f5;
  width: 100%;
  padding: 0.75rem;
  text-align: center;
  border-radius: 100px;
`
const Footer = styled.footer`
  position: fixed;
  padding: 1rem 1rem 1.5rem;
  bottom: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.background.primary};
  max-width: ${theme.maxWidth};
`

export default MyBankAccountPage
