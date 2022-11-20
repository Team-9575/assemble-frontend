import styled from '@emotion/styled'
import { ReactNode } from 'react'

interface VStackProps {
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

const VStack = ({
  children,
  gap = '0px',
  justifyContent = 'left',
  padding = '0px',
  margin = '0px',
  alignItems = 'flex-start',
}: VStackProps) => {
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
  flex-direction: column;
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  gap: ${({ gap }) => gap};
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
  height: 100%;
  width: 100%;
`
export default VStack
