import React, { useState } from 'react'
import styled from 'styled-components'

/* ---- mock (화면만 테스트용) ---- */
const MENU_PUT_MOCK = {
  items: [
    { nameKo: '김치찌개', priceKrw: 8000 },
    { nameKo: '불고기', priceKrw: 12000 },
  ],
}

/* ---- 글자 픽셀 폭 계산: 한글도 정확히 측정 ---- */
const getTextWidth = (
  text = ' ',
  font = '500 19px Pretendard, system-ui, -apple-system, sans-serif',
) => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) return 20
  ctx.font = font
  const w = ctx.measureText(String(text || ' ')).width
  // 커서/보더 여유 + 최소/최대 폭 클램프
  return Math.min(Math.max(Math.ceil(w) + 6, 20), 120)
}

export default function MenuEdit() {
  const [menus, setMenus] = useState(MENU_PUT_MOCK.items)
  const [editIndex, setEditIndex] = useState(null) // 몇 번째 행 수정 중인지

  const handleEdit = (idx) => {
    setEditIndex((cur) => (cur === idx ? null : idx)) // 토글 편집
  }

  const handleChange = (idx, field, value) => {
    const next = [...menus]
    next[idx][field] = field === 'priceKrw' ? Number(String(value).replace(/\D/g, '')) : value
    setMenus(next)
  }

  return (
    <div>
      {menus.map((m, idx) => (
        <Row key={idx}>
          {/* 메뉴명: 글자 픽셀 폭에 맞춰 자동 너비 (최대 120px) */}
          <NameKo
            type='text'
            value={m.nameKo}
            readOnly={editIndex !== idx}
            onChange={(e) => handleChange(idx, 'nameKo', e.target.value)}
            style={{ width: `${getTextWidth(m.nameKo)}px` }}
            aria-label='메뉴 이름'
          />

          {/* 가격: 글자 수 기준(ch)로 자동 너비, 최대 90px */}
          <PriceWrapper>
            <Currency>₩</Currency>
            <PriceKrw
              type='text'
              inputMode='numeric'
              pattern='[0-9]*'
              value={m.priceKrw}
              readOnly={editIndex !== idx}
              onChange={(e) => handleChange(idx, 'priceKrw', e.target.value)}
              style={{
                width: `min(${String(m.priceKrw ?? '').length || 1}ch, 90px)`,
              }}
              aria-label='가격'
            />
          </PriceWrapper>

          <SmallLightOrangeButton type='button' onClick={() => handleEdit(idx)}>
            {editIndex === idx ? '편집' : '수정'}
          </SmallLightOrangeButton>
        </Row>
      ))}
    </div>
  )
}

/* ===== styles ===== */
const Row = styled.div`
  display: grid;
  grid-template-columns: 110px 110px 80px;
  align-items: center;
  column-gap: 12px;
  justify-items: start; /* ✅ 각 셀의 아이템을 왼쪽 정렬 + stretch 방지 */
  padding: 44px 0 0 30px;
`
const NameKo = styled.input`
  max-width: 120px; /* 실 최대폭 */
  min-width: 20px;
  width: auto;
  color: #7c7c7c;
  font-size: 19px;
  font-weight: 500;
  border: none;
  border-bottom: 1px solid #feb99d;
  overflow: hidden;
  white-space: nowrap; /* 한 줄만 */
  box-sizing: content-box; /* width를 내용 폭 기준으로 */
`

const PriceWrapper = styled.div`
  display: inline-flex; /* ✅ 내용 크기만큼 */
  align-items: center;
  gap: 4px;
  border-bottom: 1px solid #feb99d; /* ✅ 밑줄이 내용 길이만큼 */
  width: fit-content; /* ✅ 컨텐츠 너비만 차지 */
  justify-self: start; /* ✅ 그리드 셀에서 왼쪽 고정 */
`
const Currency = styled.span`
  color: #7c7c7c;
  font-size: 18px;
  font-weight: 400;
  line-height: 21px;
`

const PriceKrw = styled.input`
  color: #7c7c7c;
  font-size: 18px;
  font-weight: 400;
  border: none;
  background: transparent;
`

const SmallLightOrangeButton = styled.button`
  border-radius: 10px;
  background: #feb99d;
  border: none;
  width: 80px;
  height: 39px;
  flex-shrink: 0;
  font-size: 17px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
`
