import BaseModal from '@components/common/base-modal'
import Button from '@components/common/button'
import VStack from '@components/common/stack/VStack'
import styled from '@emotion/styled'
import { useState } from 'react'

interface IReviewModalProps {
  isOpen: boolean
  onClose: () => void
}

const reviews = [
  '정말 맛있었어요!',
  '편하게 점심을 해결할 수 있었어요',
  '못보던 곳이었는데 알게됐어요',
  '빠르게 정산할 수 있어 좋네요!',
  '배달이 늦게와서 배고팠어요...',
  '리뷰에 관한 말',
]

const ReviewModal = ({ isOpen, onClose }: IReviewModalProps) => {
  const [selectedReview, setSelectedReview] = useState('')
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      width="20rem"
      height="26rem"
      borderRadius="10px"
    >
      <Container>
        <Title>리뷰</Title>
        <CloseButton className="material-icons md-16">close</CloseButton>
        <VStack margin="1.5rem 0 1.5rem 0" alignItems="stretch" gap="0.5rem">
          {reviews.map((review) => (
            <ReviewButton
              key={review}
              isSelected={review === selectedReview}
              hasReview={!!selectedReview}
              onClick={() => {
                setSelectedReview(selectedReview === review ? '' : review)
              }}
            >
              {review}
            </ReviewButton>
          ))}
        </VStack>
        <Button text="확인" onClick={onClose} isDisabled={!selectedReview} />
      </Container>
    </BaseModal>
  )
}

const Container = styled.div`
  position: relative;
  padding: 1rem;
`
const Title = styled.p`
  font-weight: bold;
  text-align: center;
`
const CloseButton = styled.button`
  color: #757575;
  position: absolute;
  top: 1rem;
  right: 1rem;
`
const ReviewButton = styled.button<{ hasReview: boolean; isSelected: boolean }>`
  color: ${({ isSelected }) => (isSelected ? '#424242' : '#757575')};
  border: ${({ isSelected }) =>
    isSelected ? '1px solid #424242' : '1px solid #dbdbdb'};
  padding: 0.5rem;
  box-shadow: ${({ isSelected }) =>
    isSelected && '0 -2px 8px rgba(0, 0, 0, 0.2)'};
  border-radius: 10px;
  text-align: left;
`
export default ReviewModal
