import styled from '@emotion/styled'
import Header from '@components/common/Header'

const BaseLayout = ({ children }: { children: JSX.Element }) => {
  return (
    <Container>
      <Header />
      {children}
    </Container>
  )
}
const Container = styled.header`
  position: relative;
  margin: 0 0 8.125rem 0;
  max-width: 40rem; // TODO: theme
  background-color: white; // TODO: theme
  margin: 0 auto;
`

export default BaseLayout
