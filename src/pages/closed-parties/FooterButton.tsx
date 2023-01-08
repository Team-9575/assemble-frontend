import Button from '@components/common/button'
import styled from '@emotion/styled'
import { theme } from '@styles/theme'
import Router from 'next/router'
import route from 'src/constants/route'

const FooterButton = () => {
  return (
    <Footer>
      <Button
        text="방 둘러보기"
        onClick={() => {
          Router.push(route.main)
        }}
      />
    </Footer>
  )
}
const Footer = styled.footer`
  position: fixed;
  padding: 1rem 1rem 1.5rem;
  bottom: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.background.primary};
  box-shadow: 0px -2px 8px rgba(0, 0, 0, 0.2);
  max-width: ${theme.maxWidth};
`
export default FooterButton
