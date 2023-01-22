import Button from '@components/common/button'
import InputFormik from '@components/common/formik/InputFormik'
import VStack from '@components/common/stack/VStack'
import styled from '@emotion/styled'
import {
  PayType,
  useNewMenuMutation,
} from '@hooks/query/party-detail/useNewMenuMutation'
import { Drawer } from '@mui/material'
import { theme } from '@styles/theme'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'

interface IMenuDrawerProps {
  onClose: () => void
  partyId: number
  isOpen: boolean
}

const initialValues = {
  name: '',
  description: '',
  price: '',
  payType: null,
}

const validationSchema = Yup.object({
  name: Yup.string().required('required'),
  description: Yup.string(),
  price: Yup.string().required('required'),
  payType: Yup.number().required('required'),
})

const payType = [
  {
    name: '개인 메뉴',
    value: PayType.Individual,
    description: '(개인별로 정산)',
  },
  {
    name: '전체 메뉴',
    value: PayType.All,
    description: '(전체 파티원 수로 정산)',
  },
  {
    name: '그룹 메뉴',
    value: PayType.Group,
    description: '(해당 메뉴를 선택한 인원 수로 정산)',
  },
]

const MenuDrawer = ({ onClose, partyId, isOpen }: IMenuDrawerProps) => {
  const { mutateAsync } = useNewMenuMutation()

  return (
    <Drawer
      anchor="bottom"
      open={isOpen}
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
                  {payType.map((type) => (
                    <MenuType
                      key={type.value}
                      hasType={values.payType !== null}
                      isSelected={values.payType === type.value}
                      type="button"
                      onClick={() => {
                        setFieldValue(
                          'payType',
                          values.payType === type.value ? null : type.value
                        )
                      }}
                    >
                      {type.name}{' '}
                      <TypeDescription>{type.description}</TypeDescription>
                    </MenuType>
                  ))}
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
                    hasComma
                    isNumber
                    max={18}
                  />
                </VStack>
                <Button
                  text="완료"
                  isDisabled={!isValid}
                  type="submit"
                  onClick={async () => {
                    await mutateAsync({
                      menu: {
                        ...values,
                        price: Number(values.price.split(',').join('')),
                      },
                      partyId,
                    })
                    onClose()
                  }}
                />
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
const MenuType = styled.button<{ hasType: boolean; isSelected: boolean }>`
  font-weight: bold;
  padding: 0.75rem;
  border: ${({ isSelected }) =>
    isSelected ? '1px solid #000000' : '1px solid #dbdbdb'};
  color: ${({ hasType, isSelected }) =>
    !hasType || isSelected ? '#000000' : '#757575'};
  width: 100%;
  text-align: left;
  border-radius: 10px;
`
const TypeDescription = styled.span`
  font-size: ${theme.fontSize.xs};
  font-weight: normal;
`
export default MenuDrawer
