import { Field, FieldProps } from 'formik'
import Select, { ISelectOption } from '../input/Select'

interface ISelectFormikProps {
  name: string
  options: ISelectOption[]
}

const SelectFormik = ({ name, options }: ISelectFormikProps) => {
  return (
    <Field name={name}>
      {({ form: { values, setFieldValue } }: FieldProps) => (
        <Select
          value={values[name]}
          options={options}
          onChange={(value) => setFieldValue(name, value)}
        />
      )}
    </Field>
  )
}

export default SelectFormik
