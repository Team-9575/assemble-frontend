import styled from '@emotion/styled'

export interface IToggleButton {
  name: string
  value: boolean | string | number
}

interface IToggleButtonProps {
  value: boolean | number | string
  options: IToggleButton[]
  onChange: (value: boolean | number | string) => void
}

const ToggleButton = ({ options, value, onChange }: IToggleButtonProps) => {
  return (
    <Container>
      {options.map((option) => (
        <Button
          key={option.value.toString()}
          type="button"
          isSelected={value === option.value}
          onClick={() => {
            onChange(option.value)
          }}
        >
          {option.name}
        </Button>
      ))}
    </Container>
  )
}

const Container = styled.div`
  background-color: #f5f5f5;
  display: flex;
  height: 3rem;
  border-radius: 10px;
`
const Button = styled.button<{ isSelected: boolean }>`
  width: 100%;
  border: ${({ isSelected }) =>
    isSelected && '1px solid #424242'}; // TODO: theme
  background-color: ${({ isSelected }) => isSelected && 'white'}; // TODO: theme
  font-weight: ${({ isSelected }) => isSelected && 'bold'}; // TODO: theme
  margin: 0.25rem;
  border-radius: 10px;
  box-shadow: ${({ isSelected }) =>
    isSelected && '0px 0px 2px rgba(0, 0, 0, 0.1)'}; // TODO: theme
  &:hover {
    font-weight: bold;
  }
`

export default ToggleButton
