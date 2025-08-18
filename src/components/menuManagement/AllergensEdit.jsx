import React, { useState } from 'react'
import styled from 'styled-components'

/* --- MOCK: 실제에선 API 응답 사용 --- */
const MENU_PUT_MOCK = {
  code: 'OK',
  message: '알레르기 추출 성공',
  success: true,
  data: {
    results: [
      { menuId: 1, nameKo: '떡볶이&모둠튀김&어묵 세트', allergiesCanonical: ['Wheat', 'Fish'] },
      { menuId: 2, nameKo: '땅콩소스 비빔국수', allergiesCanonical: ['Wheat', 'Soy', 'Peanuts'] },
      { menuId: 3, nameKo: '돈가스 카레우동', allergiesCanonical: ['Pork', 'Wheat', 'Eggs'] },
      { menuId: 4, nameKo: '김치전골(돼지고기)', allergiesCanonical: ['Pork', 'Wheat'] },
    ],
  },
}

/* ---- 글자 픽셀 폭 계산 ---- */
const getTextWidth = (
  text = ' ',
  font = '400 18px Pretendard, system-ui, -apple-system, sans-serif',
) => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) return 20
  ctx.font = font
  const w = ctx.measureText(String(text || ' ')).width
  return Math.min(Math.max(Math.ceil(w) + 6, 20), 220) // 최소 20px, 최대 400px
}

export default function AllergensEdit() {
  const [menus, setMenus] = useState(MENU_PUT_MOCK.data.results)
  const [editIndex, setEditIndex] = useState(null)

  const toggleEdit = (idx) => setEditIndex((cur) => (cur === idx ? null : idx))

  const handleAllergyChange = (idx, value) => {
    const next = menus.map((m, i) =>
      i === idx
        ? {
            ...m,
            allergiesCanonical: value
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean),
          }
        : m,
    )
    setMenus(next)
  }

  return (
    <div>
      {menus.map((m, idx) => {
        const allergyText = (m.allergiesCanonical ?? []).join(', ')
        return (
          <Row key={m.menuId}>
            <MenuAllergens>
              <NameKo>{m.nameKo}</NameKo>

              <AllergiesCanonical
                type='text'
                readOnly={editIndex !== idx}
                value={allergyText}
                onChange={(e) => handleAllergyChange(idx, e.target.value)}
                style={{ width: `${getTextWidth(allergyText)}px` }}
                aria-label='알레르기 성분'
              />
            </MenuAllergens>

            <SmallLightOrangeButton type='button' onClick={() => toggleEdit(idx)}>
              {editIndex === idx ? '편집' : '수정'}
            </SmallLightOrangeButton>
          </Row>
        )
      })}
    </div>
  )
}

/* ===== styles ===== */
const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 80px;
  align-items: start;
  column-gap: 12px;
  padding: 40px 30px 0 30px;
`

const MenuAllergens = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const NameKo = styled.div`
  color: #000;
  font-size: 19px;
  font-weight: 500;
  line-height: 1.3;
`

const AllergiesCanonical = styled.input`
  color: #7c7c7c;
  font-size: 18px;
  font-weight: 400;
  border: none;
  border-bottom: 1px solid #7c7c7c;
  background: transparent;
  padding: 2px 0;
  width: auto;
`

const SmallLightOrangeButton = styled.button`
  border-radius: 10px;
  background: #feb99d;
  border: none;
  width: 80px;
  height: 39px;
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
`
