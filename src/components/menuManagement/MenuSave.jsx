// src/pages/menu/MenuSave.jsx
import React from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'

export default function MenuSave() {
  const location = useLocation()
  // navigate 시 전달한 state 구조: { state: menuData }
  const menus = location.state || [] // 안전하게 fallback

  return (
    <div>
      {menus.map((m, idx) => (
        <Row key={idx}>
          {/* 메뉴명 */}
          <NameKo type='text' value={m.nameKo} readOnly aria-label='메뉴 이름' />

          {/* 가격 */}
          <PriceWrapper>
            <Currency>₩</Currency>
            <PriceKrw
              type='text'
              inputMode='numeric'
              pattern='[0-9]*'
              value={m.priceKrw}
              readOnly
              aria-label='가격'
            />
          </PriceWrapper>
        </Row>
      ))}
    </div>
  )
}

/* ===== styles ===== */
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
