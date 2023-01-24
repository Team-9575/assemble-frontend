import BaseLayout from '@components/common/base-layout'
import Button from '@components/common/button'
import VStack from '@components/common/stack/VStack'
import FullReceipt from '@components/party-detail/FullReceipt'
import IndividualReceipt from '@components/party-detail/MyReceipt'
import ReviewModal from '@components/review/ReviewModal'
import { useState } from 'react'

const MyReviewPage = () => {
  const [isIndividualReceiptOpen, setIsIndividualReceiptOpen] = useState(false)
  const [isFullReceiptOpen, setIsFullReceiptOpen] = useState(false)
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  return (
    <BaseLayout>
      <VStack gap="1rem" padding="1rem">
        <p>Modals</p>
        <Button
          variant="outlined"
          text="파티원 영수증"
          onClick={() => {
            setIsIndividualReceiptOpen(true)
          }}
        />
        <IndividualReceipt
          isOpen={isIndividualReceiptOpen}
          onClose={() => {
            setIsIndividualReceiptOpen(false)
          }}
        />
        <Button
          variant="outlined"
          text="파티장 영수증(전체)"
          onClick={() => {
            setIsFullReceiptOpen(true)
          }}
        />
        <FullReceipt
          isOpen={isFullReceiptOpen}
          onClose={() => {
            setIsFullReceiptOpen(false)
          }}
        />
        <Button
          variant="outlined"
          text="리뷰"
          onClick={() => {
            setIsReviewModalOpen(true)
          }}
        />
        <ReviewModal
          isOpen={isReviewModalOpen}
          onClose={() => {
            setIsReviewModalOpen(false)
          }}
        />
      </VStack>
    </BaseLayout>
  )
}

export default MyReviewPage
