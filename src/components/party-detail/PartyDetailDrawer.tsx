import Button from '@components/common/button'
import HStack from '@components/common/stack/HStack'
import { MealType } from '@components/party/modal/Options'
import styled from '@emotion/styled'
import {
  IPartyDetail,
  usePartyDetailQuery,
} from '@hooks/query/party-detail/usePartyDetailQuery'
import { Drawer } from '@mui/material'
import { theme } from '@styles/theme'
import { format, sub } from 'date-fns'

interface IMenuDrawerProps {
  onClose: () => void
  party?: IPartyDetail
}

const PartyDetailDrawer = ({ onClose, party }: IMenuDrawerProps) => {
  return (
    <Drawer
      anchor="top"
      open
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          maxWidth: theme.maxWidth,
          margin: '0 auto',
          borderRadius: '0px 0px 10px 10px',
        },
      }}
    >
      <Container>
        <Title>{party?.name}</Title>
        <FeedIcon className="material-icons-outlined md-16">feed</FeedIcon>
        <ClosingTime>
          {party?.gatherClosedAt &&
            format(
              sub(new Date(party?.gatherClosedAt), { hours: 9 }),
              'yyyy-MM-dd kk:mm'
            )}
          {' 마감'}
        </ClosingTime>
        <GridArea>
          <div>
            <InfoTitle>식사시간</InfoTitle>
            <InfoDetail>
              {party?.mealType === MealType.Dinner ? '점심' : '저녁'}
            </InfoDetail>
          </div>
          <div>
            <InfoTitle>카테고리</InfoTitle>
            <InfoDetail>TODO: 한식</InfoDetail>
          </div>
          <div>
            <InfoTitle>최대인원</InfoTitle>
            <InfoDetail>
              {!!party?.maxUserCount ? party?.maxUserCount + '명' : '제한없음'}
            </InfoDetail>
          </div>
          <div>
            <InfoTitle>공개여부</InfoTitle>
            <InfoDetail>TODO: 공개</InfoDetail>
          </div>
        </GridArea>
        <div>
          <InfoTitle>식당 / 메뉴</InfoTitle>
          <InfoDetail>TODO: https://</InfoDetail>
        </div>
        <HStack gap="0.5rem" margin="0 0 1rem 0">
          {party?.tags.map((tag) => (
            <Keyword key={`tag-${tag.id}`}>#{tag.name}</Keyword>
          ))}
        </HStack>
        <Button text="파티 정보 수정" variant="outlined" onClick={() => {}} />
      </Container>
    </Drawer>
  )
}

const Container = styled.div`
  padding: 1.5rem;
  position: relative;
  color: #000000;
`
const Title = styled.p`
  font-weight: 600;
  text-align: center;
`
const FeedIcon = styled.span`
  color: #757575;
  position: absolute;
  right: 1.5rem;
  top: 1rem;
`
const ClosingTime = styled.p`
  color: #757575;
  margin: 1.25rem;
  text-align: center;
`
const GridArea = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`
const InfoTitle = styled.p`
  color: #757575;
  margin-bottom: 0.5rem;
`
const InfoDetail = styled.p`
  margin-bottom: 1.25rem;
`
const Keyword = styled.p`
  background-color: ${({ theme }) => theme.background.keyword};
  color: ${({ theme }) => theme.text.secondary};
  border-radius: 10px;
  font-size: ${theme.fontSize.xs};
  padding: 0.25rem 0.375rem;
`
export default PartyDetailDrawer
