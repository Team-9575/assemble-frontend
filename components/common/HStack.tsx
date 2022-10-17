import styled from '@emotion/styled'
import { ReactNode } from 'react'

interface HStackProps {
  children: ReactNode
  gap?: string
  padding?: string
  margin?: string
  justifyContent?:
    | 'left'
    | 'right'
    | 'center'
    | 'space-between'
    | 'space-around'
  alignItems?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline'
}

const HStack = ({
  children,
  gap = '0px',
  justifyContent = 'left',
  padding = '0px',
  margin = '0px',
  alignItems = 'flex-start',
}: HStackProps) => {
  return (
    <Container
      gap={gap}
      justifyContent={justifyContent}
      alignItems={alignItems}
      padding={padding}
      margin={margin}
    >
      {children}
    </Container>
  )
}

const Container = styled.div<{
  gap: string
  justifyContent: string
  alignItems: string
  padding: string
  margin: string
}>`
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  gap: ${({ gap }) => gap};
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
`
export default HStack
