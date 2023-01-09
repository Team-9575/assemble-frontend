import styled from '@emotion/styled'
import { theme } from '@styles/theme'
import { Field, FieldProps } from 'formik'
import regex from 'src/constants/regex'
import Input from '../input'
import VStack from '../stack/VStack'

interface IInputFormikProps {
  name: string
  label?: string
  isNumber?: boolean
  hasComma?: boolean
  max?: number
  hasErrorMessage?: boolean
}

const InputFormik = ({
  label = '',
  name,
  isNumber = false,
  hasComma = false,
  hasErrorMessage = false,
  max,
}: IInputFormikProps) => {
  return (
    <Field name={name}>
      {({
        form: { values, setFieldValue },
        meta: { value, error, touched },
      }: FieldProps) => (
        <VStack gap="0.25rem">
          <Input
            label={label}
            value={value ?? ''}
            onChange={(newValue) => {
              let filteredValue = newValue
              if (max && max < newValue.length) {
                filteredValue = newValue.substring(0, max)
              }
              if (isNumber) {
                const numberValue = filteredValue.replace(regex.notNumber, '')
                setFieldValue(
                  name,
                  hasComma ? Number(numberValue).toLocaleString() : numberValue
                )
              } else {
                setFieldValue(name, filteredValue)
              }
            }}
          />
          {hasErrorMessage && <ErrorMessage>{error}</ErrorMessage>}
        </VStack>
      )}
    </Field>
  )
}

const ErrorMessage = styled.p`
  color: #ff0000;
  font-weight: 400;
  font-size: ${theme.fontSize.xs};
`

export default InputFormik
