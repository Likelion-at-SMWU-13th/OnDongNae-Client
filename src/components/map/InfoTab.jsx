import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

function InfoTab({ info }) {
  const { t } = useTranslation()

  // 정보 없으면 '정보가 없습니다' 문구 띄우기
  const show = (v) => (typeof v === 'string' && v.trim() ? v : t('text.noInfo'))

  return (
    <Container>
      <TextContainer>
        <Title>{t('text.description')}</Title>
        <PreText>{show(info?.longIntro)}</PreText>
      </TextContainer>
      <TextContainer>
        <Title>{t('text.contact')}</Title>
        <Text>{show(info?.phone)}</Text>
      </TextContainer>
      <TextContainer>
        <Title>{t('text.address')}</Title>
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
  padding: 20.5px 25px 40px 25px;
`
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const Title = styled.div`
  color: #000;
  font-size: 16px;
  font-weight: 600;
`

const Text = styled.div`
  color: #000;
  font-size: 14px;
  font-weight: 400;
`

const PreText = styled(Text)`
  white-space: pre-wrap;
`
