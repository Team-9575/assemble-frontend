import type { NextPage } from 'next'
import styled from '@emotion/styled'
import PartyList from '@components/party'
import Button from '@components/common/Button'
import Image from 'next/image'
import HStack from '@components/common/HStack'
import BaseLayout from '@components/common/BaseLayout'

const Home: NextPage = () => {
  return (
    <BaseLayout>
      <Container>
        <PartyList />
        <Footer>
          <HStack padding="0.25rem 0" justifyContent="center">
            <ImageWrapper>
              <Image src="/images/profile.jpg" alt="profile" layout="fill" />
            </ImageWrapper>
            <ImageWrapper>
              <Image src="/images/profile.jpg" alt="profile" layout="fill" />
            </ImageWrapper>
            <ImageWrapper>
              <Image src="/images/profile.jpg" alt="profile" layout="fill" />
            </ImageWrapper>
          </HStack>
          <Description>현재 8명이 파티를 고민하고 있어요</Description>
          <Button text="방 만들기" onClick={() => {}} />
        </Footer>
      </Container>
    </BaseLayout>
  )
}
const Container = styled.header`
  position: relative;
  margin: 0 0 8.125rem 0;
`
const Footer = styled.footer`
  position: fixed;
  padding: 0 1rem 1.5rem;
  bottom: 0;
  width: 100%;
  background-color: white; // TODO: theme
  box-shadow: 0px -2px 8px rgba(0, 0, 0, 0.2);
  max-width: 40rem; // TODO: theme
`
const Description = styled.p`
  font-size: 14px; // TODO: theme
  text-align: center;
  margin-bottom: 0.5rem;
  letter-spacing: -0.3px;
`
const ImageWrapper = styled.div`
  height: 1.375rem;
  width: 1.375rem;
  position: relative;
  border-radius: 50px;
  overflow: hidden;
`
export default Home
