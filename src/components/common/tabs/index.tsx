import { Tab, Tabs as MuiTabs } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'

interface ITabsProps {
  selectedTab: string
  setSelectedTab: Dispatch<SetStateAction<string>>
  labels: { name: string; value: string }[]
}

const Tabs = ({ selectedTab, setSelectedTab, labels }: ITabsProps) => {
  return (
    <MuiTabs
      value={selectedTab}
      onChange={(event, newValue) => {
        setSelectedTab(newValue)
      }}
      TabIndicatorProps={{
        style: {
          backgroundColor: '#000000',
        },
      }}
      sx={{
        backgroundColor: '#ffffff',
        '& .Mui-selected': {
          color: '#000000 !important',
          fontWeight: 'bold',
        },
      }}
    >
      {labels.map((label) => (
        <Tab
          key={label.name}
          label={label.name}
          sx={{ width: '50%' }}
          value={label.value}
        />
      ))}
    </MuiTabs>
  )
}

export default Tabs
