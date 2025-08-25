import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import authAxios from '@/lib/authAxios'
import Loading from '@/components/common/Loading'

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
  const [loading, setLoading] = useState(false)
  const [menus, setMenus] = useState(initialItems)
  const [editIndex, setEditIndex] = useState(null)
  const apiUrl = import.meta.env.VITE_API_URL
  const navigate = useNavigate()
  const token = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken') || ''

  const handleEdit = (idx) => {
    setEditIndex((cur) => (cur === idx ? null : idx))
  }

  const handleChange = (idx, field, value) => {
    const next = [...menus]
    next[idx][field] = field === 'priceKrw' ? Number(String(value).replace(/\D/g, '')) : value
    setMenus(next)
  }

  const handleSave = () => {
    if (loading) return // 중복 클릭 방지
    setLoading(true)

    const body = {
      items: menus.map((m) => ({
        nameKo: m.nameKo,
        priceKrw: m.priceKrw,
      })),
    }

    authAxios
      .post(`${apiUrl}/me/menus/save`, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // 서버 응답: { code, message, success, data: { menus: [...], canExtractAllergy: boolean } }
        const payload = res.data?.data
        navigate('/menu/extract/save', {
          state: {
            menus: payload.menus,
            canExtractAllergy: payload.canExtractAllergy, // boolean
          },
        })

        // 저장 화면으로 전달
      })
      .catch((err) => {
        console.error(err)
        alert('저장 실패!')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  // 로딩 중이면 스피너만 보여주기
  if (loading) return <Loading text='메뉴를 저장하고 있어요' />

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
            {editIndex === idx ? '완료' : '수정'}
          </SmallLightOrangeButton>
        </Row>
      ))}

      <SaveButton type='button' onClick={handleSave}>
        저장
      </SaveButton>
    </div>
  )
}
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
  box-sizing: content-box;

  /* 말줄임표 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:read-only {
    cursor: default;
  }
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
  margin: 92px auto;
  display: block;
  border-radius: 10px;
  background: #f08e67;
  border: none;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  width: 322px;
  height: 48px;
  flex-shrink: 0;
`
