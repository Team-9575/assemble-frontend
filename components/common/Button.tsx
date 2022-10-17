import styled from '@emotion/styled'

interface ButtonProps {
  text: string
  onClick: () => void
}

const Button = ({ text, onClick }: ButtonProps) => {
  return <Container onClick={onClick}>{text}</Container>
}

const Container = styled.button`
  background-color: #262626; // TODO: theme
  font-weight: 600;
  color: #f2f3fa; // TODO: theme
  width: 100%;
  padding: 1rem;
  border-radius: 100px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
`
export default Button
