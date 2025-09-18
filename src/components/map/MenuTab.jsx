import React from 'react'
import styled from 'styled-components'
import alertIcon from '@/assets/icon-alert.svg'
import { useTranslation } from 'react-i18next'

function MenuTab({ items }) {
  const { t } = useTranslation()

  return (
    <Container>
      {items?.map((m, i) => (
        <div key={i}>
          <Item>
            <MenuRow>
              <Name>{m.name}</Name>
              <Price>₩ {Number(m.priceKrw).toLocaleString()}</Price>
            </MenuRow>

            {m.allergies?.length > 0 && (
              <AllergyRow>
                {t('text.contains')} : {m.allergies.join(', ')}
              </AllergyRow>
            )}
          </Item>
          {i < items.length - 1 && <Divider />}
        </div>
      ))}

      <WarningRow>
        <WarningIcon src={alertIcon} alt='' />
        <WarningText>{t('text.allergyWarning')}</WarningText>
      </WarningRow>
    </Container>
  )
}

export default MenuTab

const Container = styled.section`
  padding: 5px 25px 40px 25px;
`

const Divider = styled.hr`
  border: 0;
  border-top: 1px solid #eee;
`

const Item = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 15.5px 0;
`

const MenuRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  color: #000;
  font-size: 1rem;
  font-weight: 500;
`
const Name = styled.span`
  min-width: 0; // 줄바꿈 허용
  word-break: keep-all;
`

const Price = styled.span`
  justify-self: end;
  white-space: nowrap;
  text-align: right;
  font-variant-numeric: tabular-nums;
`

const AllergyRow = styled.div`
  color: #000;
  font-size: 0.875rem;
  font-weight: 400;
`
const WarningRow = styled.div`
  margin-top: 15.5px;
  display: flex;
  flex-direction: row;
  align-items: start;
  gap: 5px;
`

const WarningIcon = styled.img`
  padding-top: 2px;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  aspect-ratio: 1/1;
`

const WarningText = styled.p`
  color: #7e7e7e;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 21px;
`
