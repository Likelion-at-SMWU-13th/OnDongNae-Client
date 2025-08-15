import React from 'react'
import styled from 'styled-components'

function InfoTab({ info }) {
  // 정보 없으면 '정보가 없습니다' 문구 띄우기
  const show = (v) => (typeof v === 'string' && v.trim() ? v : 'No Info')

  return (
    <Container>
      <TextContainer>
        <Title>Description</Title>
        <PreText>{show(info?.longIntro)}</PreText>
      </TextContainer>
      <TextContainer>
        <Title>Contact</Title>
        <Text>{show(info?.phone)}</Text>
      </TextContainer>
      <TextContainer>
        <Title>Address</Title>
        <Text>{show(info?.address)}</Text>
      </TextContainer>
    </Container>
  )
}

export default InfoTab

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding: 17.5px 25px 40px 25px;
`
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

const Title = styled.div`
  color: #000;
  font-size: 16px;
  font-weight: 500;
`

const Text = styled.div`
  color: #000;
  font-size: 14px;
  font-weight: 400;
`

const PreText = styled(Text)`
  white-space: pre-wrap;
`
