import { Tab, Tabs as MuiTabs } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'

interface ITabsProps {
  tabIndex: number
  setTabIndex: Dispatch<SetStateAction<number>>
  labels: string[]
}

const Tabs = ({ tabIndex, setTabIndex, labels }: ITabsProps) => {
  return (
    <MuiTabs
      value={tabIndex}
      onChange={(event, newValue) => {
        setTabIndex(newValue)
      }}
      TabIndicatorProps={{
        style: {
          backgroundColor: '#000000',
        },
      }}
      sx={{
        backgroundColor: '#ffffff',
        '& .Mui-selected': {
          color: '#000000',
          fontWeight: 'bold',
        },
      }}
    >
      {labels.map((label) => (
        <Tab key={label} label={label} sx={{ width: '50%' }} />
      ))}
    </MuiTabs>
  )
}

export default Tabs
