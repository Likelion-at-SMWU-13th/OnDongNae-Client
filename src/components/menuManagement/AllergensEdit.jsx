import React, { useState } from 'react'
import styled from 'styled-components'
import SmallButtonContainer from '@/components/common/SmallButtonContainer'
import axios from 'axios'

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
  return Math.min(Math.max(Math.ceil(w) + 6, 20), 220)
}

export default function AllergensEdit({ initialResults = [], onSaved }) {
  const [menus, setMenus] = useState(initialResults)
  const [editIndex, setEditIndex] = useState(null)
  const apiUrl = import.meta.env.VITE_API_URL

  const toggleEdit = (idx) => setEditIndex((cur) => (cur === idx ? null : idx))

  const handleAllergyChange = (idx, value) => {
    const next = menus.map((m, i) =>
      i === idx
        ? {
            ...m,
            // 쉼표로 구분 입력 → 배열로 변환
            allergiesCanonical: value
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean),
          }
        : m,
    )
    setMenus(next)
  }

  const handleSave = () => {
    // 요청 바디 만들기: menuId -> [알레르기 문자열]
    const menuAllergies = menus.reduce((acc, m) => {
      const arr = Array.isArray(m.allergiesCanonical) ? m.allergiesCanonical : []
      acc[m.menuId] = arr
      return acc
    }, {})

    // 가드
    if (!Object.keys(menuAllergies).length) {
      alert('보낼 데이터가 없어요.')
      return
    }

    const token = localStorage.getItem('accessToken') || ''
    if (!token) {
      alert('로그인이 필요합니다.')
      return
    }

    // 전역 Content-Type 간섭 방지 (FormData가 아니라 JSON이지만, 혹시 모를 전역값 제거 습관)
    delete axios.defaults.headers.post?.['Content-Type']
    delete axios.defaults.headers.common?.['Content-Type']

    const payload = { menuAllergies }

    axios
      .post(`${apiUrl}/me/menus/allergens/apply`, payload, {
        headers: { Authorization: `Bearer ${token}` }, // JSON은 Content-Type 생략 가능(axios가 자동)
      })
      .then((res) => {
        console.log('allergies save OK:', res.data)
        onSaved?.()
      })
      .catch((err) => {
        console.error('allergies save ERR:', err?.response?.status, err?.response?.data)
        alert('저장 실패!')
      })
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

      {/* ✅ 저장 버튼은 리스트 밖에 1개만 */}
      <ButtonWapper>
        {/* SmallButtonContainer가 실제로 onClick을 호출하는 prop 이름을 확인해 맞추세요.
           이전 코드들에서 handleSubmit을 받았으니 그대로 사용 */}
        <SmallButtonContainer handleSubmit={handleSave} />
      </ButtonWapper>
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

const ButtonWapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px 0 60px;
`
