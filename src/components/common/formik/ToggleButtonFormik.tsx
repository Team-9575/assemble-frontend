import { Field, FieldProps } from 'formik'
import ToggleButton, { IToggleButton } from '../input/ToggleButton'

interface IToggleButtonFormikProps {
  name: string
  options: IToggleButton[]
}

const ToggleButtonFormik = ({ name, options }: IToggleButtonFormikProps) => {
  return (
    <Field name={name}>
      {({ form: { values, setFieldValue } }: FieldProps) => (
        <ToggleButton
          options={options}
          value={values[name]}
          onChange={(value) => setFieldValue(name, value)}
        />
      )}
    </Field>
  )
}

export default ToggleButtonFormik
