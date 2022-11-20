import {
  FormControl,
  MenuItem,
  Select as MuiSelect,
  SelectChangeEvent,
} from '@mui/material'

const partyTitle = [
  '같이 점심 드실 분?',
  '같이 저녁 드실 분?',
  '제목',
  '직접입력',
]

const Select = () => {
  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target.value)
  }

  return (
    <FormControl sx={{ minWidth: 120, width: '100%' }} size="small">
      <MuiSelect
        value={partyTitle[0]}
        onChange={handleChange}
        displayEmpty
        sx={{ borderRadius: '10px' }}
      >
        {partyTitle.map((title) => (
          <MenuItem key={title} value={title}>
            {title}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  )
}

export default Select
