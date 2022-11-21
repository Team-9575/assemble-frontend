import { Field, FieldProps } from 'formik'
import Select, { ISelectOption } from '../select'

interface ISelectFormikProps {
  name: string
  options: ISelectOption[]
  onChange?: (value: string) => void
}

const SelectFormik = ({
  name,
  options,
  onChange = () => {},
}: ISelectFormikProps) => {
  return (
    <Field name={name}>
      {({ form: { values, setFieldValue } }: FieldProps) => (
        <Select
          value={values[name]}
          options={options}
          onChange={(value) => {
            onChange(value)
            setFieldValue(name, value)
          }}
        />
      )}
    </Field>
  )
}

export default SelectFormik
