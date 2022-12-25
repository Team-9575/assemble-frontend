import BaseLayout from '@components/common/base-layout'
import VStack from '@components/common/stack/VStack'
import Tabs from '@components/common/tabs'
import PartyCard from '@components/party/Card'
import styled from '@emotion/styled'
import { useClosedPartiesQuery } from '@hooks/query/party/useClosedPartiesQuery'
import { useState } from 'react'

enum Tab {
  Join,
  Create,
}

const MyPartiesPage = () => {
  const [tabIndex, setTabIndex] = useState<number>(Tab.Join)
  const { data } = useClosedPartiesQuery()
  return (
    <BaseLayout title="지나간 파티 보기" hasBackButton>
      <>
        <Tabs
          tabIndex={tabIndex}
          setTabIndex={setTabIndex}
          labels={['참여한 파티', '내가 만든 파티']}
        />
        {tabIndex === Tab.Join ? (
          <VStack gap="1rem" padding="1rem">
            {/* <PartyCard isLunch title="햄버거 같이 드실 분!" />
            <PartyCard isLunch title="초밥 같이 드실 분!" />
            <PartyCard title="치킨 같이 드실 분!" /> */}
          </VStack>
        ) : (
          <EmptyText>만들었던 파티가 없습니다.</EmptyText>
        )}
      </>
    </BaseLayout>
  )
}

const EmptyText = styled.p`
  color: #757575;
  padding-top: 10rem;
  text-align: center;
`
export default MyPartiesPage
