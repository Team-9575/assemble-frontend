import Button from '@components/common/button'
import InputFormik from '@components/common/formik/InputFormik'
import VStack from '@components/common/stack/VStack'
import styled from '@emotion/styled'
import { Drawer } from '@mui/material'
import { theme } from '@styles/theme'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'

export enum PayType {
  // TODO: check type
  Individual,
  Group,
  All,
}

interface IMenuDrawerProps {
  onClose: () => void
}

const initialValues = {
  name: '',
  description: '',
  price: 0,
  payType: 0,
}

const validationSchema = Yup.object({
  name: Yup.string().required('required'),
  description: Yup.string(),
  price: Yup.string().required('required'),
  payType: Yup.number().required('required'),
})

const MenuDrawer = ({ onClose }: IMenuDrawerProps) => {
  return (
    <Drawer
      anchor="bottom"
      open
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          maxWidth: theme.maxWidth,
          margin: '0 auto',
          borderRadius: '10px 10px 0px 0px',
        },
      }}
    >
      <Container>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {}}
          validateOnChange
          validateOnBlur
          validateOnMount
        >
          {({ errors, touched, values, isValid, setFieldValue }) => (
            <Form>
              <VStack gap="1rem">
                <Title>메뉴 추가하기</Title>
                <VStack gap="0.375rem">
                  <OptionTitle>메뉴 유형을 선택해주세요.</OptionTitle>
                </VStack>
                <VStack gap="0.375rem">
                  <OptionTitle>메뉴 명을 입력해주세요.</OptionTitle>
                  <InputFormik label="메뉴 명을 입력해주세요." name="name" />
                </VStack>
                <VStack gap="0.375rem">
                  <OptionTitle>메뉴 가격을 입력해주세요.</OptionTitle>
                  <InputFormik
                    label="메뉴 가격을 입력해주세요."
                    name="price"
                    isNumber
                  />
                </VStack>
                <Button text="완료" isDisabled={!isValid} onClick={() => {}} />
              </VStack>
            </Form>
          )}
        </Formik>
      </Container>
    </Drawer>
  )
}

const Container = styled.div`
  padding: 1rem;
`
const Title = styled.p`
  font-weight: 600;
  text-align: center;
`
const OptionTitle = styled.p`
  font-size: ${theme.fontSize.sm};
`
export default MenuDrawer
