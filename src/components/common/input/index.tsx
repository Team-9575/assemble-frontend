import { TextField } from '@mui/material'

interface IInputProps {
  label?: string
  value: string
  onChange: (value: string) => void
}

const Input = ({ label = '', value, onChange }: IInputProps) => {
  return (
    <TextField
      label={label}
      variant="outlined"
      value={value}
      size="small"
      sx={{
        width: '100%',
        '& fieldset': {
          borderRadius: '10px',
        },
      }}
      onChange={(event) => {
        onChange(event.target.value)
      }}
    />
  )
}

export default Input
