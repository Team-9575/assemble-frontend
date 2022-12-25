import styled from '@emotion/styled'

interface ButtonProps {
  text: string
  variant?: 'contained' | 'outlined'
  isDisabled?: boolean
  type?: 'button' | 'reset' | 'submit'
  onClick: () => void
}

const Button = ({
  text,
  variant = 'contained',
  isDisabled = false,
  onClick,
  type = 'button',
}: ButtonProps) => {
  return isDisabled ? (
    <DisabledButton>{text}</DisabledButton>
  ) : (
    <EnabledButton
      onClick={onClick}
      type={type}
      variant={variant}
      disabled={isDisabled}
    >
      {text}
    </EnabledButton>
  )
}

const EnabledButton = styled.button<{
  variant: 'contained' | 'outlined'
  disabled: boolean
}>`
  background-color: ${({ theme, variant }) =>
    variant === 'contained' && theme.background.footerButton};
  font-weight: 600;
  color: ${({ theme, variant }) =>
    variant === 'contained' && theme.text.footerButton};
  border: ${({ theme, variant }) =>
    variant === 'outlined' && `1px solid ${theme.background.footerButton}`};
  width: 100%;
  padding: 1rem;
  border-radius: 100px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2); // TODO: theme
`
const DisabledButton = styled.button`
  width: 100%;
  background-color: #a8a8a8; // TODO: theme
  font-weight: 600;
  color: #f5f5f5; // TODO: theme
  border-radius: 100px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2); // TODO: theme
  cursor: not-allowed;
  padding: 1rem;
`
export default Button
