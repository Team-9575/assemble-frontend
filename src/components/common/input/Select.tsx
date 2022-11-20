import { FormControl, MenuItem, Select as MuiSelect } from '@mui/material'

export interface ISelectOption {
  name: string
  value: string | number
}

interface ISelectProps {
  value: string
  onChange: (value: string) => void
  options: ISelectOption[]
}

const Select = ({ value, options, onChange }: ISelectProps) => {
  return (
    <FormControl sx={{ minWidth: 120, width: '100%' }} size="small">
      <MuiSelect
        value={value}
        onChange={(event) => onChange(event.target.value)}
        displayEmpty
        sx={{ borderRadius: '10px' }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.name}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  )
}

export default Select
