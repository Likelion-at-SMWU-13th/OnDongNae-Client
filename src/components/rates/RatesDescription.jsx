import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

const TextContainer = styled.div`
  margin: 40px 5px 10px 5px;
`
const Text = styled.p`
  color: rgba(0, 0, 0, 0.8);
  font-size: 14px;
  font-weight: 300;
  line-height: 21px; /* 150% */
`

const RatesDescription = () => {
  const { t } = useTranslation()

  return (
    <TextContainer>
      <Text>{t('rates.warning1')}</Text>
      <Text>{t('rates.warning2')}</Text>
      <Text>{t('rates.warning3')}</Text>
    </TextContainer>
  )
}

export default RatesDescription
