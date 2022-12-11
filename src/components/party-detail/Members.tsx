import CircleImage from '@components/common/circle-image'
import styled from '@emotion/styled'

const Members = () => {
  return (
    <Container>
      <CircleImage src="/images/profile.jpg" alt="profile" size="2rem" />
      <CircleImage src="/images/profile.jpg" alt="profile" size="2rem" />
      <CircleImage src="/images/profile.jpg" alt="profile" size="2rem" />
      <CircleImage src="/images/profile.jpg" alt="profile" size="2rem" />
      <AddButton>+</AddButton>
    </Container>
  )
}
const Container = styled.section`
  padding: 0.75rem 1rem;
  border-radius: 0px 0px 30px 0px;
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.background.primary};
  display: flex;
  gap: 0.25rem;
`
const AddButton = styled.button`
  border: 1px solid #a8a8a8;
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  color: #a8a8a8;
`
export default Members
