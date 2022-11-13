import styled from '@emotion/styled'

interface ButtonProps {
  text: string
  variant?: 'contained' | 'outlined'
  isDisabled?: boolean
  onClick: () => void
}

const Button = ({
  text,
  variant = 'contained',
  isDisabled = false,
  onClick,
}: ButtonProps) => {
  return (
    <Container onClick={onClick} variant={variant} disabled={isDisabled}>
      {text}
    </Container>
  )
}

const Container = styled.button<{
  variant: 'contained' | 'outlined'
  disabled: boolean
}>`
  background-color: ${({ theme }) => theme.background.footerButton};
  font-weight: 600;
  color: ${({ theme }) => theme.text.footerButton};
  width: 100%;
  padding: 1rem;
  border-radius: 100px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
`
export default Button
