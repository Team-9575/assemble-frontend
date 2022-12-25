import { Field, FieldProps } from 'formik'
import regex from 'src/constants/regex'
import Input from '../input'

interface IInputFormikProps {
  name: string
  label?: string
  isNumber?: boolean
}

const InputFormik = ({
  label = '',
  name,
  isNumber = false,
}: IInputFormikProps) => {
  return (
    <Field name={name}>
      {({ form: { values, setFieldValue }, meta: { value } }: FieldProps) => (
        <Input
          label={label}
          value={value}
          onChange={(newValue) => {
            if (isNumber) {
              setFieldValue(name, newValue.replace(regex.notNumber, ''))
            } else {
              setFieldValue(name, newValue)
            }
          }}
        />
      )}
    </Field>
  )
}

export default InputFormik
