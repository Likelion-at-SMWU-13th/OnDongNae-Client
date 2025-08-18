import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'

/* ---- 글자 픽셀 폭 계산 ---- */
const getTextWidth = (
  text = ' ',
  font = '500 19px Pretendard, system-ui, -apple-system, sans-serif',
) => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) return 20
  ctx.font = font
  const w = ctx.measureText(String(text || ' ')).width
  return Math.min(Math.max(Math.ceil(w) + 6, 20), 120)
}

export default function MenuEdit({ initialItems = [] }) {
  const [menus, setMenus] = useState(initialItems)
  const [editIndex, setEditIndex] = useState(null)
  const apiUrl = import.meta.env.VITE_API_URL

  const handleEdit = (idx) => {
    setEditIndex((cur) => (cur === idx ? null : idx))
  }

  const handleChange = (idx, field, value) => {
    const next = [...menus]
    next[idx][field] = field === 'priceKrw' ? Number(String(value).replace(/\D/g, '')) : value
    setMenus(next)
  }

  // 저장 클릭 시 API 호출
  const handleSave = async () => {
    try {
      const body = {
        items: menus.map((m) => ({
          nameKo: m.nameKo,
          priceKrw: m.priceKrw,
        })),
      }

      const res = await axios.post(`${apiUrl}/me/menus/save`, body)
      // TODO: 필요하다면 navigate('/menu/extract/save') 등 추가
    } catch (err) {
      console.error(err)
      alert('저장 실패!')
    }
  }

  return (
    <div>
      {menus.map((m, idx) => (
        <Row key={idx}>
          <NameKo
            type='text'
            value={m.nameKo}
            readOnly={editIndex !== idx}
            onChange={(e) => handleChange(idx, 'nameKo', e.target.value)}
            style={{ width: `${getTextWidth(m.nameKo)}px` }}
            aria-label='메뉴 이름'
          />

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

      {/* 저장 버튼 */}
      <SaveButton type='button' onClick={handleSave}>
        저장
      </SaveButton>
    </div>
  )
}

/* ===== styles ===== */
const Row = styled.div`
  display: grid;
  grid-template-columns: 110px 110px 80px;
  align-items: center;
  column-gap: 12px;
  justify-items: start;
  padding: 44px 0 0 30px;
`
const NameKo = styled.input`
  max-width: 120px;
  min-width: 20px;
  width: auto;
  color: #7c7c7c;
  font-size: 19px;
  font-weight: 500;
  border: none;
  border-bottom: 1px solid #feb99d;
  overflow: hidden;
  white-space: nowrap;
  box-sizing: content-box;
`
const PriceWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  border-bottom: 1px solid #feb99d;
  width: fit-content;
  justify-self: start;
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
const SaveButton = styled.button`
  margin: 40px auto;
  display: block;
  border-radius: 12px;
  background: #ff7a45;
  border: none;
  width: 200px;
  height: 48px;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
`
