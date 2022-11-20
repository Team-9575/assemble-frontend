import { Field, FieldProps } from 'formik'
import Input from '../input'

interface IInputFormikProps {
  name: string
  label?: string
}

const SelectFormik = ({ label = '', name }: IInputFormikProps) => {
  return (
    <Field name={name}>
      {({ form: { values, setFieldValue } }: FieldProps) => (
        <Input
          label={label}
          value={values[name]}
          onChange={(value) => {
            setFieldValue(name, value)
          }}
        />
      )}
    </Field>
  )
}

export default SelectFormik
