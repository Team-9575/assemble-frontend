import BaseModal from '@components/common/base-modal'
import Button from '@components/common/button'
import InputFormik from '@components/common/formik/InputFormik'
import SelectFormik from '@components/common/formik/SelectFormk'
import VStack from '@components/common/stack/VStack'
import styled from '@emotion/styled'
import { theme } from '@styles/theme'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'

interface AccountEditModalProps {
  isOpen: boolean
  onClose: () => void
}

const initialValues = {
  bank: '',
  accountNumber: '',
  name: '',
}

const validationSchema = Yup.object({
  bank: Yup.string().required(),
  accountNumber: Yup.string().required(),
  name: Yup.string().required(),
})

const AccountEditModal = ({ isOpen, onClose }: AccountEditModalProps) => {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      width={theme.maxWidth}
      height="100vh"
    >
      <Container>
        <ModalHeader>
          <span>계좌 추가하기</span>
          <CloseButton className="material-icons md-20" onClick={onClose}>
            close
          </CloseButton>
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {}}
          >
            {({ errors, touched, values, isValid, setFieldValue }) => (
              <Form>
                <>
                  <Title>계좌 정보를 입력해주세요.</Title>
                  <VStack gap="0.5rem">
                    <SelectFormik
                      name="bank"
                      options={[
                        { value: '', name: '은행' },
                        { value: 'toss', name: 'toss' },
                      ]}
                    />
                    <InputFormik
                      label="계좌번호를 입력해 주세요"
                      name="bankAccount"
                    />
                  </VStack>
                  <Title>예금주명을 입력해주세요.</Title>
                  <InputFormik label="ex.홍길동" name="name" />
                  <ModalFooter>
                    <Button text="완료" onClick={onClose} />
                  </ModalFooter>
                </>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Container>
    </BaseModal>
  )
}

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`

const ModalHeader = styled.div`
  min-height: 3.25rem;
  font-weight: 600;
  letter-spacing: -0.3px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #f5f5f5;
`
const CloseButton = styled.button`
  color: black;
  position: absolute;
  right: 1rem;
  top: 1rem;
`
const ModalBody = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 1rem;
`
const ModalFooter = styled.div`
  display: flex;
  gap: 0.5rem;
  position: fixed;
  padding: 1.5rem;
  width: 100%;
  max-width: ${theme.maxWidth};
  bottom: 0;
  background-color: #ffffff;
`
const Title = styled.p`
  color: black;
  margin: 1.5rem 0 0.5rem 0;
`

export default AccountEditModal
