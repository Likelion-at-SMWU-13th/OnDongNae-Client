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
              <span>{m.name}</span>
              <span>₩ {Number(m.priceKrw).toLocaleString()}</span>
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
  color: #000;
  font-size: 16px;
  font-weight: 500;
`

const AllergyRow = styled.div`
  color: #000;
  font-size: 14px;
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
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
`
