// src/pages/menu/MenuSave.jsx
import React from 'react'
import styled from 'styled-components'

export default function MenuSave({ menus = [] }) {
  return (
    <div>
      {menus.map((m, idx) => (
        <Row key={idx}>
          <NameKo type='text' value={m.nameKo} readOnly aria-label='메뉴 이름' />
          <PriceWrapper>
            <Currency>₩</Currency>
            <PriceKrw
              type='text'
              inputMode='numeric'
              pattern='[0-9]*'
              value={m.priceKrw}
              readOnly
            />
          </PriceWrapper>
        </Row>
      ))}
    </div>
  )
}

const Row = styled.div`
  display: grid;
  grid-template-columns: 110px 110px;
  align-items: center;
  column-gap: 12px;
  justify-items: start;
  padding: 44px 0 0 30px;
`

const NameKo = styled.input`
  max-width: 120px;
  min-width: 20px;
  width: auto;
  color: #000000;
  font-size: 19px;
  font-weight: 500;
  border: none;
  overflow: hidden;
  white-space: nowrap;
  box-sizing: content-box;
`

const PriceWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  width: fit-content;
  justify-self: start;
`

const Currency = styled.span`
  color: #000000;
  font-size: 18px;
  font-weight: 400;
  line-height: 21px;
`

const PriceKrw = styled.input`
  color: #000000;
  font-size: 18px;
  font-weight: 400;
  border: none;
  background: transparent;
`
