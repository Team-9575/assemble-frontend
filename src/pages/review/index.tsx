import BaseLayout from '@components/common/base-layout'
import Button from '@components/common/button'
import VStack from '@components/common/stack/VStack'
import IndividualReceipt from '@components/party-detail/IndividualReceipt'
import { useState } from 'react'

const MyReviewPage = () => {
  const [isIndividualReceiptOpen, setIsIndividualReceiptOpen] = useState(false)
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
          onClick={() => {}}
        />
        <Button variant="outlined" text="리뷰" onClick={() => {}} />
      </VStack>
    </BaseLayout>
  )
}

export default MyReviewPage
