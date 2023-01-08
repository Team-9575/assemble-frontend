import BaseLayout from '@components/common/base-layout'
import Tabs from '@components/common/tabs'
import { useClosedPartiesQuery } from '@hooks/query/party/useClosedPartiesQuery'
import { useUserQuery } from '@hooks/query/user/useUserQuery'
import { useState } from 'react'
import ClosedPartyList from './ClosedPartyList'

export enum ClosedPartyTab {
  Join = 'join',
  Create = 'create',
}

const ClosedPartiesPage = () => {
  const [selectedTab, setSelectedTab] = useState<string>(ClosedPartyTab.Join)
  const { data: user, isLoading: isUserLoading } = useUserQuery()
  const { data: closedParties, isLoading: isPartyLoading } =
    useClosedPartiesQuery(user?.id)

  return (
    <BaseLayout title="지나간 파티 보기" hasBackButton hasLogo={false}>
      <>
        <Tabs
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          labels={[
            { name: '참여한 파티', value: ClosedPartyTab.Join },
            { name: '내가 만든 파티', value: ClosedPartyTab.Create },
          ]}
        />
        <ClosedPartyList
          isLoading={isPartyLoading}
          selectedTab={selectedTab}
          parties={closedParties}
        />
      </>
    </BaseLayout>
  )
}

export default ClosedPartiesPage
