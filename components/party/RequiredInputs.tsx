import styled from '@emotion/styled'
import { Title } from './NewPartyModal'

interface RequiredInputsProps {}

const RequiredInputs = ({}: RequiredInputsProps) => {
  return (
    <Container>
      <Title>*제목을 선택해주세요.</Title>
      <Title>*식사 시간을 선택해주세요.</Title>
      <Title>*모집 종료시간을 선택해주세요.</Title>
      <Title>*최대 인원을 설정해주세요.</Title>
      <Title>*공개 여부를 선택해주세요.</Title>
    </Container>
  )
}

const Container = styled.div`
  font-weight: 600;
  letter-spacing: -0.2px;
`

export default RequiredInputs
