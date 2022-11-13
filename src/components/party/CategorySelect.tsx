import styled from '@emotion/styled'
import { Title } from './NewPartyModal'

interface CategorySelectProps {}

const CategorySelect = ({}: CategorySelectProps) => {
  return (
    <Container>
      <Title>메뉴 카테고리를 선택해 주세요.</Title>
    </Container>
  )
}

const Container = styled.div`
  font-weight: 600;
  letter-spacing: -0.2px;
`

export default CategorySelect
