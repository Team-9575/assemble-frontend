import styled from '@emotion/styled'

const Header = () => {
  return (
    <Container>
      <button className="material-symbols-outlined md-16">menu</button>
      {/* TODO: navigation drawer */}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: right;
  padding: 0.75rem 1.25rem;
  width: 100%;
  z-index: 10;
  background-color: white; // TODO: theme
`
export default Header
