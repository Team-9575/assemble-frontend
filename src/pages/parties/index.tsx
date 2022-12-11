import BaseLayout from '@components/common/base-layout'
import VStack from '@components/common/stack/VStack'
import Tabs from '@components/common/tabs'
import PartyCard from '@components/party/Card'

const MyPartiesPage = () => {
  return (
    <BaseLayout title="지나간 파티 보기" hasBackButton>
      <>
        <Tabs />
        <VStack gap="1rem" padding="1rem">
          <PartyCard isLunch title="햄버거 같이 드실 분!" />
          <PartyCard isLunch title="초밥 같이 드실 분!" />
          <PartyCard title="치킨 같이 드실 분!" />
        </VStack>
      </>
    </BaseLayout>
  )
}

export default MyPartiesPage
