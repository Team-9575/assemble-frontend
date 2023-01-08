import { Field, FieldProps } from 'formik'
import regex from 'src/constants/regex'
import Input from '../input'

interface IInputFormikProps {
  name: string
  label?: string
  isNumber?: boolean
  hasComma?: boolean
  max?: number
}

const InputFormik = ({
  label = '',
  name,
  isNumber = false,
  hasComma = false,
  max,
}: IInputFormikProps) => {
  return (
    <Field name={name}>
      {({ form: { values, setFieldValue }, meta: { value } }: FieldProps) => (
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
      )}
    </Field>
  )
}

export default InputFormik
