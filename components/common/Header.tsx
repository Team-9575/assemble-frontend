import styled from '@emotion/styled'
import useTheme from '@hooks/context/useTheme'

const Header = () => {
  const { themeName, setThemeName } = useTheme()

  return (
    <Container>
      <MenuButton
        className="material-symbols-outlined md-16"
        onClick={() => {
          setThemeName(themeName === 'light' ? 'dark' : 'light')
        }}
      >
        menu
      </MenuButton>
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
  background-color: ${({ theme }) => theme.background.primary};
`
const MenuButton = styled.button`
  color: ${({ theme }) => theme.icon.primary};
`
export default Header
