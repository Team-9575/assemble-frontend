import styled from '@emotion/styled'
import { Title } from './NewPartyModal'

interface OptionalInputsProps {}

const OptionalInputs = ({}: OptionalInputsProps) => {
  return (
    <Container>
      <Title>파티를 설명할 수 있는 키워드를 적어보세요!</Title>
      <Title>식당 및 메뉴 관련 링크를 입력해주세요.</Title>
    </Container>
  )
}

const Container = styled.div`
  font-weight: 600;
  letter-spacing: -0.2px;
`

export default OptionalInputs
