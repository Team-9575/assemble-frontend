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
      {({ form: { values, setFieldValue }, meta: { value } }: FieldProps) => (
        <Select
          value={value}
          options={options}
          onChange={(newValue) => {
            onChange(newValue)
            setFieldValue(name, newValue)
          }}
        />
      )}
    </Field>
  )
}

export default SelectFormik
