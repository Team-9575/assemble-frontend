import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { useState } from 'react'

const BaseTabs = () => {
  // TODO: refactor
  const [value, setValue] = useState<number>(0)
  return (
    <Tabs
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
      TabIndicatorProps={{
        style: {
          backgroundColor: '#000000',
        },
      }}
      sx={{ backgroundColor: '#ffffff' }}
    >
      <Tab label="참여한 파티" sx={{ width: '50%' }} />
      <Tab label="내가 만든 파티" sx={{ width: '50%' }} />
    </Tabs>
  )
}

export default BaseTabs
